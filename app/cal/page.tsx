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
  const [leaderCode, setLeaderCode] = React.useState('');
  const [showLeaderInput, setShowLeaderInput] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleView = () => {
    if (!calName.trim()) {
      setError('Please enter a group name');
      return;
    }
    router.push(`/cal/${calName.toLowerCase()}`);
  };

  const handleManage = () => {
    if (!calName.trim()) {
      setError('Please enter a group name');
      return;
    }
    setShowLeaderInput(true);
  };

  const handleLeaderSubmit = () => {
    if (!leaderCode.trim()) {
      setError('Please enter the leader code');
      return;
    }
    router.push(`/cal/${calName.toLowerCase()}/manage?code=${leaderCode}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (showLeaderInput) {
        handleLeaderSubmit();
      } else {
        handleView();
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Card title="SACRED GROUP">
        <div className={styles.inputContainer}>
          <Input
            label="SACRED"
            value={calName}
            onChange={(e) => setCalName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="GROUP NAME"
            error={error}
          />
          {showLeaderInput ? (
            <>
              <Input
                label="SACRED LEADER"
                value={leaderCode}
                onChange={(e) => setLeaderCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="LEADER CODE"
                type="password"
                error={error}
              />
              <div className={styles.buttonContainer}>
                <ActionButton onClick={handleLeaderSubmit}>
                  CONTINUE →
                </ActionButton>
                <ActionButton onClick={() => setShowLeaderInput(false)}>
                  BACK
                </ActionButton>
              </div>
            </>
          ) : (
            <div className={styles.buttonContainer}>
              <ActionButton onClick={handleView}>
                VIEW GROUP →
              </ActionButton>
              <ActionButton onClick={handleManage}>
                MANAGE GROUP →
              </ActionButton>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
