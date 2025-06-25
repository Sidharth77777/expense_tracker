"use client";

import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import NeedToSignIn from '@/app/_compnents/needToSignIn';
import DashBoardHeader from './dashBoardHeader';
import SideNav from './sideNav';
import LoadingDashboard from '../loading';
import LoadingBudgets from '../budgets/loading';
import LoadingExpenses from '../expenses/loading';

export default function DashboardClientWrapper({ children }) {
  const { userId, isLoaded } = useAuth();
  const pathname = usePathname();

  const isDashboardPath = '/dashboard';
  const isBudgetsPath = '/dashboard/budgets';
  const isExpensesPath = '/dashboard/expenses';
  const isAiInsightsPath = '/dashboard/ai-insights';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#581c87] to-[#0f172a] overflow-hidden">
      <DashBoardHeader />
      {/* Sidebar - always shown */}
      <div className="fixed md:w-64 hidden md:block z-10 mt-17">
        <SideNav />
      </div>
      {/* Right content */}
      <div className="md:ml-64 flex-1">
        {/* Show nothing until auth is loaded */}
        {!isLoaded && isDashboardPath===pathname ? <LoadingDashboard />  : !isLoaded && isBudgetsPath===pathname ? <LoadingBudgets /> : !isLoaded && isExpensesPath===pathname ? <LoadingExpenses /> :
        !isLoaded ? (
          <div className="h-screen flex items-center justify-center">
            <span className="text-white text-lg animate-pulse">Loading...</span>
          </div>
        ) : !userId && isDashboardPath ? (
          <NeedToSignIn />
        ) : (
          <>
            
            <div className="pt-16 pb-24 px-10 mt-10">{children}</div>
          </>
        )}
      </div>

      <aside className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0f172a] border-t border-white/10 z-20">
        <SideNav mobile />
      </aside>

    </div>
  );
}
