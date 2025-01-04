"use client";

import React from "react";
import PreviewTask from "./preview-task";
import useNewTaskStore from "@/modules/store/new-task.store";

export default function PreviewTaskClient() {
  const previewTask = useNewTaskStore((state) => state.previewTask);
  return <div className="relative">{previewTask && <PreviewTask />}</div>;
}
