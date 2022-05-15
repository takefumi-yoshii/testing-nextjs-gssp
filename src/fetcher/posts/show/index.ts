import { fetcher } from "@/fetcher";

export type Data = {
  id: string;
  title: string;
  body: string;
};

export const path = (id: string) => `https://api.example.com/posts/${id}`;

export const showPost = (id: string) => fetcher<Data>(path(id));
