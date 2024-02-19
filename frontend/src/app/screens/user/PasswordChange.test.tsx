import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { PasswordChange } from "./PasswordChange";

test("<PasswordChange>", async () => {
  await act(async () => {
    render(
      <AdminContext>
        <PasswordChange />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  expect(screen.getByText("Password Change")).toHaveClass("MuiTypography-root");
});
