import { GoogleMeetSVG, WhatsAppSVG, ZoomSVG } from "@/modules/assets/svgs";
import React from "react";

export default function CallMethods() {
  return (
    <div className='flex space-x-2 items-center'>
      <div className='w-max h-max grid place-items-center p-2 rounded-lg border border-transparent hover:border-border cursor-pointer'>
        <WhatsAppSVG />
      </div>
      <div className='w-max h-max grid place-items-center p-2 rounded-lg border border-transparent hover:border-border cursor-pointer'>
        <ZoomSVG />
      </div>
      <div className='w-max h-max grid place-items-center p-2 rounded-lg border border-transparent hover:border-border cursor-pointer'>
        <GoogleMeetSVG />
      </div>
    </div>
  );
}
