import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data }: { data: { label: string; checked: boolean; onToggle: () => void } }) => {
  return (
    <div style={{ border: "1px solid black", padding: 10, borderRadius: 5, background: "white" }}>
      <input
        type="checkbox"
        checked={data.checked}
        onChange={data.onToggle}
        style={{ marginRight: 5 }}
      />
      {data.label}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default CustomNode;
