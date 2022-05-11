import type { RequestHandler } from "msw";
import { setupServer } from "msw/node";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { createRequest, createResponse } from "node-mocks-http";

export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

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

export function isPropsResult<T>(
  res: GetServerSidePropsResult<T>
): res is { props: T } {
  return (
    typeof res === "object" &&
    (res as any)["props"] &&
    typeof (res as any).props === "object"
  );
}
