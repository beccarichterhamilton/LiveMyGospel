import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, PanGestureHandler, Animated } from 'react-native';
import { Event } from '@/types/Event';

interface DayViewCalendarProps {
  date: Date;
  events: Event[];
  onEventPress: (event: Event) => void;
  onTimeSlotPress: (hour: number) => void;
  onEventUpdate: (eventId: string, updates: Partial<Event>) => void;
}

const HOUR_HEIGHT = 60;
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function DayViewCalendar({ date, events, onEventPress, onTimeSlotPress, onEventUpdate }: DayViewCalendarProps) {
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);
  
  const dayEvents = events.filter(event => 
    new Date(event.date).toDateString() === date.toDateString()
  );

  const getEventPosition = (event: Event) => {
    const startTime = event.startTime || '9:00 AM';
    const endTime = event.endTime || '10:00 AM';
    
    const startHour = parseTimeToHour(startTime);
    const endHour = parseTimeToHour(endTime);
    
    return {
      top: startHour * HOUR_HEIGHT,
      height: (endHour - startHour) * HOUR_HEIGHT,
    };
  };

  const parseTimeToHour = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour = hours;
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    return hour + (minutes || 0) / 60;
  };

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.timeGrid}>
          {HOURS.map((hour) => (
            <Pressable
              key={hour}
              style={styles.hourSlot}
              onPress={() => onTimeSlotPress(hour)}
            >
              <View style={styles.timeLabel}>
                <Text style={styles.timeText}>{formatHour(hour)}</Text>
              </View>
              <View style={styles.hourLine} />
            </Pressable>
          ))}
          
          {/* Events */}
          <View style={styles.eventsContainer}>
            {dayEvents.map((event) => {
              const position = getEventPosition(event);
              return (
                <Pressable
                  key={event.id}
                  style={[
                    styles.eventBlock,
                    {
                      top: position.top,
                      height: Math.max(position.height, 30),
                      backgroundColor: event.color,
                    }
                  ]}
                  onPress={() => onEventPress(event)}
                >
                  <View style={styles.resizeHandle} />
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle} numberOfLines={1}>
                      {event.title}
                    </Text>
                    <Text style={styles.eventTime}>
                      {event.startTime} - {event.endTime}
                    </Text>
                  </View>
                  <View style={styles.resizeHandle} />
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  timeGrid: {
    position: 'relative',
    paddingLeft: 60,
  },
  hourSlot: {
    height: HOUR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timeLabel: {
    position: 'absolute',
    left: -60,
    width: 50,
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  hourLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
    marginTop: 8,
  },
  eventsContainer: {
    position: 'absolute',
    left: 60,
    right: 0,
    top: 0,
    bottom: 0,
  },
  eventBlock: {
    position: 'absolute',
    left: 8,
    right: 8,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resizeHandle: {
    position: 'absolute',
    left: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  eventContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});