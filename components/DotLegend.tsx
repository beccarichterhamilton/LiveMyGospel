import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

interface DotCounts {
  yellow: number;
  green: number;
  lightBlue: number;
  darkBlue: number;
  purple: number;
  gray: number;
  red: number;
}

interface DotLegendProps {
  counts: DotCounts;
  selectedDot: string | null;
  onDotSelect: (color: string | null) => void;
}

const dotInfo = {
  yellow: { label: 'New Contact', color: '#eab308' },
  green: { label: 'Dating', color: '#22c55e' },
  lightBlue: { label: 'Engaged', color: '#06b6d4' },
  darkBlue: { label: 'Married', color: '#2563eb' },
  purple: { label: 'Friend', color: '#a855f7' },
  gray: { label: 'Inactive', color: '#6b7280' },
  red: { label: 'Avoid', color: '#ef4444' },
};

export function DotLegend({ counts, selectedDot, onDotSelect }: DotLegendProps) {
  return (
    <ScrollView 
      horizontal 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    >
      <Pressable
        style={[
          styles.legendItem,
          !selectedDot && styles.selectedItem
        ]}
        onPress={() => onDotSelect(null)}
      >
        <Text style={[
          styles.legendLabel,
          !selectedDot && styles.selectedLabel
        ]}>
          All ({Object.values(counts).reduce((a, b) => a + b, 0)})
        </Text>
      </Pressable>
      
      {Object.entries(dotInfo).map(([key, info]) => (
        <Pressable
          key={key}
          style={[
            styles.legendItem,
            selectedDot === key && styles.selectedItem
          ]}
          onPress={() => onDotSelect(selectedDot === key ? null : key)}
        >
          <View style={[styles.dot, { backgroundColor: info.color }]} />
          <Text style={[
            styles.legendLabel,
            selectedDot === key && styles.selectedLabel
          ]}>
            {info.label} ({counts[key as keyof DotCounts]})
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  content: {
    paddingHorizontal: 4,
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    gap: 6,
  },
  selectedItem: {
    backgroundColor: '#eff6ff',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedLabel: {
    color: '#2563eb',
    fontWeight: '600',
  },
});