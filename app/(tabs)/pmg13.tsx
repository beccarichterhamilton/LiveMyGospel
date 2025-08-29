import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Lightbulb, Smile, BookOpen, Plus } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { ContentCard } from '@/components/ContentCard';
import { useCommunityContent } from '@/hooks/useCommunityContent';

const categories = [
  { id: 'dates', label: 'Date Ideas', icon: Heart, color: '#ec4899' },
  { id: 'memes', label: 'Memes', icon: Smile, color: '#f59e0b' },
  { id: 'spiritual', label: 'Spiritual', icon: BookOpen, color: '#3b82f6' },
  { id: 'tips', label: 'Life Tips', icon: Lightbulb, color: '#10b981' },
];

export default function PMG13Tab() {
  const { content, addContent, voteContent } = useCommunityContent();
  const [selectedCategory, setSelectedCategory] = useState('dates');

  const filteredContent = content.filter(item => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PMG 13</Text>
        <Text style={styles.subtitle}>Life After Mission</Text>
      </View>

      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Pressable
              key={category.id}
              style={[
                styles.categoryTab,
                isSelected && { backgroundColor: category.color }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Icon 
                size={20} 
                color={isSelected ? '#ffffff' : category.color} 
              />
              <Text style={[
                styles.categoryText,
                isSelected && { color: '#ffffff' }
              ]}>
                {category.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredContent.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            onVote={(type) => voteContent(item.id, type)}
          />
        ))}

        {filteredContent.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No content yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share something in this category!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Content Button */}
      <Pressable style={styles.fab}>
        <Plus size={24} color="#ffffff" />
      </Pressable>
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
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  categoryScroll: {
    backgroundColor: '#ffffff',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    gap: 16,
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
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ec4899',
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