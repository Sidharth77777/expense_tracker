"use client"

import Link from "next/link"
import { Cell, Pie, PieChart, ResponsiveContainer,Tooltip, Legend } from "recharts"
//import { useMemo } from "react"

export default function Chart({ totalData, budgetData, expenseData, chartDataGot }) {
  const RADIAN = Math.PI / 180

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const transformedData = budgetData.map(item => ({
    name: item.name,
    value: Number(item.budget),
  }))

const generateUniqueColors = (count) => {
  const usedHues = new Set();
  const colors = [];

  while (colors.length < count) {
    const hue = Math.floor(Math.random() * 360);
    if (!usedHues.has(hue)) {
      usedHues.add(hue);
      colors.push(`hsl(${hue}, 90%, 50%)`);
    }
  }

  return colors;
};


  const COLORS = generateUniqueColors(transformedData.length)

  if (!transformedData.length) return <div className="h-50 w-full flex justify-center items-center"><p className="text-center text-sm">No budget data available. Start by creating one <Link href='/dashboard/budgets' className="hover:text-blue-800 text-blue-400">HERE</Link> </p></div>
  
  return (
    <div className="p-4">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={transformedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {transformedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
            
                <Legend verticalAlign="bottom" />
            
            
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
