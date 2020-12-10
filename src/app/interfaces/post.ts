import { UserData } from './user-data';

export interface Post {
  postId: string;
  category: string;
  text: string;
  authorUid: string;
  likedCount: number;
  likedUserIds: string[];
  position: google.maps.LatLngLiteral;
  createdAt: number;
  isPublic: boolean;
  imageUrl?: string;
}

export interface PostWithUser extends Post {
  user: UserData;
}
