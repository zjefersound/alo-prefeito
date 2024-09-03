import { Category } from "./Category";
import { Comment } from "./Comment";
import { User } from "./User";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  userId: number;

  voted: boolean;
  totalUpvotes: number;

  favoriteCommentId?: number;
  category: Category;
  user: User;
  comments?: Comment[];
};
