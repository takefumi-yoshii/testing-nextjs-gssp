import { fetcher } from "@/fetcher";

export type Data = {
  id: string;
};

export const path = (id: string) => `https://api.example.com/posts/${id}`;

export const deletePost = (id: string) =>
  fetcher<Data>(path(id), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
