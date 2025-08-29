import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Filter } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { PersonCard } from '@/components/PersonCard';
import { DotLegend } from '@/components/DotLegend';
import { usePeople } from '@/hooks/usePeople';
import { Person } from '@/types/Person';

export default function PeopleTab() {
  const { people, addPerson, updatePerson } = usePeople();
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterDot, setFilterDot] = useState<string | null>(null);

  const filteredPeople = filterDot 
    ? people.filter(person => person.dotColor === filterDot)
    : people;

  const dotCounts = {
    yellow: people.filter(p => p.dotColor === 'yellow').length,
    green: people.filter(p => p.dotColor === 'green').length,
    lightBlue: people.filter(p => p.dotColor === 'lightBlue').length,
    darkBlue: people.filter(p => p.dotColor === 'darkBlue').length,
    purple: people.filter(p => p.dotColor === 'purple').length,
    gray: people.filter(p => p.dotColor === 'gray').length,
    red: people.filter(p => p.dotColor === 'red').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>People</Text>
          <View style={styles.headerActions}>
            <Pressable 
              style={styles.headerButton}
              onPress={() => setSearchVisible(!searchVisible)}
            >
              <Search size={20} color="#64748b" />
            </Pressable>
            <Pressable style={styles.headerButton}>
              <Filter size={20} color="#64748b" />
            </Pressable>
            <Pressable style={styles.addButton}>
              <Plus size={20} color="#ffffff" />
            </Pressable>
          </View>
        </View>

        {/* Dot Legend */}
        <DotLegend 
          counts={dotCounts} 
          selectedDot={filterDot}
          onDotSelect={setFilterDot}
        />
      </View>

      {/* People List */}
      <FlatList
        data={filteredPeople}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PersonCard 
            person={item} 
            onUpdate={(updated) => updatePerson(item.id, updated)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No people yet</Text>
            <Text style={styles.emptySubtext}>
              Import contacts or add people manually to start tracking relationships
            </Text>
          </View>
        }
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 20,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
});