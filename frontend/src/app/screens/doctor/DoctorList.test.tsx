import "@testing-library/jest-dom";
import {act, render, screen} from "@testing-library/react";
import {AdminContext} from "react-admin";
import {DoctorList} from "./DoctorList";
import {Specialty} from "@amplicode/gql/graphql";
import {DataProvider} from "ra-core";
import {testDataProvider as raTestDataProvider} from "ra-core/dist/cjs/dataProvider/testDataProvider";
import {GetListResult} from "ra-core/src/types";

const myDataProvider: DataProvider = raTestDataProvider({
  getList: () => Promise.resolve(
    { data: [
        {
          "id": 1,
          "firstName": "Name 1",
          "lastName": "Surname 1",
          "specialty": Specialty.Dermatology
        },
        {
          "id": 2,
          "firstName": "Name 2",
          "lastName": "Surname 2",
          "specialty": Specialty.Neurology
        }
      ],
      total: 1
    } as GetListResult
  )
});

test("<DoctorList>", async () => {
  await act(async () => {
    render(
      <AdminContext dataProvider={myDataProvider}>
        <DoctorList resource="Doctor" />
      </AdminContext>
    );
  });

  // full render result could be shown via `screen.debug()` method
  //screen.debug(undefined, 100_000);

  // table cell with Dermatology exists
  const element: HTMLElement = screen.getByText("enums.Specialty.DERMATOLOGY");
  expect(element.parentElement?.constructor.name).toBe("HTMLTableCellElement");
  expect(element.parentElement?.className).toContain("column-specialty");

  // exactly two Delete buttons
  expect(screen.getAllByRole("button", {name: "ra.action.delete"})).toHaveLength(2);
});
