import type { Err } from "@/fetcher/type";

export type Item = {
  id: string;
  title: string;
  body: string;
};

export type Data = {
  items: Item[];
};

export const path = () => `https://api.example.com/posts`;

export function fetchPostList() {
  return fetch(path()).then(async (res) => {
    const d = await res.json();
    if (!res.ok) {
      const err: Err = { ...d, status: res.status };
      return { err };
    }
    const data: Data = { ...d };
    return { data };
  });
}
