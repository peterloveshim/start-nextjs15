import { useAuthContext } from "@/hooks/use-auth-context";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const DrawerContent = () => {
  const { user } = useAuthContext();
  return (
    <>
      <SheetTrigger className="flex gap-2 items-center transition duration-200 hover:text-gray-900 hover:bg-gray-100 rounded-sm py-1 px-2">
        <span className="text-sm">{user?.email}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-user-round"
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </SheetContent>
    </>
  );
};
