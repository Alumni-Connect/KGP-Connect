export interface NavItemProps {
    icon: React.ReactNode;
    label: string;
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