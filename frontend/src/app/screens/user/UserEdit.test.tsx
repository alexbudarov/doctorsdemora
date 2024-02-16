import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { defaultTestRecordId, testDataProvider } from "../../../dataProvider/testDataProvider";
import { UserEdit } from "./UserEdit";

test("<UserEdit>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <UserEdit resource="UserDto" id={defaultTestRecordId} />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.UserDto.fields.authorityIds");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
