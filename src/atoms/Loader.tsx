export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-16 px-4 sm:px-8 min-h-[220px] sm:min-h-[300px]">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-primary font-semibold text-base sm:text-lg">Loading...</p>
    </div>
  );
}