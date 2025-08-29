import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Quote } from 'lucide-react-native';
import { WeeklyIndicator } from '@/components/WeeklyIndicator';
import { QuoteCard } from '@/components/QuoteCard';
import { useIndicators } from '@/hooks/useIndicators';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeTab() {
  const { indicators, updateIndicator } = useIndicators();
  const [dailyQuote, setDailyQuote] = useState({
    text: "Be faithful in small things because it is in them that your strength lies.",
    author: "Mother Teresa",
    reference: "Conference Talk, October 2023"
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Live My Gospel</Text>
          <Text style={styles.subtitle}>Week of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Text>
        </View>

        {/* Daily Quote */}
        <QuoteCard quote={dailyQuote} />

        {/* Weekly Indicators */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Key Indicators</Text>
            <Pressable style={styles.addButton}>
              <Plus size={20} color="#2563eb" />
            </Pressable>
          </View>
          
          <View style={styles.indicatorsGrid}>
            {indicators.map((indicator, index) => (
              <WeeklyIndicator
                key={indicator.id}
                indicator={indicator}
                onUpdate={(current) => updateIndicator(indicator.id, current)}
              />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Pressable style={styles.actionCard}>
              <Text style={styles.actionText}>Add Event</Text>
            </Pressable>
            <Pressable style={styles.actionCard}>
              <Text style={styles.actionText}>Log Contact</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorsGrid: {
    gap: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});