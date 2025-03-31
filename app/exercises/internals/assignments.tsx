import Link from "@mui/material/Link";

export interface checklist {
  label: string | React.ReactNode;
  completed: boolean;
}

export const takeHomeAssignments: checklist[] = [
  {
    label:
      "Build a simple task management app where users can add, edit, and delete tasks",
    completed: false,
  },
  {
    label:
      "Render the above with swimlanes, similar to a Jira sprint task board",
    completed: false,
  },
  {
    label:
      "Implement a e-commerce product listings page that allows for searching, filtering, and sorting",
    completed: false,
  },
  {
    label:
      "Create a weather app that fetches data from an API and displays weather conditions dynamically",
    completed: false,
  },
  {
    label:
      "Design and implement a dashboard with charts using React and a charting library",
    completed: false,
  },
  {
    label: (
      <>
        Build a paginated data table (see{" "}
        <Link
          target="_blank"
          href="https://www.greatfrontend.com/questions/user-interface/data-table/react?framework=react&tab=coding"
        >
          https://www.greatfrontend.com/questions/user-interface/data-table/react?framework=react&tab=coding
        </Link>
      </>
    ),
    completed: false,
  },
  { label: "Build a progress bar", completed: false },
  { label: "Build a tabs component", completed: false },
  { label: "Build a digital clock", completed: false },
  { label: "Build a tic-tac-toe game", completed: false },
  { label: "Build a minesweeper game", completed: false },
  { label: "Build a Connect Four game", completed: false },
  { label: "Build a throttle function", completed: true },
  { label: "Build a flatten function", completed: false },
  { label: "Build a curry function", completed: false },
  { label: "Build a cloneDeep function", completed: false },
  { label: "implement zustand", completed: false },
  { label: "persist todos into localstorage", completed: false },
];
