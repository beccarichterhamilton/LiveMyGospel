import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Event } from '@/types/Event';

const { width } = Dimensions.get('window');
const dayWidth = (width - 40) / 7;

interface MonthViewCalendarProps {
  currentDate: Date;
  events: Event[];
  onDateSelect: (date: Date) => void;
}

export function MonthViewCalendar({ currentDate, events, onDateSelect }: MonthViewCalendarProps) {
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      new Date(event.date).toDateString() === date.toDateString()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const days = getDaysInMonth();

  return (
    <View style={styles.container}>
      {/* Day Headers */}
      <View style={styles.dayHeaders}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <View key={day} style={styles.dayHeader}>
            <Text style={styles.dayHeaderText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {Array.from({ length: 6 }).map((_, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => {
              const dateEvents = getEventsForDate(date);
              const today = isToday(date);
              const currentMonth = isCurrentMonth(date);

              return (
                <Pressable
                  key={dayIndex}
                  style={[
                    styles.dayCell,
                    today && styles.todayCell,
                    !currentMonth && styles.otherMonthCell
                  ]}
                  onPress={() => onDateSelect(date)}
                >
                  <Text style={[
                    styles.dayNumber,
                    today && styles.todayNumber,
                    !currentMonth && styles.otherMonthNumber
                  ]}>
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
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
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
  calendarGrid: {
    gap: 4,
  },
  weekRow: {
    flexDirection: 'row',
    gap: 4,
  },
  dayCell: {
    width: dayWidth - 4,
    height: 80,
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  todayCell: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  otherMonthCell: {
    opacity: 0.3,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  todayNumber: {
    color: '#3b82f6',
  },
  otherMonthNumber: {
    color: '#94a3b8',
  },
  eventDots: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moreEvents: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },
});