import type { Err } from "@/fetcher/type";

export type Data = {
  id: string;
  title: string;
  body: string;
};

export const path = (id: string) => `https://api.example.com/posts/${id}`;

export function fetchPostShow(id: string) {
  return fetch(path(id)).then(async (res) => {
    const d = await res.json();
    if (!res.ok) {
      const err: Err = { ...d, status: res.status };
      return { err };
    }
    const data: Data = { ...d, id };
    return { data };
  });
}
