import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { testDataProvider } from "../../../dataProvider/testDataProvider";
import { AppointmentList } from "./AppointmentList";

test("<AppointmentList>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={testDataProvider}>
        <AppointmentList resource="Appointment" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  const element: HTMLElement = screen.getByText("resources.Appointment.empty");
  expect(element.constructor.name).toEqual("HTMLParagraphElement");
});
