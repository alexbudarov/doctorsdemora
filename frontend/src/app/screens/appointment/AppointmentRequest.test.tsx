import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { AdminContext } from "react-admin";
import { AppointmentRequest } from "./AppointmentRequest";

test("<AppointmentRequest>", async () => {
  await act(async () => {
    render(
      <AdminContext>
        <AppointmentRequest />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  // screen.debug();

  expect(screen.getByText("Appointment Request")).toHaveClass("MuiTypography-root");
});
