const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200">
      {children}
    </div>
  );
};
export default PageWrapper;
