import type { Err } from "@/fetcher/type";

export type Data = {
  id: string;
  title: string;
  body: string;
};

export const path = () => `https://api.example.com/posts`;

export function createPost(body: unknown) {
  return fetch(path(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    const d = await res.json();
    if (!res.ok) {
      const err: Err = { ...d, status: res.status };
      return { err };
    }
    const data: Data = { ...d };
    return { data };
  });
}
