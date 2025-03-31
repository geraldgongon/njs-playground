import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList";
import "@testing-library/jest-dom";

describe("TodoList", () => {
  const MOCK_TODOS = [
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
  let mockTodos = [...MOCK_TODOS];

  afterEach(() => {
    mockTodos = [...MOCK_TODOS]
  }
  )
  it("renders all todos", () => {
    render(<TodoList initialTodos={mockTodos} />);

    expect(screen.getByText("Test todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test todo 2")).toBeInTheDocument();
  });

  it("shows completed todos with strikethrough", () => {
    render(<TodoList initialTodos={mockTodos} />);

    // The completed todo should be wrapped in <s> tags
    expect(screen.getByText("Test todo 2").closest("s")).toBeInTheDocument();
    // The incomplete todo should not be wrapped in <s> tags
    expect(screen.getByText("Test todo 1").closest("s")).toBeNull();
  });

  it("toggles todo completion status when checkbox is clicked", () => {
    render(<TodoList initialTodos={mockTodos} />);

    // Find checkboxes
    const checkboxes = screen.getAllByRole("checkbox");

    // Initially, first todo should be unchecked and not strikethrough
    expect(checkboxes[0]).not.toBeChecked();
    expect(screen.getByText("Test todo 1").closest("s")).toBeNull();

    // Click the first checkbox
    fireEvent.click(checkboxes[0]);

    // After click, first todo should be checked and have strikethrough
    expect(checkboxes[0]).toBeChecked();
    expect(screen.getByText("Test todo 1").closest("s")).toBeInTheDocument();
  });

  it("maintains todo order after toggling", () => {
    render(<TodoList initialTodos={mockTodos} />);

    const todos = screen.getAllByRole("listitem");
    expect(todos[0]).toHaveTextContent("Test todo 1");
    expect(todos[1]).toHaveTextContent("Test todo 2");

    // Toggle first todo
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    // Order should remain the same
    const todosAfterToggle = screen.getAllByRole("listitem");
    expect(todosAfterToggle[0]).toHaveTextContent("Test todo 1");
    expect(todosAfterToggle[1]).toHaveTextContent("Test todo 2");
  });

  it("handles empty todo list", () => {
    render(<TodoList initialTodos={[]} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(0);
  });


  it("hides deleted todos", () => {
    render(<TodoList initialTodos={mockTodos} />);

    const deleteIcon = screen.getByTestId("delete-1");
    
    // trash the first todo
    fireEvent.click(deleteIcon)

    const firstTodo = screen.queryByText('Test todo 1');
    expect(firstTodo).toBeNull();
  })
});
