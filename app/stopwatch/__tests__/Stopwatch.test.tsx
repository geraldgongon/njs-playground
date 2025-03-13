import { render, screen, act, fireEvent } from "@testing-library/react";
import Stopwatch, { DAY_IN_MILLIS } from "../page";
import "@testing-library/jest-dom";

describe("Stopwatch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders initial time as 00:00:00:00.000", () => {
    const component = render(<Stopwatch />);
    expect(component.getByText("00:00:00:00.000")).toBeInTheDocument();
  });

  test("starts and stops the timer", () => {
    render(<Stopwatch />);

    // Get the start button and click it
    const startButton = screen.getByText("start");
    fireEvent.click(startButton);

    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("00:00:00:01.000")).toBeInTheDocument();

    // Now the button should say "stop"
    const stopButton = screen.getByText("stop");
    fireEvent.click(stopButton);

    // Advance timer again, time should not change
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("00:00:00:01.000")).toBeInTheDocument();
  });

  test("resets the timer", () => {
    render(<Stopwatch />);

    // Start the timer
    fireEvent.click(screen.getByText("start"));

    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Click reset
    fireEvent.click(screen.getByText("reset"));

    // Should be back to initial state
    expect(screen.getByText("00:00:00:00.000")).toBeInTheDocument();
    expect(screen.getByText("start")).toBeInTheDocument();
  });

  test("formats days/hours/mins/seconds resets properly", () => {
    render(<Stopwatch />);

    // Get the start button and click it
    const startButton = screen.getByText("start");
    fireEvent.click(startButton);

    // Advance timer to 1ms before the next day
    act(() => {
      jest.advanceTimersByTime(DAY_IN_MILLIS - 1);
    });

    expect(screen.getByText("00:23:59:59.990")).toBeInTheDocument();

    // Advance timer by 1ms
    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByText("01:00:00:00.000")).toBeInTheDocument();
  });
});
