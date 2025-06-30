import { IPost } from "@/types/post.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateInterface {
  posts: IPost[];
  currentPost: IPost;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialStateInterface = {
  posts: [] as IPost[],
  currentPost: {} as IPost,
  isLoading: false,
  error: null,
};

const PostSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    getAllPost: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    getPostById: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((post) => post.post_id === action.payload);
      if (post) {
        state.currentPost = post;
      }
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      const index = state.posts.findIndex(
        (post) => post.post_id === action.payload.post_id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(
        (post) => post.post_id !== action.payload
      );
    },
  },
});
export const { getAllPost, addPost, updatePost, deletePost } =
  PostSlice.actions;
export default PostSlice.reducer;
