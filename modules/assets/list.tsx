import BorderAsIcon from "../common/components/shared/border-as-icon";
import { HouseSvg } from "./svgs";

export const list: ListType[] = [
  {
    id: crypto.randomUUID(),
    label: "home",
    numberOfTask: 0, // Default value
    icon: <HouseSvg />,
    default: true,
  },
  {
    id: crypto.randomUUID(),
    label: "completed",
    numberOfTask: 0, // Default value
    icon: <BorderAsIcon borderColor={"#000000"} />,
    default: true,
  },
  {
    id: crypto.randomUUID(),
    label: "personal",
    numberOfTask: 0, // Default value
    icon: <BorderAsIcon borderColor={"#3498db"} />,
    default: true,
  },
  {
    id: crypto.randomUUID(),
    label: "work",
    numberOfTask: 0, // Default value
    icon: <BorderAsIcon borderColor={"#000000"} />,
    default: true,
  },
];
