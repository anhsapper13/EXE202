import { ITag } from "./tag.interface";
import { User } from "./user.type";

export interface IPost {
  post_id: string;
  title: string;
  body: string;
  creationDate: Date;
  lastEditDate: Date;
  viewCount: number;
  user: User;
  user_id: string;
  tags?: ITag[];
  comments?: string[];
}
