import { setupMockServer } from "@/jest";
import { handlers } from "@/mock/handlers";
import { testApiHandler } from "next-test-api-route-handler";
import handler from "./[id].api";

setupMockServer(...handlers);

describe("src/pages/api/posts/[id].test.ts", () => {
  const params = {
    handler,
    url: "/api/posts/[id]",
  };
  describe("PUT", () => {
    const body = {
      id: "lorem-ipsum",
      title: "Lorem ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
    const requestInit = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    };
    test("200", async () => {
      await testApiHandler({
        ...params,
        params: { id: "123" },
        test: async ({ fetch }) => {
          const res = await fetch(requestInit);
          expect(res.status).toBe(200);
          await expect(res.json()).resolves.toStrictEqual(body);
        },
      });
    });
    test("400: Missing query.id", async () => {
      await testApiHandler({
        ...params,
        test: async ({ fetch }) => {
          const res = await fetch(requestInit);
          expect(res.status).toBe(400);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Bad Request",
          });
        },
      });
    });
  });
  describe("DELETE", () => {
    const requestInit = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    test("200", async () => {
      await testApiHandler({
        ...params,
        params: { id: "123" },
        test: async ({ fetch }) => {
          const res = await fetch(requestInit);
          expect(res.status).toBe(200);
          await expect(res.json()).resolves.toStrictEqual({ id: "123" });
        },
      });
    });
    test("400: Missing query.id", async () => {
      await testApiHandler({
        ...params,
        test: async ({ fetch }) => {
          const res = await fetch(requestInit);
          expect(res.status).toBe(400);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Bad Request",
          });
        },
      });
    });
  });
  describe("POST", () => {
    test("405", async () => {
      await testApiHandler({
        ...params,
        test: async ({ fetch }) => {
          const res = await fetch({ method: "POST" });
          expect(res.status).toBe(405);
          await expect(res.json()).resolves.toStrictEqual({
            message: "Method Not Allowed",
          });
        },
      });
    });
  });
});
