import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { testDataProvider } from "../../../dataProvider/testDataProvider";
import { PatientList } from "./PatientList";

test("<PatientList>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <PatientList resource="Patient" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.Patient.empty");
  expect(element.constructor.name).toEqual("HTMLParagraphElement");
});
