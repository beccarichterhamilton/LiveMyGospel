import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TextInput, ScrollView } from 'react-native';
import { X, Check } from 'lucide-react-native';
import { Event } from '@/types/Event';

interface EventModalProps {
  visible: boolean;
  selectedDate: Date;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => void;
}

const eventTypes = [
  { label: 'Study', color: '#8b5cf6' },
  { label: 'Class', color: '#3b82f6' },
  { label: 'Work', color: '#ef4444' },
  { label: 'Travel', color: '#dc2626' },
  { label: 'Date', color: '#eab308' },
  { label: 'Contact', color: '#22c55e' },
  { label: 'Meeting', color: '#ec4899' },
  { label: 'Meal', color: '#92400e' },
];

export function EventModal({ visible, selectedDate, onClose, onSave }: EventModalProps) {
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState(eventTypes[0]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;

    const event: Omit<Event, 'id'> = {
      title: title.trim(),
      date: selectedDate,
      startTime,
      endTime,
      type: selectedType.label,
      color: selectedType.color,
      notes: notes.trim(),
      preNotes: '',
      postNotes: '',
    };

    onSave(event);
    
    // Reset form
    setTitle('');
    setStartTime('');
    setEndTime('');
    setNotes('');
    setSelectedType(eventTypes[0]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#64748b" />
          </Pressable>
          <Text style={styles.headerTitle}>New Event</Text>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Check size={24} color="#ffffff" />
          </Pressable>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Date Display */}
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>

          {/* Event Title */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Event Title</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter event title"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Event Type */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Type</Text>
            <ScrollView 
              horizontal 
              style={styles.typeScroll}
              showsHorizontalScrollIndicator={false}
            >
              {eventTypes.map((type) => (
                <Pressable
                  key={type.label}
                  style={[
                    styles.typeOption,
                    selectedType.label === type.label && styles.selectedType,
                    { borderColor: type.color }
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <View style={[styles.typeDot, { backgroundColor: type.color }]} />
                  <Text style={[
                    styles.typeText,
                    selectedType.label === type.label && styles.selectedTypeText
                  ]}>
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Time */}
          <View style={styles.timeSection}>
            <View style={styles.timeInput}>
              <Text style={styles.inputLabel}>Start Time</Text>
              <TextInput
                style={styles.textInput}
                value={startTime}
                onChangeText={setStartTime}
                placeholder="9:00 AM"
                placeholderTextColor="#94a3b8"
              />
            </View>
            <View style={styles.timeInput}>
              <Text style={styles.inputLabel}>End Time</Text>
              <TextInput
                style={styles.textInput}
                value={endTime}
                onChangeText={setEndTime}
                placeholder="10:00 AM"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          {/* Notes */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.textInput, styles.notesInput]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any notes or details..."
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={3}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dateSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  typeScroll: {
    marginTop: 8,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#ffffff',
    marginRight: 12,
    gap: 6,
  },
  selectedType: {
    backgroundColor: '#eff6ff',
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedTypeText: {
    color: '#1e293b',
    fontWeight: '600',
  },
  timeSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  timeInput: {
    flex: 1,
  },
});