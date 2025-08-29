import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';
import { Indicator } from '@/types/Indicator';

interface WeeklyIndicatorProps {
  indicator: Indicator;
  onUpdate: (current: number) => void;
}

export function WeeklyIndicator({ indicator, onUpdate }: WeeklyIndicatorProps) {
  const percentage = indicator.goal > 0 ? (indicator.current / indicator.goal) * 100 : 0;
  const isComplete = indicator.current >= indicator.goal;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{indicator.name}</Text>
        <View style={styles.counter}>
          <Pressable
            style={[styles.counterButton, { opacity: indicator.current <= 0 ? 0.3 : 1 }]}
            onPress={() => onUpdate(Math.max(0, indicator.current - 1))}
            disabled={indicator.current <= 0}
          >
            <Minus size={16} color="#64748b" />
          </Pressable>
          
          <View style={styles.counts}>
            <Text style={[styles.countText, isComplete && styles.completeText]}>
              {indicator.current}
            </Text>
            <Text style={styles.separator}>/</Text>
            <Text style={styles.goalText}>{indicator.goal}</Text>
          </View>
          
          <Pressable
            style={styles.counterButton}
            onPress={() => onUpdate(indicator.current + 1)}
          >
            <Plus size={16} color="#64748b" />
          </Pressable>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: isComplete ? '#10b981' : '#3b82f6'
              }
            ]} 
          />
        </View>
        <Text style={[styles.percentageText, isComplete && styles.completePercentage]}>
          {Math.round(percentage)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counts: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 50,
    justifyContent: 'center',
  },
  countText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
  },
  completeText: {
    color: '#10b981',
  },
  separator: {
    fontSize: 16,
    color: '#94a3b8',
    marginHorizontal: 2,
  },
  goalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    minWidth: 35,
    textAlign: 'right',
  },
  completePercentage: {
    color: '#10b981',
  },
});