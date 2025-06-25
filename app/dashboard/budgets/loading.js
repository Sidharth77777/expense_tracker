export default function LoadingBudgets (){
    return (
        
        <div className="pt-16 pb-24 px-10 mt-10 animate-pulse">
            {/*BUDGET ONE*/}
            <div className="w-full flex flex-wrap lg:flex-nowrap justify-between items-center gap-2 mb-8">
            {[1,2,3].map((_,id) => (
            <div key={id} className="lg:w-1/3 lg:h-40 w-full h-30 rounded-xl flex justify-between bg-[#291043] px-4 py-4 animate-pulse">
                <div className="w-full">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-600 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4"></div>
            </div>
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            </div>
            ))}
        </div>   

        {/*BUDGET TWO*/}
        
 <div className="w-full bg-[#291043] rounded-xl p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center w-full mb-6">
        <div>
          <div className="h-6 w-48 bg-gray-600 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-700 rounded"></div>
        </div>
        <div className="flex gap-2 items-center bg-[#9333ea] px-3 py-2 rounded">
          <div className="h-6 w-6 bg-gray-500 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-500 rounded"></div>
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="flex mb-8 w-full items-center flex-wrap gap-6 mt-6">
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            key={idx}
            className="xl:w-[48%] w-full bg-gradient-to-r from-[#160c27] via-[#240d39] to-[#230d38] rounded-xl px-6 py-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-5 w-5 bg-gray-500 rounded-full"></div>
                  <div className="h-4 w-32 bg-gray-500 rounded"></div>
                  <div className="h-6 w-20 bg-gray-600 rounded-xl"></div>
                </div>
                <div className="h-4 w-40 bg-gray-700 rounded mb-2"></div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-4">
                  <div className="h-6 w-6 bg-gray-600 rounded"></div>
                  <div className="h-6 w-6 bg-gray-600 rounded"></div>
                </div>
                <div className="h-4 w-12 bg-gray-600 rounded"></div>
              </div>
            </div>

            <div className="w-full mt-4 h-4 bg-gray-700 rounded-full overflow-hidden mb-5">
              <div
                className="bg-purple-800 h-full rounded-full transition-all duration-500"
                style={{ width: "60%" }}
              ></div>
            </div>

            <div className="h-4 w-40 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    </div>

        </div>
    )
}
