export default function LoadingDashboard() {
  return (
    <div className="pt-16 pb-24 px-10 mt-10">
 <div className="w-full flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap mb-8">
      {
        [1,2,3].map((id) => (
            <div key={id} className="animate-pulse bg-[#291043] rounded-2xl p-4 w-full sm:w-[48%] lg:w-1/3">
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-500 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            </div>
          ))

          }
    </div>

      <div className="flex flex-wrap xl:flex-nowrap justify-center gap-4 items-center animate-pulse">
  {/* Left Box */}
  <div className="w-full md:w-full xl:w-1/2 h-120 bg-[#291043] rounded-xl p-5">
    <div className="h-6 w-1/3 bg-gray-600 rounded mb-4"></div>
    <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
  </div>

  {/* Right Box */}
  <div className="w-full md:w-full xl:w-1/2 h-120 bg-[#291043] rounded-xl p-5 overflow-y-scroll scrollNone">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
      <div className="h-6 w-1/2 bg-gray-600 rounded"></div>
    </div>
    <div className="h-4 w-1/3 bg-gray-700 rounded mb-6"></div>



    <div className="h-4 w-1/2 mx-auto bg-gray-600 rounded mt-2"></div>
  </div>
</div>
      <div className="mt-10 w-full h-150 bg-[#291043] rounded-2xl p-12 animate-pulse">
  
  <div className="h-6 w-1/3 bg-gray-600 rounded mb-3"></div>
  <div className="h-4 w-1/2 bg-gray-700 rounded mb-8"></div>

  
  <div className="w-full h-90 bg-gray-700 rounded-xl"></div>
</div>

    </div>
  );
}
