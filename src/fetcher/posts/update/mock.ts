import type { Err } from "@/fetcher/type";
import { rest } from "msw";
import { Data, path } from ".";

export const postUpdateHandler = (status: 200 | 400 = 200) =>
  rest.put<Data, { id: string }, Data | Err>(path(":id"), (req, res, ctx) => {
    if (status === 400)
      return res(
        ctx.status(400),
        ctx.json({ message: "Bad Request", status: 400 })
      );
    // It is even better to validate the body
    return res(ctx.json(req.body));
  });
