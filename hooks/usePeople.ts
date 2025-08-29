import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Person } from '@/types/Person';

const samplePeople: Person[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '(555) 123-4567',
    dotColor: 'green',
    lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    dateCount: 2,
    notes: [],
  },
  {
    id: '2',
    name: 'Mike Chen',
    phone: '(555) 234-5678',
    dotColor: 'yellow',
    lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    dateCount: 0,
    notes: [],
  },
  {
    id: '3',
    name: 'Emma Wilson',
    phone: '(555) 345-6789',
    dotColor: 'lightBlue',
    lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    dateCount: 3,
    notes: [],
  },
];

export function usePeople() {
  const [people, setPeople] = useState<Person[]>(samplePeople);

  const loadPeople = async () => {
    try {
      const stored = await AsyncStorage.getItem('people');
      if (stored) {
        const parsedPeople = JSON.parse(stored).map((person: any) => ({
          ...person,
          lastContact: person.lastContact ? new Date(person.lastContact) : null,
        }));
        setPeople(parsedPeople);
      }
    } catch (error) {
      console.error('Error loading people:', error);
    }
  };

  const savePeople = async (newPeople: Person[]) => {
    try {
      await AsyncStorage.setItem('people', JSON.stringify(newPeople));
    } catch (error) {
      console.error('Error saving people:', error);
    }
  };

  const addPerson = (personData: Omit<Person, 'id'>) => {
    const newPerson: Person = {
      ...personData,
      id: Date.now().toString(),
    };
    const newPeople = [...people, newPerson];
    setPeople(newPeople);
    savePeople(newPeople);
  };

  const updatePerson = (id: string, updates: Partial<Person>) => {
    const newPeople = people.map(person =>
      person.id === id ? { ...person, ...updates } : person
    );
    setPeople(newPeople);
    savePeople(newPeople);
  };

  const deletePerson = (id: string) => {
    const newPeople = people.filter(person => person.id !== id);
    setPeople(newPeople);
    savePeople(newPeople);
  };

  useEffect(() => {
    // loadPeople(); // Commented out to use sample data for demo
  }, []);

  return {
    people,
    addPerson,
    updatePerson,
    deletePerson,
  };
}