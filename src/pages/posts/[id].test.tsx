import { showPostHandler } from "@/fetcher/posts/show/mock";
import { assertHasProps, gsspCtx, setupMockServer } from "@/jest";
import { handlers } from "@/mock/handlers";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page, { getServerSideProps } from "./[id].page";

const server = setupMockServer(...handlers);

describe("src/pages/posts/[id].test.tsx", () => {
  test("If the data acquisition is successful, the title will be displayed.", async () => {
    const res = await getServerSideProps(
      gsspCtx({ query: { id: "lorem-ipsum" } })
    );
    assertHasProps(res);
    render(<Page {...res.props} />);
    expect(screen.getByText("Post: Lorem ipsum")).toBeInTheDocument();
  });

  test("If data acquisition fails, an error will be displayed", async () => {
    // Intercept mock Error
    server.use(showPostHandler(400));
    const res = await getServerSideProps(gsspCtx());
    assertHasProps(res);
    render(<Page {...res.props} />);
    expect(screen.getByText("Bad Request")).toBeInTheDocument();
  });
});
