export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;

  name: string;
  username: string;
  email: string;
  tweets: Tweet[] | null;

  profilePicUrl: string;
}

export interface Tweet {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;

  userID: number;
  user: User;
  message: string;

  likes: number;
  replies: number;
  retweets: number;
  views: number;
}

export type SortModeType = {
  ASC: symbol;
  DEC: symbol;
};

export type SortModeKeyType = SortModeType[keyof SortModeType];
