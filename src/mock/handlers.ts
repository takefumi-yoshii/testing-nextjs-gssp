import { postCreateHandler } from "@/fetcher/posts/create/mock";
import { postDeleteHandler } from "@/fetcher/posts/delete/mock";
import { postListHandler } from "@/fetcher/posts/list/mock";
import { postShowHandler } from "@/fetcher/posts/show/mock";
import { postUpdateHandler } from "@/fetcher/posts/update/mock";

export const handlers = [
  postCreateHandler(),
  postDeleteHandler(),
  postListHandler(),
  postShowHandler(),
  postUpdateHandler(),
];
