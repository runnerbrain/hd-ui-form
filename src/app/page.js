// src/app/page.js
'use client';

import styles from './home.module.css';
import commonStyles from './common/common.module.css';



import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleRoleSelection = (role) => {
    router.push(`/dashboard?role=${role}`);
  };

  return (
    <div className={styles.container}>
      <h1>Please select your role:</h1>
      <div className={commonStyles.buttons}>
        <button className={commonStyles.button} onClick={() => handleRoleSelection('Radiologist')}>Radiologist/Physician</button>
        <button className={commonStyles.button} onClick={() => handleRoleSelection('Technologist')}>Technologist</button>
        <button className={commonStyles.button} onClick={() => handleRoleSelection('Staff')}>Staff</button>
      </div>
    </div>
  );


}
