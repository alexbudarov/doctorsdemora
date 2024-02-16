import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { defaultTestRecordId, testDataProvider } from "../../../dataProvider/testDataProvider";
import { AuthorityEdit } from "./AuthorityEdit";

test("<AuthorityEdit>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <AuthorityEdit resource="AuthorityDto" id={defaultTestRecordId} />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.AuthorityDto.fields.description");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
