export interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }
  
  export interface NavLinkProps {
    children: React.ReactNode;
    active?: boolean;
  }
  
  export interface AchievementProps {
    title: string;
    description: string;
    time: string;
    xp: number;
  }
  export interface Author {
    id: string;
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
  id: string;
  caption: string;
  title: string;
  content: string | PostContent;
  subreddit: string;
  type: string;
  authorId: string;
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
  onDelete?: (id: string) => void;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: Author;
  score: number;
  createdAt: string | Date;
  updatedAt?: string | Date;
  parentId: string | null;
  replies?: Comment[];
  _count?: {
    replies: number;
  };
  hasMoreReplies?: boolean;
  status?: string;
}

export interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}
  export interface Job {
    status: "open" | "closed";
    id: string;
    title: string;
    company: string;
    location: string;
    salary: number;
    postedAt: string;
    url: string;
}

export interface ChatMessage {
    close:()=>void;
  }
export interface ModalProps {
  isOpen:boolean;
  onClose: () => void;
}  
