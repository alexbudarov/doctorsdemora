import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { UserCreate } from "./UserCreate";

test("<UserCreate>", async () => {
  await act(async () => {
    render(
      <AdminContext>
        <UserCreate resource="UserDto" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.UserDto.fields.authorityIds");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
