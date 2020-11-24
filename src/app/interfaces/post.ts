export interface Post {
  postId: string;
  category: string;
  text: string;
  authorUid: string;
  likedCount: number;
  position: google.maps.LatLngLiteral;
  createdAt: number;
  isPublic: boolean;
  imageUrl?: string;
}
