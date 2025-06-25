export default function LoadingExpenses() {
  return (
    <div className="pt-16 pb-24 px-10 mt-10">
      <div className="w-full flex flex-wrap lg:flex-nowrap justify-between items-center gap-2 mb-8">
        {[1, 2, 3].map((_, id) => (
          <div
            key={id}
            className="lg:w-1/3 lg:h-40 w-full h-30 rounded-3xl flex justify-between bg-[#291043] px-4 py-4 animate-pulse"
          >
            <div className="flex flex-col gap-3 w-full">
              <div className="w-1/2 h-4 bg-purple-900/60 rounded"></div>
              <div className="w-2/3 h-6 bg-purple-800/70 rounded mt-4"></div>
              <div className="w-1/3 h-3 bg-purple-900/50 rounded"></div>
            </div>
            <div className="w-10 h-10 bg-purple-900/70 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="w-full bg-[#291043] rounded-xl p-6 animate-pulse">
        <div className="flex justify-between items-center w-full">
          <div>
            <div className="h-5 w-40 bg-[#432d5a] rounded mb-2" />
            <div className="h-4 w-64 bg-[#432d5a] rounded" />
          </div>
          <div className="h-10 w-32 bg-[#432d5a] rounded-lg" />
        </div>

        <div className="flex justify-between items-center mt-5 mb-3 gap-3">
          <div className="h-10 lg:w-6/8 sm:w-3/5 bg-[#432d5a] rounded-2xl" />
          <div className="h-10 lg:w-2/8 sm:w-2/5 bg-[#432d5a] rounded-xl" />
        </div>

        <div className="mt-5 animate-pulse">
          {[1, 2, 3, 4, 5].map((c) => (
            <div
              key={c}
              className="flex justify-between items-center mb-5 bg-[#240d39] rounded-xl p-5"
            >
              <div>
                <div className="flex mb-2 items-center gap-4">
                  <div className="h-5 w-40 bg-[#432d5a] rounded-md" />
                  <div className="h-5 w-16 bg-purple-500 rounded-3xl" />
                </div>
                <div className="flex items-center gap-2 opacity-80">
                  <div className="h-4 w-4 bg-[#432d5a] rounded-full" />
                  <div className="h-4 w-24 bg-[#432d5a] rounded" />
                </div>
              </div>

              <div className="flex gap-8 items-center">
                <div className="h-6 w-20 bg-[#432d5a] rounded-md" />
                <div className="flex gap-5">
                  <div className="h-5 w-5 bg-[#432d5a] rounded" />
                  <div className="h-5 w-5 bg-[#432d5a] rounded" />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-3 mt-6">
            <div className="h-8 w-8 bg-[#432d5a] rounded" />
            <div className="h-8 w-8 bg-[#432d5a] rounded" />
            <div className="h-8 w-8 bg-[#432d5a] rounded" />
            <div className="h-8 w-8 bg-[#432d5a] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
