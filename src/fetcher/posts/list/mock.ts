import type { Err } from "@/fetcher/type";
import { rest } from "msw";
import { Data, path } from ".";

export const listPostHandler = (status: 200 | 500 = 200) =>
  rest.get<{}, { id: string }, Data | Err>(path(), (req, res, ctx) => {
    if (status === 500)
      return res(
        ctx.status(500),
        ctx.json({ message: "Internal Server Error", status: 500 })
      );
    return res(
      ctx.json({
        items: [
          {
            id: "lorem-ipsum",
            title: "Lorem ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
          {
            id: "my-post",
            title: "my post",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
        ],
      })
    );
  });
