/** @format */

import ReactDOM from "react-dom";
import Backdrop, { BackdropType } from "./backdrop";

export default function Modal({ onClick, children, className }: BackdropType) {
  const portalElement: HTMLElement = document.getElementById("overlay")!;

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop className={className} onClick={onClick} />,
        portalElement
      )}
      {children}
    </>
  );
}
