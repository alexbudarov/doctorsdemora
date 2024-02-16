import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { PatientCreate } from "./PatientCreate";

test("<PatientCreate>", async () => {
  await act(async () => {
    render(
      <AdminContext>
        <PatientCreate resource="Patient" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.Patient.fields.firstName");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
