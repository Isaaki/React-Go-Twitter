export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;

  Name: string;
  Username: string;
  Email: string;
}

export interface Tweet {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;

  UserID: number;
  User: User;
  Message: string;

  Likes: number;
  Replies: number;
  Retweets: number;
  Views: number;
}

export type SortModeType = {
  ASC: symbol;
  DEC: symbol;
};
export type SortModeKeyType = SortModeType[keyof SortModeType];
