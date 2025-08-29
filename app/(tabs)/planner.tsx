import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { CalendarView } from '@/components/CalendarView';
import { EventModal } from '@/components/EventModal';
import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/types/Event';

export default function PlannerTab() {
  const { events, addEvent } = useEvents();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleAddEvent = (event: Omit<Event, 'id'>) => {
    addEvent(event);
    setShowEventModal(false);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navigation}>
          <Pressable 
            style={styles.navButton}
            onPress={() => navigateDate('prev')}
          >
            <ChevronLeft size={24} color="#64748b" />
          </Pressable>
          
          <Text style={styles.headerTitle}>
            {currentDate.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </Text>
          
          <Pressable 
            style={styles.navButton}
            onPress={() => navigateDate('next')}
          >
            <ChevronRight size={24} color="#64748b" />
          </Pressable>
        </View>

        {/* View Mode Toggle */}
        <View style={styles.viewToggle}>
          {(['day', 'week', 'month'] as const).map((mode) => (
            <Pressable
              key={mode}
              style={[
                styles.viewButton,
                viewMode === mode && styles.viewButtonActive
              ]}
              onPress={() => setViewMode(mode)}
            >
              <Text style={[
                styles.viewButtonText,
                viewMode === mode && styles.viewButtonTextActive
              ]}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Calendar */}
      <CalendarView
        currentDate={currentDate}
        viewMode={viewMode}
        events={events}
        onDateSelect={handleDateSelect}
      />

      {/* Add Event Button */}
      <Pressable
        style={styles.fab}
        onPress={() => setShowEventModal(true)}
      >
        <Plus size={24} color="#ffffff" />
      </Pressable>

      {/* Event Modal */}
      <EventModal
        visible={showEventModal}
        selectedDate={selectedDate}
        onClose={() => setShowEventModal(false)}
        onSave={handleAddEvent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  viewButtonTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
});