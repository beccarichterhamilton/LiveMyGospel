export interface CommunityContent {
  id: string;
  category: 'dates' | 'memes' | 'spiritual' | 'tips';
  text: string;
  upvotes: number;
  downvotes: number;
  userVote: 'up' | 'down' | null;
  createdAt: Date;
  comments?: number;
  isAnonymous?: boolean;
}