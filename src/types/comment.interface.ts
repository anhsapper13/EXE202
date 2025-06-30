import { User } from "./user.type";

export interface IComment {
  comment_id: string;
  body: string;
  content: string;
  lastEditDate?: Date;
  creationDate: Date;
  score: number;
  postId: string;
  author: User;
}
