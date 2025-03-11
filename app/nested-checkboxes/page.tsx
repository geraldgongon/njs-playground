import Checkboxes from "./internals/Checkboxes";
import { checkboxesData } from "./requirements";

export default function App() {
  return (
    <div>
      <Checkboxes defaultCheckboxData={checkboxesData} />
    </div>
  );
}
