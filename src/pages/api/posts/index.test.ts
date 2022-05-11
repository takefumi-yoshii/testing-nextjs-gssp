import { createPostHandler } from "@/fetcher/posts/create/mock";
import { setupMockServer } from "@/jest";
import { handlers } from "@/mock/handlers";
import { testApiHandler } from "next-test-api-route-handler";
import handler from "./index.api";

const server = setupMockServer(...handlers);

describe("src/pages/api/posts/index.test.ts", () => {
  const params = {
    handler,
    url: "/api/posts",
  };
  describe("POST", () => {
    const body = {
      id: "lorem-ipsum",
      title: "Lorem ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
    const requestInit = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    };
    test("201", async () => {
      await testApiHandler({
        ...params,
        test: async ({ fetch }) => {
          const res = await fetch(requestInit);
          await expect(res.json()).resolves.toStrictEqual(body);
        },
      });
    });
    test("400", async () => {
      // Intercept mock Error
      server.use(createPostHandler(400));
      await testApiHandler({
        ...params,
        test: async ({ fetch }) => {
          const res = await fetch(requestInit);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Bad Request",
          });
        },
      });
    });
  });
  describe("PUT", () => {
    test("405", async () => {
      await testApiHandler({
        ...params,
        test: async ({ fetch }) => {
          const res = await fetch({ method: "PUT" });
          await expect(res.json()).resolves.toStrictEqual({
            message: "Method Not Allowed",
          });
        },
      });
    });
  });
});
