export interface BlogContent {
  type: 'text' | 'heading' | 'code' | 'image' | 'list';
  level?: number;
  text?: string;
  language?: string;
  code?: string;
  imageUrl?: string;
  imageCaption?: string;
  listItems?: string[];
  listType?: 'bullet' | 'ordered';
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogContent[];
  thumbnail: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExternalContent {
  _id: string;
  type: 'medium' | 'github' | 'linkedin';
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  likes?: number;
  shares?: number;
  publishedAt: string;
  metadata: Record<string, any>;
}
