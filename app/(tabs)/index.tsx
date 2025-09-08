import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Quote } from 'lucide-react-native';
import { WeeklyIndicator } from '@/components/WeeklyIndicator';
import { QuoteCard } from '@/components/QuoteCard';
import { useIndicators } from '@/hooks/useIndicators';
import { usePeople } from '@/hooks/usePeople';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeTab() {
  const { indicators, updateIndicator } = useIndicators();
  const { people } = usePeople();
  const [dailyQuote, setDailyQuote] = useState({
    text: "Be faithful in small things because it is in them that your strength lies.",
    author: "Mother Teresa",
    reference: "Conference Talk, October 2023"
  });

  // Get progressing people (those with recent contact)
  const progressingPeople = people.filter(person => {
    if (!person.lastContact) return false;
    const daysSince = Math.floor((Date.now() - person.lastContact.getTime()) / (1000 * 60 * 60 * 24));
    return daysSince <= 7; // Contacted within last week
  }).slice(0, 3);
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

        {/* Progressing People */}
        {progressingPeople.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Progressing People</Text>
              <Pressable>
                <Text style={styles.viewAllText}>View all</Text>
              </Pressable>
            </View>
            
            <View style={styles.progressingPeople}>
              {progressingPeople.map((person) => (
                <View key={person.id} style={styles.progressingPersonCard}>
                  <View style={styles.personHeader}>
                    <Text style={styles.personName}>{person.name}</Text>
                    <View style={styles.personBadge}>
                      <Text style={styles.personBadgeText}>★</Text>
                    </View>
                  </View>
                  <Text style={styles.personDetails}>
                    Baptism: Oct 5, 2025
                  </Text>
                  <Text style={styles.personLastTaught}>
                    Last Taught 4 days ago
                  </Text>
                  <Text style={styles.personNextEvent}>
                    Next Event: Tomorrow, 6:40 PM
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Action Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Action Items</Text>
          <View style={styles.actionItems}>
            <View style={styles.actionRow}>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>👥</Text>
                </View>
                <Text style={styles.actionLabel}>Referrals</Text>
              </Pressable>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>📋</Text>
                </View>
                <Text style={styles.actionLabel}>Tasks</Text>
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>17</Text>
                </View>
              </Pressable>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>📝</Text>
                </View>
                <Text style={styles.actionLabel}>Unreported</Text>
              </Pressable>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>📄</Text>
                </View>
                <Text style={styles.actionLabel}>Quick Notes</Text>
              </Pressable>
            </View>
            <View style={styles.actionRow}>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>👤</Text>
                </View>
                <Text style={styles.actionLabel}>Follow Up</Text>
              </Pressable>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>💝</Text>
                </View>
                <Text style={styles.actionLabel}>Nurture</Text>
              </Pressable>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>💡</Text>
                </View>
                <Text style={styles.actionLabel}>Tips</Text>
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>17</Text>
                </View>
              </Pressable>
            </Pressable>
          </View>
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <View style={styles.actionItems}>
            <View style={styles.actionRow}>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>📖</Text>
                </View>
                <Text style={styles.actionLabel}>Area Notes</Text>
              </Pressable>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>🏛️</Text>
                </View>
                <Text style={styles.actionLabel}>Units</Text>
              </Pressable>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>📱</Text>
                </View>
                <Text style={styles.actionLabel}>Send Inspiration</Text>
              </Pressable>
              <Pressable style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>👥</Text>
                </View>
                <Text style={styles.actionLabel}>Missionaries</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Weekly Planning */}
        <View style={styles.section}>
          <Pressable style={styles.weeklyPlanningButton}>
            <Text style={styles.weeklyPlanningText}>Weekly Planning</Text>
          </Pressable>
        </View>

        {/* Groups */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Groups</Text>
            <Pressable>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          </View>
          
          <View style={styles.groupsList}>
            <Text style={styles.groupItem}>≡ Aprendiendo inglés</Text>
            <Text style={styles.groupItem}>≡ Contacto diario</Text>
            <Text style={styles.groupItem}>≡ Familias en las que no todos son miembros</Text>
            <Text style={styles.groupItem}>≡ Futuros elderes</Text>
            <Text style={styles.groupItem}>≡ Invitados a la Iglesia</Text>
            <Text style={styles.groupItem}>≡ Miembros a través de los cuales encontrar personas</Text>
            <Text style={styles.groupItem}>≡ Miembros con quienes trabajar</Text>
            <Text style={styles.groupItem}>≡ Miembros que hablan nuestro idioma asignado</Text>
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
  progressingPeople: {
    gap: 12,
  },
  progressingPersonCard: {
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
  personHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  personBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  personDetails: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  personLastTaught: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  personNextEvent: {
    fontSize: 14,
    color: '#64748b',
  },
  actionItems: {
    gap: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIconText: {
    fontSize: 20,
  },
  actionLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
  actionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  actionBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  weeklyPlanningButton: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  weeklyPlanningText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  addText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  groupsList: {
    gap: 12,
  },
  groupItem: {
    fontSize: 16,
    color: '#1e293b',
    paddingVertical: 8,
  },
});