import EmptyTaskModule from "@/modules/common/components/shared/empty-state/empty-task-module";
import React from "react";

export default function Page() {
  return (
    <div>
      <EmptyTaskModule text='Yout trash is empty!' />
    </div>
  );
}
