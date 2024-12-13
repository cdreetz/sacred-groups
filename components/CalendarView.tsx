'use client';

import '@root/global.scss';
import styles from './CalendarView.module.scss';
import * as React from 'react';
import Card from '@components/Card';
import DatePicker from '@components/DatePicker';
import { useState } from 'react';

// Example demo data - in real app this would come from a database/API
const DEMO_CALENDAR = {
  id: 'demo',
  name: 'Demo Calendar',
  events: [
    {
      id: '1',
      date: '2024-01-15',
      title: 'Dev Dinner',
      description: 'Dinner with the team',
      type: 'meeting' as const
    },
    {
      id: '2',
      date: '2024-01-20',
      title: 'Hackathon',
      description: 'Hackathon by Vercel and NVIDIA',
      type: 'event' as const
    }
  ]
};

// Add type for events
type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  description?: string;
  type: 'meeting' | 'task';
};

export default function CalendarView() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId === selectedEventId ? null : eventId);
  };

  const selectedEvent = selectedEventId 
    ? DEMO_CALENDAR.events.find(event => event.id === selectedEventId)
    : null;

  return (
    <div className={styles.container}>
      <Card title={`CALENDAR: ${DEMO_CALENDAR.name.toUpperCase()}`}>
        <div className={styles.calendarLayout}>
          <DatePicker 
            year={2024} 
            month={1} 
            events={DEMO_CALENDAR.events.map(event => event.date)}
          />
          <div className={styles.events}>
            {DEMO_CALENDAR.events.map(event => (
              <div 
                key={event.id} 
                className={`${styles.event} ${selectedEventId === event.id ? styles.selected : ''}`}
                onClick={() => handleEventClick(event.id)}
                role="button"
                tabIndex={0}
              >
                <strong>{event.title}</strong>
                <div>{event.date}</div>
                {event.description && <div>{event.description}</div>}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {selectedEvent && (
        <Card title="Event Details">
          <div className={styles.eventDetails}>
            <h3>{selectedEvent.title}</h3>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Type:</strong> {selectedEvent.type}</p>
            {selectedEvent.description && (
              <p><strong>Description:</strong> {selectedEvent.description}</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 