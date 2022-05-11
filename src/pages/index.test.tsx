import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Page } from "./index.page";

describe("src/pages/posts/index.test.tsx", () => {
  test("The title should be displayed", async () => {
    render(<Page />);
    expect(screen.getByText("My Blog")).toBeInTheDocument();
  });
});
