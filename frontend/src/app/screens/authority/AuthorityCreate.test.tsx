import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { AuthorityCreate } from "./AuthorityCreate";

test("<AuthorityCreate>", async () => {
  await act(async () => {
    render(
      <AdminContext>
        <AuthorityCreate resource="AuthorityDto" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.AuthorityDto.fields.description");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
