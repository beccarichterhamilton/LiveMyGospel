import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MessageCircle, Calendar } from 'lucide-react-native';
import { Person } from '@/types/Person';

interface PersonCardProps {
  person: Person;
  onUpdate: (person: Partial<Person>) => void;
  onPress?: () => void;
}

const dotColors = {
  yellow: '#eab308',
  green: '#22c55e',
  lightBlue: '#06b6d4',
  darkBlue: '#2563eb',
  purple: '#a855f7',
  gray: '#6b7280',
  red: '#ef4444',
};

export function PersonCard({ person, onUpdate, onPress }: PersonCardProps) {
  const dotColor = dotColors[person.dotColor as keyof typeof dotColors];
  const lastContact = person.lastContact ? new Date(person.lastContact) : null;
  const daysSinceContact = lastContact 
    ? Math.floor((Date.now() - lastContact.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
          <View style={styles.info}>
            <Text style={styles.name}>{person.name}</Text>
            {person.phone && (
              <Text style={styles.contact}>{person.phone}</Text>
            )}
            {lastContact && (
              <Text style={styles.lastContact}>
                {daysSinceContact === 0 ? 'Today' : 
                 daysSinceContact === 1 ? 'Yesterday' : 
                 `${daysSinceContact} days ago`}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.actionButton}>
            <MessageCircle size={20} color="#64748b" />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Calendar size={20} color="#64748b" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  contact: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  lastContact: {
    fontSize: 12,
    color: '#94a3b8',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});