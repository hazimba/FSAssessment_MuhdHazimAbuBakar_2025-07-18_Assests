import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center justify-center w-64 bg-gray-100 min-h-screen">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <Link href="/courses" className="text-blue-500">
          Courses
        </Link>
        <Link href="/users" className="text-blue-500">
          Users
        </Link>
      </div>
    </div>
  );
}
