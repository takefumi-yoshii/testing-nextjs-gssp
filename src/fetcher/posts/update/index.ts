import { fetcher } from "@/fetcher";

export type Data = {
  id: string;
  title: string;
  body: string;
};

export const path = (id: string) => `https://api.example.com/posts/${id}`;

export const updatePost = (id: string, body: unknown) =>
  fetcher<Data>(path(id), {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
