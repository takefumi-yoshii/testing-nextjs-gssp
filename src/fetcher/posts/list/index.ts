import { fetcher } from "@/fetcher";

export type Item = {
  id: string;
  title: string;
  body: string;
};

export type Data = {
  items: Item[];
};

export const path = () => `https://api.example.com/posts`;

export const listPost = () => fetcher<Data>(path());
