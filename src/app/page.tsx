import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center justify-center w-screen bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold">Menu</h2>
        <Link href="/courses" className="text-blue-500 text-xl">
          Courses
        </Link>
        <Link href="/users" className="text-blue-500 text-xl">
          Users
        </Link>
      </div>
    </div>
  );
}
