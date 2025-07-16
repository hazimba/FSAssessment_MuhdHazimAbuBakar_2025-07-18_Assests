import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-200">
      <Link
        href="/"
        className="absolute top-4 left-4 cursor-pointer text-blue-600 hover:underline"
      >
        <ArrowLeftOutlined />
      </Link>

      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
};
export default PageWrapper;
