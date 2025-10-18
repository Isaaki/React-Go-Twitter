export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Tweet {
  user: User;
  likes: number;
  replies: number;
  retweets: number;
  views: number;
  message: string;
  date: string;
}
