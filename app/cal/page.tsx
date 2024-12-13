'use client';

import '@root/global.scss';
import styles from './Cal.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';
import { useRouter } from 'next/navigation';

import Card from '@components/Card';
import Input from '@components/Input';
import ActionButton from '@components/ActionButton';

export default function CalEntry() {
  const router = useRouter();
  const [calName, setCalName] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = () => {
    if (!calName.trim()) {
      setError('Please enter a calendar name');
      return;
    }
    router.push(`/cal/${calName.toLowerCase()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Card title="ENTER CALENDAR">
      <div className={styles.inputContainer}>
        <Input
          label="NAME"
          value={calName}
          onChange={(e) => setCalName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter calendar name"
          error={error}
        />
        <ActionButton onClick={handleSubmit}>
          CONTINUE →
        </ActionButton>
      </div>
    </Card>
  );
}
