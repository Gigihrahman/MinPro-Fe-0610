interface User {
  fullname: string;
  profilePicture: string | null;
}

export interface Review {
  id: number;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
}
