import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { DoctorCreate } from "./DoctorCreate";

test("<DoctorCreate>", async () => {
  await act(async () => {
    render(
      <AdminContext>
        <DoctorCreate resource="Doctor" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.Doctor.fields.firstName");
  expect(element.constructor.name).toEqual("HTMLSpanElement");
});
