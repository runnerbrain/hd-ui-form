'use client';
export const dynamic = 'force-dynamic';

import { useRouter, useSearchParams } from 'next/navigation';
import commonStyles from '../common/common.module.css';
import homeStyles from '../home.module.css';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  // console.log(`from dashboard ${role}`);
  const ticketType = '...'; // Placeholder until ticket type is selected

  return (
    
    <div className={homeStyles.container}>
      <button onClick={() => router.push('/')} className={commonStyles.backButton}>
        ⬅ Back
      </button>
      <div className={commonStyles.header}>
        <span>Role: {role}</span>
        <span>Ticket Type: {ticketType}</span>
      </div>
      <div className={commonStyles.buttons}>
        <button className={commonStyles.button} onClick={() => router.push(`/lob?role=${role}&ticketType=inc`)}>
          I have an issue
        </button>
        <button className={commonStyles.button} onClick={() => router.push(`/lob?role=${role}&ticketType=srq`)}>
          I need something done
        </button>
      </div>
    </div>
  );
}


// serviceRequest   incident