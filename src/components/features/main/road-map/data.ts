import { Node, Edge } from "@xyflow/react";

export const Nodes: Node[] = [
  {
    id: "1", // Nodeのid(重複不可)
    type: "custom", // Nodeの種別
    data: { label: "Input Node" }, // Node中央に表示されるラベル
    position: { x: 0, y: 50 }, // Nodeを表示する位置
  },
  {
    id: "2", // Nodeのid(重複不可)
    type: "custom", // Nodeの種別
    data: { label: "Input Node" }, // Node中央に表示されるラベル
    position: { x: 0, y: 150 }, // Nodeを表示する位置
  },
];

export const Edges: Edge[] = [
  {
    id: "e1-2", // Edgeのid
    source: "1", // 接続元のNodeのid
    target: "2", // 接続先のNodeのid
    
  },
];
