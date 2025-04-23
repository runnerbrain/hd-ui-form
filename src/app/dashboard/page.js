// src/app/dashboard/page.js
export const dynamic = 'force-dynamic';  // <-- now honored, because this is a Server Component

import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  return <DashboardClient />;
}
