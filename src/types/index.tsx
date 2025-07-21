export interface NavItemProps {
  icon: any; // Changed from React.ReactNode to any
  label: string;
  onClick?: () => void;
}

export interface NavLinkProps {
  children: any; // Changed from React.ReactNode to any
  active?: boolean;
}

export interface AchievementProps {
  title: string;
  description: string;
  time: string;
  xp: number;
}
export interface Author {
  id: number; // Changed from string to number
  name: string | null;
  image: string | null;
  role: string;
}

export interface PostContent {
  mediaUrl?: string;
  mediaType?: string;
  caption?: string;
}

export interface PostProps {
  id: number; // Changed from string to number
  caption: string;
  title: string;
  content: string | PostContent;
  subreddit: string;
  type: string;
  authorId: number; // Changed from string to number
  author: Author;
  score: number;
  commentCount: number;
  isVerified: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  _count: {
    comments: number;
    PostVote: number;
  };

  // UI specific properties
  image?: string;
  timeAgo?: string;

  userVote?: number | null;
  currentUser?: any;
  onDelete?: (id: number) => void; // Changed from string to number
}

export interface Comment {
  id: number; // Changed from string to number
  content: string;
  authorId: number; // Changed from string to number
  author: Author;
  score: number;
  createdAt: string | Date;
  updatedAt?: string | Date;
  parentId: number | null; // Changed from string to number
  replies?: Comment[];
  _count?: {
    replies: number;
  };
  hasMoreReplies?: boolean;
  status?: string;
}

export interface CommentSectionProps {
  postId: number; // Changed from string to number
  initialComments?: Comment[];
}
export interface Job {
  status: "open" | "closed";
  id: number; // Changed from string to number
  title: string;
  company: string;
  location: string;
  salary: number;
  postedAt: string;
  url: string;
}

export interface ChatMessage {
  close: () => void;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
