import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { defaultTestRecordId, testDataProvider } from "../../../dataProvider/testDataProvider";
import { DoctorShow } from "./DoctorShow";

test("<DoctorShow>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <DoctorShow resource="Doctor" id={defaultTestRecordId} />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.Doctor.fields.firstName");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
