import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Separator } from "./ui/separator";

type CrumbItem = {
  label: string;
  url: string;
};

type Props = {
  title: string;
  crumbList: CrumbItem[];
  children: React.ReactNode;
};

export const CustomBreadcrumb = ({ title, crumbList, children }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center pt-3 pb-6">
      <div className="flex flex-row items-center space-x-4">
        <h2 className="text-xl">{title}</h2>
        <Separator orientation="vertical" className="h-5" />

        <Breadcrumb className="font-light py-1 flex items-center">
          <BreadcrumbItem className="inline-flex sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {crumbList.map((item) => {
                  return (
                    <Link href={item.url}>
                      <DropdownMenuItem key={item.label}>
                        {item.label}
                      </DropdownMenuItem>
                    </Link>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>

          <BreadcrumbList className="hidden sm:inline-flex text-black">
            {crumbList.map((item, idx) => {
              return (
                <>
                  {idx + 1 === crumbList.length ? (
                    <BreadcrumbItem key={item.label} className="font-normal">
                      {item.label}
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem key={item.label}>
                      <BreadcrumbLink
                        href={item.url}
                        className="hover:text-gray-500"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                  {idx + 1 !== crumbList.length && <BreadcrumbSeparator />}
                </>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </div>
  );
};
