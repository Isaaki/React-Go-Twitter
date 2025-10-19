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
}
