import { assertHasProps, gsspCtx } from "@/jest";
import { mockUserFindUnique } from "@/prisma/dao/user/mock";
import { prismaMock } from "@/prisma/jest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockReset } from "jest-mock-extended";
import Page, { getServerSideProps } from "./[id].page";

describe("src/pages/users/[id].test.tsx", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  async function gssp(id: number) {
    mockUserFindUnique(id);
    const res = await getServerSideProps(gsspCtx({ query: { id: "" + id } }));
    assertHasProps(res);
    return res;
  }

  test("If the data acquisition is successful, the title will be displayed.", async () => {
    const res = await gssp(1);
    render(<Page {...res.props} />);
    expect(screen.getByText("User: takepepe+1")).toBeInTheDocument();
  });

  test("If data acquisition fails, an error will be displayed", async () => {
    const res = await gssp(100);
    render(<Page {...res.props} />);
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });
});
