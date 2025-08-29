import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Event } from '@/types/Event';

const { width } = Dimensions.get('window');
const dayWidth = (width - 40) / 7;

interface CalendarViewProps {
  currentDate: Date;
  viewMode: 'day' | 'week' | 'month';
  events: Event[];
  onDateSelect: (date: Date) => void;
}

export function CalendarView({ currentDate, viewMode, events, onDateSelect }: CalendarViewProps) {
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    return (
      <View style={styles.weekContainer}>
        {/* Day Headers */}
        <View style={styles.dayHeaders}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <View key={day} style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Week Grid */}
        <View style={styles.weekGrid}>
          {days.map((date, index) => {
            const dateEvents = events.filter(event => 
              new Date(event.date).toDateString() === date.toDateString()
            );
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <Pressable
                key={index}
                style={[styles.dayCell, isToday && styles.todayCell]}
                onPress={() => onDateSelect(date)}
              >
                <Text style={[styles.dayNumber, isToday && styles.todayNumber]}>
                  {date.getDate()}
                </Text>
                <View style={styles.eventDots}>
                  {dateEvents.slice(0, 3).map((event, eventIndex) => (
                    <View
                      key={eventIndex}
                      style={[styles.eventDot, { backgroundColor: event.color }]}
                    />
                  ))}
                  {dateEvents.length > 3 && (
                    <Text style={styles.moreEvents}>+{dateEvents.length - 3}</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Day View</Text>
        </View>
      )}
      {viewMode === 'month' && (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Month View</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  weekContainer: {
    padding: 20,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dayHeader: {
    width: dayWidth,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  weekGrid: {
    flexDirection: 'row',
  },
  dayCell: {
    width: dayWidth,
    height: 120,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginRight: 4,
  },
  todayCell: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  todayNumber: {
    color: '#3b82f6',
  },
  eventDots: {
    flex: 1,
    gap: 2,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  moreEvents: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: '500',
  },
});