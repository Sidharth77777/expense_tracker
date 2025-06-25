"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart
} from "recharts"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState, useMemo } from "react"

export default function DashThree({ chartData }) {
  const [mode, setMode] = useState("daily")
  const scrollRef = useRef(null)
  const [userScrolled, setUserScrolled] = useState(false)
  const [tooltipActive, setTooltipActive] = useState(false)

  const budgetColor = '#10B981'
  const expenseColor = '#E11D48'
  const lineColor = '#22D3EE'

  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)

  useEffect(() => {
    const graph = document.getElementById("scroll-daily-x")
    const onMove = () => setTooltipActive(true)
    const onLeave = () => setTooltipActive(false)

    if (graph) {
      graph.addEventListener("mousemove", onMove)
      graph.addEventListener("mouseleave", onLeave)
    }

    return () => {
      if (graph) {
        graph.removeEventListener("mousemove", onMove)
        graph.removeEventListener("mouseleave", onLeave)
      }
    }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => setUserScrolled(true)
    el.addEventListener("scroll", handleScroll, { passive: true })

    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  const filledChartData = useMemo(() => {
    const map = new Map()
    chartData.forEach(item => {
      const date = new Date(item.date)
      const key = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      map.set(key, {
        ...item,
        date: key,
        budget: Number(item.budget),
        expense: Number(item.expense),
      })
    })

    const result = []
    for (let d = new Date(firstDay); d <= today; d.setDate(d.getDate() + 1)) {
      const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      result.push(map.get(key) || { date: key, budget: 0, expense: 0 })
    }

    return result
  }, [chartData])

  const monthlyData = useMemo(() => {
    const grouped = {}

    filledChartData.forEach(item => {
      const dateObj = new Date(item.date + " 2025")
      const month = dateObj.toLocaleString("en-US", { month: "short" })

      if (!grouped[month]) grouped[month] = { month, budget: 0, expense: 0 }

      grouped[month].budget += Number(item.budget)
      grouped[month].expense += Number(item.expense)
    })

    return Object.values(grouped)
  }, [filledChartData])

  useEffect(() => {
    if (userScrolled || !scrollRef.current) return

    const el = scrollRef.current
    const scrollToLatest = () => {
      const barWidth = 80
      const scrollPosition = (filledChartData.length - 10) * barWidth
      if (el.scrollWidth > el.clientWidth) {
        el.scrollTo({ left: scrollPosition > 0 ? scrollPosition : 0, behavior: "smooth" })
      } else {
        requestAnimationFrame(scrollToLatest)
      }
    }

    const timeout = setTimeout(() => scrollToLatest(), 100)
    return () => clearTimeout(timeout)
  }, [filledChartData, userScrolled])

  return (
    <div className="mt-10 w-full bg-[#291043] rounded-2xl px-4 sm:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-semibold">Budget vs Expense</h1>
          <h2 className="text-sm sm:text-lg text-gray-300">
            {mode === "daily" ? "This Month Daily View" : "This Year Monthly View"}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant={mode === "daily" ? "default" : "outline"}
            onClick={() => setMode("daily")}
            className="cursor-pointer"
          >
            Daily
          </Button>
          <Button
            variant={mode === "monthly" ? "default" : "outline"}
            onClick={() => setMode("monthly")}
            className="cursor-pointer"
          >
            Monthly
          </Button>
        </div>
      </div>

      {mode === "daily" && (
        <div className="relative mt-8">
          <div
            className="overflow-x-auto scrollNone scrollSnapX"
            ref={scrollRef}
            id="scroll-daily-x"
          >
            <div style={{ minWidth: `${filledChartData.length * 80}px`, height: "350px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={filledChartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    content={(props) => {
                      if (props?.payload?.length) {
                        const filtered = props.payload.filter(p => p.name !== "Expense Trend")
                        return (
                          <div className="bg-white text-black p-2 rounded shadow">
                            {filtered.map((entry, i) => (
                              <div key={i}>
                                {entry.name}: ₹{entry.value}
                              </div>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="budget" fill={budgetColor} name="Budget" />
                  <Bar dataKey="expense" fill={expenseColor} name="Spent" />
                  {!tooltipActive && (
                    <Line
                      type="monotone"
                      dataKey="expense"
                      name="Expense Trend"
                      stroke={lineColor}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {mode === "monthly" && (
        <div className="mt-8 overflow-x-auto scrollNone">
          <div style={{ minWidth: `${monthlyData.length * 100}px`, height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(val) => `₹${val.toFixed(2)}`} />
                <Bar dataKey="budget" fill={budgetColor} name="Budget" />
                <Bar dataKey="expense" fill={expenseColor} name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3" style={{ background: budgetColor }} />
          <span className="text-sm" style={{ color: budgetColor }}>BUDGET</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3" style={{ background: expenseColor }} />
          <span className="text-sm" style={{ color: expenseColor }}>SPENT</span>
        </div>
      </div>
    </div>
  )
}
