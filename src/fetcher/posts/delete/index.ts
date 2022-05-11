import type { Err } from "@/fetcher/type";

export type Data = {
  id: string;
};

export const path = (id: string) => `https://api.example.com/posts/${id}`;

export function deletePost(id: string) {
  return fetch(path(id), {
    method: "DELETE",
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
