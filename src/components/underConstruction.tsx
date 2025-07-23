import { MinusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <div className="text-2xl font-bold mb-4">Under Construction</div>
      <p className=" text-gray-600 p-8 text-center">
        This page is currently under construction. Please check back later.
      </p>
      <MinusCircleOutlined />
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Go Back to Home
      </Link>
    </div>
  );
};
export default UnderConstruction;
