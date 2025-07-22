"use client";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // mainpath is "/"
  // subpath is "/courses" and "/users"
  // if pathname includes "create" and "view", it is a create page and view page respectively
  // need to remove create and view from pathname to get the subpath
  // if in subpath, can go back to mainpath
  // in view page and have id, need to remove the id from pathname to go back to subpath

  const isCreatePage = pathname.includes("create");
  const isViewPage = pathname.includes("view");
  const isMainPath = pathname === "/";
  const isSubPath = !isMainPath && !isCreatePage && !isViewPage;

  return (
    <div className="relative flex flex-col items-center justify-between w-full bg-gray-200">
      <Link
        prefetch={false}
        href={
          isSubPath
            ? "/"
            : isCreatePage
            ? pathname.replace("/create", "")
            : isViewPage
            ? pathname.replace(/\/view\/[^/]+$/, "")
            : "/"
        }
        className="absolute top-4 left-4 cursor-pointer text-blue-600 hover:underline"
      >
        <ArrowLeftOutlined />
      </Link>
      {isCreatePage ? (
        <></>
      ) : (
        <Link
          prefetch={false}
          href={`${pathname}/create`}
          className="absolute top-4 right-4 text-green-600 hover:text-green-800 font-bold text-xl"
        >
          <PlusOutlined />
        </Link>
      )}
      <div className="flex flex-col h-screen w-3/4 items-center justify-center">
        {children}
      </div>
    </div>
  );
};
export default PageWrapper;
