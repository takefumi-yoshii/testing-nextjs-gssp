import { fetcher } from "@/fetcher";

export type Data = {
  id: string;
  title: string;
  body: string;
};

export const path = () => `https://api.example.com/posts`;

export const createPost = (body: unknown) =>
  fetcher<Data>(path(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
