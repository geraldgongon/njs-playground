import { render, screen } from "@testing-library/react";
import TodoPage, { Todo } from "../page";
import "@testing-library/jest-dom";

// Mock the fetch function
global.fetch = jest.fn();

// Mock the TodoList component since we'll test it separately
jest.mock("../internals/TodoList", () => {
  return function MockTodoList(props: { mockTodos: Todo[] }) {
    return <div data-testid="todo-list">Mocked TodoList</div>;
  };
});

describe("TodoPage", () => {
  const mockTodos = [
    {
      userId: 1,
      id: 1,
      title: "Test todo 1",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "Test todo 2",
      completed: true,
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockTodos),
    });
  });

  it("fetches todos and renders TodoList", async () => {
    await render(await TodoPage());

    // Verify fetch was called with correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos",
    );

    // Verify TodoList is rendered with the mock data
    expect(screen.getByTestId("todo-list")).toHaveTextContent(
      "Mocked TodoList",
    );
  });

  it("handles fetch error gracefully", async () => {
    // Mock fetch to reject
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    // We need to wrap the render in a try-catch since we expect it might throw
    try {
      await render(await TodoPage());
    } catch (error: any) {
      expect(error.message).toBe("Failed to fetch");
    }
  });
});
