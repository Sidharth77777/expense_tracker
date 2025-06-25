import DashboardClientWrapper from './_components/dashboardClientWrapper';

export default function DashboardLayout({ children }) {
  return (
    <DashboardClientWrapper>
      {children}
    </DashboardClientWrapper>
  );
}
