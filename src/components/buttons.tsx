import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const addClassName = className ?? "";
  return (
    <Button disabled className={addClassName}>
      <Loader2 className="animate-spin" />
      {children}
    </Button>
  );
}
