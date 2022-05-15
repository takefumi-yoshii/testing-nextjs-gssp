import type { Err } from "@/fetcher/type";

export const fetcher = <T>(
  input: RequestInfo,
  init?: RequestInit,
  throwErr = false
) =>
  fetch(input, init).then(async (res) => {
    const d = await res.json();
    if (!res.ok) {
      const err: Err = { ...d, status: res.status };
      if (throwErr) throw err;
      return { err };
    }
    const data: T = { ...d };
    return { data };
  });
