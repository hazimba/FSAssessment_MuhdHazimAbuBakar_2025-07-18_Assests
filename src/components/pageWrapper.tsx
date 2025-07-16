"use client";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isCreatePage = pathname.includes("create");

  return (
    <div className="relative flex flex-col items-center justify-between w-full bg-gray-200">
      <Link
        href={isCreatePage ? pathname.replace("/create", "") : "/"}
        className="absolute top-4 left-4 cursor-pointer text-blue-600 hover:underline"
      >
        <ArrowLeftOutlined />
      </Link>
      {isCreatePage ? (
        <></>
      ) : (
        <Link
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
