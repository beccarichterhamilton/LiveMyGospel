import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';

interface EventType {
  label: string;
  color: string;
}

interface EventTypeSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (eventType: EventType) => void;
}

const eventTypes: EventType[] = [
  { label: 'Contact', color: '#22c55e' },
  { label: 'Teaching', color: '#f59e0b' },
  { label: 'Finding', color: '#a855f7' },
  { label: 'Meeting', color: '#ef4444' },
  { label: 'Study or Plan', color: '#8b5cf6' },
  { label: 'Service', color: '#1e40af' },
  { label: 'Baptism', color: '#06b6d4' },
  { label: 'Travel', color: '#991b1b' },
  { label: 'Meal', color: '#92400e' },
  { label: 'Other', color: '#6b7280' },
  { label: 'Task', color: '#a16207' },
];

export function EventTypeSelector({ visible, onClose, onSelect }: EventTypeSelectorProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Event Type</Text>
          
          <View style={styles.eventTypes}>
            {eventTypes.map((eventType) => (
              <Pressable
                key={eventType.label}
                style={styles.eventTypeItem}
                onPress={() => {
                  onSelect(eventType);
                  onClose();
                }}
              >
                <View style={[styles.colorDot, { backgroundColor: eventType.color }]} />
                <Text style={styles.eventTypeLabel}>{eventType.label}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventTypes: {
    gap: 16,
    marginBottom: 24,
  },
  eventTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  eventTypeLabel: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
});