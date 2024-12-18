import { cn } from "@/lib/utils";
import { GoogleMeetSVG, WhatsAppSVG, ZoomSVG } from "@/modules/assets/svgs";
import useNewTaskStore from "@/modules/store/new-task.store";
import React from "react";

const method = [
  {
    name: "whatsapp",
    icon: <WhatsAppSVG />,
  },
  {
    name: "zoom",
    icon: <ZoomSVG />,
  },
  {
    name: "meet",
    icon: <GoogleMeetSVG />,
  },
];

export default function CallMethods() {
  const setCallMethod = useNewTaskStore((state) => state.setCallMethod);
  const callMethod = useNewTaskStore((state) => state.callMethod);

  return (
    <div className='flex space-x-2 items-center'>
      {method.map((method) => (
        <div
          onClick={() => setCallMethod(method.name)}
          key={method.name}
          className={cn(
            callMethod === method.name && "border bg-foreground/10",
            "w-max h-max grid place-items-center p-2 rounded-lg border border-transparent hover:border-border active:scale-95 transition cursor-pointer"
          )}>
          {method.icon}
        </div>
      ))}
    </div>
  );
}
