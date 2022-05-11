import type { Err } from "@/fetcher/type";

export type Data = {
  id: string;
  title: string;
  body: string;
};

export const path = (id: string) => `https://api.example.com/posts/${id}`;

export function fetchPostUpdate(id: string, body: unknown) {
  return fetch(path(id), {
    method: "PUT",
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
