import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UnirseProyectoForm } from "./UnirseProyecto";

export function JoinProjectButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Unirse a un proyecto</Button>
      <UnirseProyectoForm open={open} onOpenChange={setOpen} />
    </>
  );
}