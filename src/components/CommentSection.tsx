"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp, Reply, Edit, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Comment, CommentSectionProps } from "../types";
import toast from "react-hot-toast";

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  initialComments = [],
}) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContents, setReplyContents] = useState<Record<number, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = async (resetExisting = false) => {
    try {
      setLoading(true);
      const currentPage = resetExisting ? 1 : page;
      const response = await fetch(
        `/api/posts/${postId}/comments?page=${currentPage}&limit=50`,
      );

      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();

      if (data.length < 50) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setComments((prevComments) =>
        resetExisting
          ? data
          : currentPage === 1
            ? data
            : [...prevComments, ...data],
      );

      if (resetExisting) {
        setPage(1);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(true);
  }, [postId]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchComments(false);
  };

  const handleLoadMoreReplies = async (parentId: number) => {
    try {
      setLoading(true);
      const currentComment = comments.find(c => c.id === parentId);
      const currentRepliesCount = currentComment?.replies?.length || 0;
      
      const response = await fetch(
        `/api/posts/${postId}/comments?parentId=${parentId}&limit=50&page=${Math.floor(currentRepliesCount / 50) + 1}`,
      );

      if (!response.ok) throw new Error("Failed to fetch replies");

      const newReplies = await response.json();

      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === parentId) {
            const updatedReplies = [...(comment.replies || []), ...newReplies];
            return {
              ...comment,
              replies: updatedReplies,
              hasMoreReplies: newReplies.length === 50, // Has more if we got a full page
            };
          }
          return comment;
        }),
      );
    } catch (error) {
      console.error("Error loading replies:", error);
      toast.error("Failed to load replies");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || !newComment.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) throw new Error("Failed to create comment");

      const newCommentData = await response.json();
      setComments((prevComments) => [newCommentData, ...prevComments]);
      setNewComment("");
      toast.success("Comment posted");
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (commentId: number) => {
    const replyContent = replyContents[commentId] || "";
    if (!session?.user || !replyContent.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: replyContent,
          parentId: commentId,
        }),
      });

      if (!response.ok) throw new Error("Failed to create reply");

      const newReply = await response.json();

      // Helper function to recursively update comments and replies
      const updateCommentsRecursively = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, newReply]
                : [newReply],
              _count: {
                replies: (comment._count?.replies || 0) + 1,
              },
            };
          }
          
          // Check if the comment we're replying to is in the nested replies
          if (comment.replies && comment.replies.length > 0) {
            const updatedReplies = updateCommentsRecursively(comment.replies);
            if (updatedReplies !== comment.replies) {
              return {
                ...comment,
                replies: updatedReplies,
              };
            }
          }
          
          return comment;
        });
      };

      setComments(updateCommentsRecursively);
      setReplyingTo(null);
      setReplyContents(prev => {
        const newContents = { ...prev };
        delete newContents[commentId];
        return newContents;
      });
      toast.success("Reply posted");
    } catch (error) {
      console.error("Error creating reply:", error);
      toast.error("Failed to post reply");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!session?.user || !editContent.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(
        `/api/posts/${postId}/comments?commentId=${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editContent }),
        },
      );

      if (!response.ok) throw new Error("Failed to update comment");

      const updatedComment = await response.json();

      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              content: updatedComment.content,
              updatedAt: updatedComment.updatedAt,
            };
          }

          // Check if the updated comment is in the replies
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId
                  ? {
                      ...reply,
                      content: updatedComment.content,
                      updatedAt: updatedComment.updatedAt,
                    }
                  : reply,
              ),
            };
          }

          return comment;
        }),
      );

      setEditingId(null);
      setEditContent("");
      toast.success("Comment updated");
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Failed to update comment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (
      !session?.user ||
      !window.confirm("Are you sure you want to delete this comment?")
    )
      return;

    try {
      setLoading(true);
      const response = await fetch(
        `/api/posts/${postId}/comments?commentId=${commentId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete comment");

      // Update the comment in the local state to show as deleted
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, content: "[deleted]", status: "deleted" };
          }

          // Also check if the comment is in any replies
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId
                  ? { ...reply, content: "[deleted]", status: "deleted" }
                  : reply,
              ),
            };
          }

          return comment;
        }),
      );
      toast.success("Comment deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (commentId: number, value: number) => {
    if (!session?.user) {
      toast.error("You must be signed in to vote");
      return;
    }

    // Only allow upvotes (value of 1)
    if (value !== 1) {
      return;
    }

    try {
      // Helper function to recursively find a comment by ID
      const findCommentRecursively = (comments: Comment[], targetId: number): Comment | null => {
        for (const comment of comments) {
          if (comment.id === targetId) {
            return comment;
          }
          if (comment.replies) {
            const found = findCommentRecursively(comment.replies, targetId);
            if (found) return found;
          }
        }
        return null;
      };

      const currentComment = findCommentRecursively(comments, commentId);
      const currentUserVote = currentComment?.userVote || null;
      
      // Determine the action based on current vote state
      if (currentUserVote === value) {
        // User is removing their vote
        const response = await fetch(
          `/api/posts/${postId}/comments/${commentId}/vote`,
          {
            method: "DELETE",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to remove vote");
        }

        // Helper function to recursively update comments
        const updateCommentsRecursively = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              return { 
                ...comment, 
                score: comment.score - value,
                userVote: null
              };
            }

            if (comment.replies) {
              const updatedReplies = updateCommentsRecursively(comment.replies);
              if (updatedReplies !== comment.replies) {
                return {
                  ...comment,
                  replies: updatedReplies,
                };
              }
            }

            return comment;
          });
        };
        
        setComments(updateCommentsRecursively);
        toast.success("Vote removed");
      } else {
        // User is adding their vote
        const response = await fetch(
          `/api/posts/${postId}/comments/${commentId}/vote`,
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ value }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to register vote");
        }

        // Calculate score change (no previous downvotes to account for)
        const scoreDelta = value;

        // Helper function to recursively update comments
        const updateCommentsRecursively = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              return { 
                ...comment, 
                score: comment.score + scoreDelta,
                userVote: value
              };
            }

            if (comment.replies) {
              const updatedReplies = updateCommentsRecursively(comment.replies);
              if (updatedReplies !== comment.replies) {
                return {
                  ...comment,
                  replies: updatedReplies,
                };
              }
            }

            return comment;
          });
        };
        
        setComments(updateCommentsRecursively);
        toast.success("Comment upvoted");
      }
    } catch (error) {
      console.error("Error voting on comment:", error);
      toast.error("Failed to register vote");
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const CommentItem = ({ comment }: { comment: Comment }) => {
    const isAuthor = session?.user?.id === comment.authorId.toString();
    const isDeleted =
      comment.status === "deleted" || comment.content === "[deleted]";

    return (
      <div className="mb-4">
        <div className="flex space-x-3">
          {/* Vote buttons */}
          <div className="flex flex-col items-center space-y-1">
            {!isDeleted ? (
              <>
                <button
                  onClick={() => handleVote(comment.id, 1)}
                  disabled={!session?.user}
                  className={`p-1 rounded-full transition-colors ${
                    comment.userVote === 1 
                      ? "text-indigo-600 bg-indigo-50" 
                      : "text-gray-400 hover:text-indigo-600"
                  }`}
                  aria-label="Upvote"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <span className="text-xs font-medium text-gray-700">
                  {comment.score}
                </span>
              </>
            ) : (
              <span className="text-xs font-medium text-gray-400">
                {comment.score}
              </span>
            )}
          </div>

          {/* Comment content */}
          <div className="flex-1">
            <div
              className={`${isDeleted ? "bg-gray-100" : "bg-gray-50"} rounded-lg p-3`}
            >
              <div className="flex items-center mb-2">
                <div className="h-6 w-6 rounded-full bg-gray-200 mr-2">
                  {comment.author?.image ? (
                    <img
                      src={comment.author.image}
                      className="h-full w-full object-cover rounded-full"
                      alt="User avatar"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                      {comment.author?.name
                        ? comment.author.name.charAt(0).toUpperCase()
                        : "?"}
                    </div>
                  )}
                </div>
                <span className="font-medium text-gray-800 mr-2">
                  {comment.author?.name || "Anonymous"}
                </span>
                {comment.author?.role === "ADMIN" && (
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded mr-2">
                    Admin
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  • {formatDate(comment.createdAt)}
                </span>
                {comment.updatedAt &&
                  new Date(comment.updatedAt) > new Date(comment.createdAt) && (
                    <span className="text-xs text-gray-500 ml-2">(edited)</span>
                  )}
                {isDeleted && (
                  <span className="text-xs text-gray-500 italic ml-2">
                    (deleted)
                  </span>
                )}
              </div>

              {editingId === comment.id ? (
                <div className="mb-2">
                  <textarea
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateComment(comment.id)}
                      disabled={!editContent.trim() || loading}
                      className={`px-3 py-1.5 text-sm rounded-md text-white ${!editContent.trim() || loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`${isDeleted ? "text-gray-500 italic" : "text-gray-800"} mb-2 whitespace-pre-wrap`}
                >
                  {comment.content}
                </div>
              )}

              {/* Only show action buttons if comment is not deleted */}
              {!isDeleted && !editingId && (
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  

                  {isAuthor && (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditContent(comment.content);
                        }}
                        className="flex items-center hover:text-indigo-600"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="flex items-center hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        <span>Delete</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Reply form - only show for non-deleted comments */}
            {replyingTo === comment.id && !isDeleted && (
              <div className="mt-3 ml-6">
                <textarea
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  value={replyContents[comment.id] || ""}
                  onChange={(e) => setReplyContents(prev => ({ ...prev, [comment.id]: e.target.value }))}
                  placeholder="Write a reply..."
                ></textarea>
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContents(prev => {
                        const newContents = { ...prev };
                        delete newContents[comment.id];
                        return newContents;
                      });
                    }}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReply(comment.id)}
                    disabled={!(replyContents[comment.id]?.trim()) || loading}
                    className={`px-3 py-1.5 text-sm rounded-md text-white ${!(replyContents[comment.id]?.trim()) || loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}

            {/* Replies section */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3 ml-6 border-l-2 border-gray-200 pl-4">
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} />
                ))}
              </div>
            )}

            {/* Show more replies button */}
            {comment._count &&
              comment._count.replies > 0 &&
              comment.hasMoreReplies && (
                <button
                  onClick={() => handleLoadMoreReplies(comment.id)}
                  className="mt-2 ml-6 text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {loading
                    ? "Loading..."
                    : `Show ${comment._count.replies - (comment.replies?.length || 0)} more ${comment._count.replies - (comment.replies?.length || 0) === 1 ? "reply" : "replies"}`}
                </button>
              )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>



      {/* New comment form */}
      {session?.user ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex items-start mb-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex-shrink-0">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  className="h-full w-full object-cover rounded-full"
                  alt="User profile"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                  {session.user.name
                    ? session.user.name.charAt(0).toUpperCase()
                    : "?"}
                </div>
              )}
            </div>
            <textarea
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim() || loading}
              className={`px-4 py-2 text-sm rounded-md text-white ${!newComment.trim() || loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">Please sign in to leave a comment.</p>
        </div>
      )}

      {/* Comment list */}
      {comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

          {hasMore && (
            <div className="text-center mt-4">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className={`px-4 py-2 text-sm rounded-md ${loading ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {loading ? "Loading..." : "Load More Comments"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">
            No comments yet. Be the first to comment!
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
