import { postListHandler } from "@/fetcher/posts/list/mock";
import { gsspCtx, isPropsResult, setupMockServer } from "@/jest";
import { handlers } from "@/mock/handlers";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page, { getServerSideProps } from "./index.page";

const server = setupMockServer(...handlers);

describe("src/pages/posts/index.test.tsx", () => {
  test("If the data acquisition is successful, the title will be displayed.", async () => {
    const res = await getServerSideProps(gsspCtx());
    if (!isPropsResult(res)) throw new Error("no props");
    render(<Page {...res.props} />);
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });

  test("If data acquisition fails, an error will be displayed", async () => {
    // Intercept mock Error
    server.use(postListHandler(500));
    const res = await getServerSideProps(gsspCtx());
    if (!isPropsResult(res)) throw new Error("no props");
    render(<Page {...res.props} />);
    expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
  });
});
