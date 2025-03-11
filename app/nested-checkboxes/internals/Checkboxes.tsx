"use client";
import { useState } from "react";
import { CheckboxItem } from "./types";

type RecursiveCBoxProps = {
  node: CheckboxItem;
};

const RecursiveCBox = ({ node }: RecursiveCBoxProps) => {
  const [newNode, setNewNode] = useState(node);
  const { id, name, checked, children } = newNode;

  const toggleCheckbox = (node: CheckboxItem) => {
    const toggleNode = (n: CheckboxItem): CheckboxItem => {
      const newNode = { ...n, checked: !node.checked };

      if (n.children) {
        newNode.children = n.children.map((child) => toggleNode(child));
      }

      return newNode;
    };

    const result = toggleNode(node);
    console.log(result);
    setNewNode(result);
  };

  console.log("newNode:", newNode);
  return (
    <div className="indent">
      <label htmlFor={`cbx-${id}`}>
        <input
          id={`cbx-${id}`}
          type="checkbox"
          checked={checked}
          onChange={() => toggleCheckbox(newNode)}
        />
        {name}
      </label>

      {children?.map((child: CheckboxItem) => (
        <RecursiveCBox node={child} key={child.id} />
      ))}
    </div>
  );
};

export default function Checkboxes({
  defaultCheckboxData,
}: {
  defaultCheckboxData: CheckboxItem[];
}) {
  console.log(defaultCheckboxData);
  return (
    <div>
      {defaultCheckboxData.map((node: CheckboxItem) => (
        <RecursiveCBox node={node} key={node.id} />
      ))}
    </div>
  );
}
