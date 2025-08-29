import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronUp, ChevronDown, MessageSquare } from 'lucide-react-native';
import { CommunityContent } from '@/types/CommunityContent';

interface ContentCardProps {
  content: CommunityContent;
  onVote: (type: 'up' | 'down') => void;
}

export function ContentCard({ content, onVote }: ContentCardProps) {
  const upvotePercentage = content.upvotes + content.downvotes > 0 
    ? (content.upvotes / (content.upvotes + content.downvotes)) * 100 
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(content.category) }]}>
          <Text style={styles.categoryText}>{getCategoryLabel(content.category)}</Text>
        </View>
        <Text style={styles.timestamp}>{getTimeAgo(content.createdAt)}</Text>
      </View>

      <Text style={styles.contentText}>{content.text}</Text>

      <View style={styles.footer}>
        <View style={styles.voting}>
          <Pressable 
            style={[styles.voteButton, content.userVote === 'up' && styles.upvoteActive]}
            onPress={() => onVote('up')}
          >
            <ChevronUp 
              size={20} 
              color={content.userVote === 'up' ? '#22c55e' : '#64748b'} 
            />
            <Text style={[
              styles.voteCount,
              content.userVote === 'up' && styles.upvoteText
            ]}>
              {content.upvotes}
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.voteButton, content.userVote === 'down' && styles.downvoteActive]}
            onPress={() => onVote('down')}
          >
            <ChevronDown 
              size={20} 
              color={content.userVote === 'down' ? '#ef4444' : '#64748b'} 
            />
            <Text style={[
              styles.voteCount,
              content.userVote === 'down' && styles.downvoteText
            ]}>
              {content.downvotes}
            </Text>
          </Pressable>
        </View>

        <View style={styles.engagement}>
          <MessageSquare size={16} color="#94a3b8" />
          <Text style={styles.commentCount}>{content.comments || 0}</Text>
        </View>
      </View>
    </View>
  );
}

function getCategoryColor(category: string): string {
  const colors = {
    dates: '#ec4899',
    memes: '#f59e0b',
    spiritual: '#3b82f6',
    tips: '#10b981',
  };
  return colors[category as keyof typeof colors] || '#64748b';
}

function getCategoryLabel(category: string): string {
  const labels = {
    dates: 'Date Idea',
    memes: 'Meme',
    spiritual: 'Spiritual',
    tips: 'Life Tip',
  };
  return labels[category as keyof typeof labels] || category;
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  timestamp: {
    fontSize: 12,
    color: '#94a3b8',
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1e293b',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voting: {
    flexDirection: 'row',
    gap: 12,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  upvoteActive: {
    backgroundColor: '#f0fdf4',
  },
  downvoteActive: {
    backgroundColor: '#fef2f2',
  },
  voteCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  upvoteText: {
    color: '#22c55e',
  },
  downvoteText: {
    color: '#ef4444',
  },
  engagement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentCount: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
});