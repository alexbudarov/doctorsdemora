import {fireEvent, render, screen} from "@testing-library/react";
import {StatusPanel} from "./StatusPanel";

beforeEach(() => {
  console.log("Prepare data");
});


test("Test StatusPanel loading", () => {
  render(<StatusPanel isLoading={true}/>);

  const element: HTMLElement = screen.getByText("loading");
  expect(element.constructor.name).toBe("HTMLDivElement");
});

test("Test StatusPanel onClick", () => {
  let clicked: boolean = false;
  function generatorOnClick(): () => void {
    return () => {
      clicked = true;
    }
  }

  render(<StatusPanel isLoading={false} onClick={generatorOnClick()}/>);

  const button: HTMLElement = screen.getByText("Submit");
  fireEvent(button, new MouseEvent('click', {bubbles: true}));

  expect(clicked).toBe(true);
});