import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Indicator } from '@/types/Indicator';

const defaultIndicators: Indicator[] = [
  { id: '1', name: 'Temple Attendance', current: 0, goal: 1 },
  { id: '2', name: 'Scripture Study', current: 0, goal: 7 },
  { id: '3', name: 'Church Attendance', current: 0, goal: 1 },
  { id: '4', name: 'Inviting Friends', current: 0, goal: 3 },
  { id: '5', name: 'Ministering', current: 0, goal: 2 },
  { id: '6', name: 'Dates', current: 0, goal: 1 },
];

export function useIndicators() {
  const [indicators, setIndicators] = useState<Indicator[]>(defaultIndicators);

  const loadIndicators = async () => {
    try {
      const stored = await AsyncStorage.getItem('indicators');
      if (stored) {
        setIndicators(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading indicators:', error);
    }
  };

  const saveIndicators = async (newIndicators: Indicator[]) => {
    try {
      await AsyncStorage.setItem('indicators', JSON.stringify(newIndicators));
    } catch (error) {
      console.error('Error saving indicators:', error);
    }
  };

  const updateIndicator = (id: string, current: number) => {
    const newIndicators = indicators.map(indicator =>
      indicator.id === id ? { ...indicator, current } : indicator
    );
    setIndicators(newIndicators);
    saveIndicators(newIndicators);
  };

  const addIndicator = (name: string, goal: number) => {
    const newIndicator: Indicator = {
      id: Date.now().toString(),
      name,
      current: 0,
      goal,
    };
    const newIndicators = [...indicators, newIndicator];
    setIndicators(newIndicators);
    saveIndicators(newIndicators);
  };

  useEffect(() => {
    loadIndicators();
  }, []);

  return {
    indicators,
    updateIndicator,
    addIndicator,
  };
}