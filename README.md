# Testing Next.js - getServerSideProps & API Routes -

The example of how to testing of getServerSidePorps and API Routes.

# Ecosystem Dependencies

- [msw](https://www.npmjs.com/package/msw)
- [node-mocks-http](https://www.npmjs.com/package/node-mocks-http)
- [next-test-api-route-handler](https://www.npmjs.com/package/next-test-api-route-handler)

# 1.Set pageExtensions

Set [pageExtensions](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions) in `next.config.js` to put the test file on the side of the implementation file.

```javascript
module.exports = {
  pageExtensions: ["page.tsx", "api.ts"],
};
```

The Page implementation file has the extension `page.tsx`, and the API Route implementation file has the extension` api.ts`.

# 2.MSW Handler factory

Leverage MSW for test cases.This example provide handler factory function like below.If you specify the status as an argument, the corresponding error will be returned.

```typescript
export const createHandler = (status: 200 | 400 = 200) =>
  rest.post<Data, { id: string }, Data | Err>(path(), (req, res, ctx) => {
    if (status === 400 || !req.body.title)
      return res(
        ctx.status(400),
        ctx.json({ message: "Bad Request", status: 400 })
      );
    return res(ctx.json(req.body));
  });
```

By providing a handler factory function, API server details are not leaked to the test case.

```typescript
test("400", async () => {
  // Intercept mock Error
  server.use(createHandler(400));
  // some test case
});
```

The data fetch function and the handler function that intercepts it are siblings.To summarize this, the existence of an external API server is hidden from the Next.js code and Test code.

```
src/fetcher
├── posts
│   ├── create
│   │   ├── index.ts
│   │   └── mock.ts
│   ├── delete
│   │   ├── index.ts
│   │   └── mock.ts
│   ├── list
│   │   ├── index.ts
│   │   └── mock.ts
│   ├── show
│   │   ├── index.ts
│   │   └── mock.ts
│   └── update
│       ├── index.ts
│       └── mock.ts
└── type.ts
```

# 3.Testing getServerSideProps

First, Use the function of `node-mocks-http` and prepare the context creation function of `getServerSideProps`.

```typescript
export const gsspCtx = (
  ctx?: Partial<GetServerSidePropsContext>
): GetServerSidePropsContext => ({
  req: createRequest(),
  res: createResponse(),
  params: undefined,
  query: {},
  resolvedUrl: "",
  ...ctx,
});
```

In testing file, specify that the MSW will be applied to the test case.

```typescript
const server = setupMockServer(...handlers);
```

Using the imported `getServerSideProps` and the Page component file, we can create a test case like this:

```typescript
test("If the data acquisition is successful, the title will be displayed.", async () => {
  const res = await getServerSideProps(gsspCtx());
  if (!hasProps(res)) throw new Error("no props");
  render(<Page {...res.props} />);
  expect(screen.getByText("Posts")).toBeInTheDocument();
});

test("If data acquisition fails, an error will be displayed", async () => {
  // Intercept mock Error
  server.use(listPostHandler(500));
  const res = await getServerSideProps(gsspCtx());
  if (!hasProps(res)) throw new Error("no props");
  render(<Page {...res.props} />);
  expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
});
```

Dynamic route testing can be follow with the `gsspCtx` function. This test prevents the regression caused by renaming path parameters.

```typescript
test("If the data acquisition is successful, the title will be displayed.", async () => {
  const res = await getServerSideProps(gsspCtx({ query: { id: "123" } }));
  if (!hasProps(res)) throw new Error("no props");
  render(<Page {...res.props} />);
  expect(screen.getByText("Post: Lorem ipsum")).toBeInTheDocument();
});
```

# 4.Testing API Routes

We can easily test by use the `testApiHandler` function of` next-test-api-route-handler`.

```typescript
test("201", async () => {
  await testApiHandler({
    handler,
    url: "/api/posts",
    test: async ({ fetch }) => {
      const res = await fetch(requestInit);
      await expect(res.json()).resolves.toStrictEqual(body);
    },
  });
});
```

Like `getServerSideProps`, MSW handlers utilize factory functions.`server.use(createPostHandler(400));`

```typescript
test("400", async () => {
  // Intercept mock Error
  server.use(createPostHandler(400));
  await testApiHandler({
    handler,
    url: "/api/posts",
    test: async ({ fetch }) => {
      const res = await fetch(requestInit);
      await expect(res.json()).resolves.toStrictEqual({
        message: "Bad Request",
      });
    },
  });
});
```
