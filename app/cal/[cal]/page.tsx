import CalendarView from '@components/CalendarView';

export default async function CalPage({
  params
}: {
  params: Promise<{ cal: string }>
}) {
  const cal = (await params).cal;

  // For demo purposes just checking if it matches our demo data
  if (cal !== 'demo') {
    return <div>Calendar not found</div>;
  }

  return <CalendarView />;
} 