import { createPostHandler } from "@/fetcher/posts/create/mock";
import { deletePostHandler } from "@/fetcher/posts/delete/mock";
import { listPostHandler } from "@/fetcher/posts/list/mock";
import { showPostHandler } from "@/fetcher/posts/show/mock";
import { updatePostHandler } from "@/fetcher/posts/update/mock";

export const handlers = [
  createPostHandler(),
  deletePostHandler(),
  listPostHandler(),
  showPostHandler(),
  updatePostHandler(),
];
