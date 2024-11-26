import { AlignJustify } from "lucide-react";
import { Button } from "../../ui/button";

export default function SelectFilter() {
  return (
    <Button
      variant={"ghost"}
      className='bg-background hover:bg-background/50 active:bg-background/40 shadow'>
      <AlignJustify strokeWidth={1.5} size={20} />
    </Button>
  );
}
