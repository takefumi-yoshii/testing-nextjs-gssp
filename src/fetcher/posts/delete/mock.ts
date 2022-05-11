import type { Err } from "@/fetcher/type";
import { rest } from "msw";
import { Data, path } from ".";

export const deletePostHandler = (status: 200 | 400 = 200) =>
  rest.delete<{}, { id: string }, Data | Err>(path(":id"), (req, res, ctx) => {
    if (status === 400)
      return res(
        ctx.status(400),
        ctx.json({ message: "Bad Request", status: 400 })
      );
    const id = req.params.id;
    return res(ctx.json({ id }));
  });
