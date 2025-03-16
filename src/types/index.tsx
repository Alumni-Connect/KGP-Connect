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
  
  export interface PostProps {
    id?: string;
    author: {
      name: string;
      image: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    timeAgo: string;
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
