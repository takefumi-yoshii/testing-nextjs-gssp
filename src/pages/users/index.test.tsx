import { assertHasProps, gsspCtx } from "@/jest";
import { mockUserFindMany } from "@/prisma/dao/user/mock";
import { prismaMock } from "@/prisma/jest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockReset } from "jest-mock-extended";
import Page, { getServerSideProps } from "./index.page";

describe("src/pages/posts/index.test.tsx", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  test("If the data acquisition is successful, the title will be displayed.", async () => {
    mockUserFindMany();
    const res = await getServerSideProps(gsspCtx());
    assertHasProps(res);
    render(<Page {...res.props} />);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  test("If data acquisition fails, an error will be displayed", async () => {
    mockUserFindMany(101);
    const res = await getServerSideProps(gsspCtx());
    assertHasProps(res);
    render(<Page {...res.props} />);
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });
});
