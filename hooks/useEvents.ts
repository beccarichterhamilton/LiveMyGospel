import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '@/types/Event';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  const loadEvents = async () => {
    try {
      const stored = await AsyncStorage.getItem('events');
      if (stored) {
        const parsedEvents = JSON.parse(stored).map((event: any) => ({
          ...event,
          date: new Date(event.date),
        }));
        setEvents(parsedEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const saveEvents = async (newEvents: Event[]) => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    const newEvents = [...events, newEvent];
    setEvents(newEvents);
    saveEvents(newEvents);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    const newEvents = events.map(event =>
      event.id === id ? { ...event, ...updates } : event
    );
    setEvents(newEvents);
    saveEvents(newEvents);
  };

  const deleteEvent = (id: string) => {
    const newEvents = events.filter(event => event.id !== id);
    setEvents(newEvents);
    saveEvents(newEvents);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}