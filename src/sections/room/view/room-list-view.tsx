import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CustomBreadcrumb } from "@/components/custom-breadcrumb";

import { paths } from "@/static";

import { RoomContent } from "../room-content";

export default function RoomListView() {
  return (
    <div className="grid grid-rows-[60px_10px_1fr] p-4 h-full">
      <CustomBreadcrumb
        title="방만들기"
        crumbList={[
          { label: "Home", url: paths.home },
          { label: "Room", url: paths.room.root },
        ]}
      >
        <Link href={paths.room.root}>
          <Button className="h-8 font-normal">
            <Plus /> <span className="uppercase">new</span>
          </Button>
        </Link>
      </CustomBreadcrumb>

      <Separator className="bg-black" />

      <RoomContent />
    </div>
  );
}
