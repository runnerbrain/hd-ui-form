'use client';
export const dynamic = 'force-dynamic';

import {useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import commonStyles from '../common/common.module.css';
import homeStyles from '../home.module.css';


export default function LineOfBusiness() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const ticketType = searchParams.get('ticketType');

  const [selectedLOB, setSelectedLOB] = useState('');
  
  const lobOptionsByRole = {
  Radiologist:
  [
    'PACS',
    'FFI',
    'Vitrea',
    'Circle',
    'Rapid',
    'Cerner',
    'MIM',
    'Pathology',
    'MRI Backup',
    'Other'
  ],
  Technologist: ['PACS',
    'Vitrea',
    'Circle',
    'Rapid',
    'Cerner',
    'MIM',
    'Pathology',
    'MRI Backup',
    'Other'],
  Staff: ['PACS','Cerner', 'Pathology','Other']
}

const lineOfBusinessOptions = lobOptionsByRole[role] || ['no Category selected'];
  const handleLOBSelection = (lob) => {
    console.log(`Selected Line of Business: ${lob}`);
    setSelectedLOB(lob);
    // Navigate to the next page or perform further actions here


   // Route to appropriate details page
   if (ticketType === 'srq') {
    router.push(`/lob/lobDetails/srqDetails?role=${role}&ticketType=${ticketType}&lob=${lob}`);
  } else if (ticketType === 'inc') {
    router.push(`/lob/lobDetails/incDetails?role=${role}&ticketType=${ticketType}&lob=${lob}`);
  }

}

  return (
    <div className={homeStyles.container}>
      <button onClick={() => router.push(`/dashboard?role=${role}`)} className={commonStyles.backButton}>
        ⬅ Back
      </button>
      <div className={commonStyles.header}>
        <span>Role: {role}</span>
        <span>Ticket Type: {ticketType}</span>
      </div>
      <div className={commonStyles.formRow}>
        <label className={commonStyles.label}>Line of Business:</label>
        <select className={commonStyles.dropdown} 
          onChange={(e) => handleLOBSelection(e.target.value)}
        >
        <option value="">Select a Line of Business</option>
        {lineOfBusinessOptions.map((lob) => (
          <option key={lob} value={lob}>
            {lob}
          </option>
        ))}
        </select>
      </div>

      

    </div>
  );
}


