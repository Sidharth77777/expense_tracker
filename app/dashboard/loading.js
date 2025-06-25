export default function LoadingDashboard() {
  return (
    <div className="pt-16 pb-24 px-10 mt-10">
    <div className="w-full mb-7 gap-2 flex justify-center items-center animate-pulse">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="w-full md:w-1/3 h-40 rounded-xl flex justify-between bg-[#1c0f32] px-4 py-4 "
        >
          <div className="flex flex-col justify-between w-full">
            <div className="h-4 bg-gray-700 rounded w-2/5 mb-2" />
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
          </div>
          <div className="h-10 w-10 bg-gray-800 rounded-full" />
        </div>
      ))}
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

    {/* Simulated Transaction List */}
    <div className="mt-3 mb-2 border-b-1 border-[#412958]">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-full h-20 bg-[#260d3c] rounded-xl px-6 py-3 mb-3 flex justify-between items-center">
          <div>
            <div className="h-4 w-24 bg-gray-600 rounded mb-2"></div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-28 bg-gray-700 rounded-3xl"></div>
              <div className="h-3 w-12 bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="h-5 w-16 bg-gray-600 rounded"></div>
        </div>
      ))}
    </div>

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
