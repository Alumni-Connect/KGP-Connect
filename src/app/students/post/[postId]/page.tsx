import PostDetailPage from '@/components/PostDetailPage';

export default function PostPage({ params }: { params: { postId: string } }) {
  return <PostDetailPage params={params} />;
}