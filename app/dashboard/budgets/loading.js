export default function LoadingBudgets (){
    return (
        
        <div className="pt-16 pb-24 px-10 mt-10 animate-pulse">
            {/*BUDGET ONE*/}
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

        {/*BUDGET TWO*/}
        
 <div className="w-full bg-[#291043] rounded-xl sm:p-6 p-3 animate-pulse">
      {/* Header Skeleton */}
<div className="flex justify-between items-center w-full animate-pulse mb-4">
    <div className="flex flex-col gap-2">
      <div className="h-6 w-40 bg-[#3f2a58] rounded"></div>
      <div className="h-4 w-64 bg-[#3f2a58] rounded"></div>
    </div>
    <div className="h-10 w-28 bg-[#3f2a58] rounded"></div>
  </div>


        </div>
        </div>
    )
}
