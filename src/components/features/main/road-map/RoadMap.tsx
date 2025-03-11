"use client";
import style from "./RoadMap.module.scss";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Nodes, Edges } from "./data";
import CustomNode from "@/const/custom-node/CustomNode";

const nodeTypes = { custom: CustomNode };

export default function RoadMap() {
  return (
    <>
      <div className={style.roadMap}>
          <ReactFlow nodes={Nodes} edges={Edges} nodeTypes={nodeTypes} />
      </div>
    </>
  );
}
