import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { testDataProvider } from "../../../dataProvider/testDataProvider";
import { DoctorList } from "./DoctorList";

test("<DoctorList>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <DoctorList resource="Doctor" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.Doctor.empty");
  expect(element.constructor.name).toEqual("HTMLParagraphElement");
});
