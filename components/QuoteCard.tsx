import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Quote } from 'lucide-react-native';

interface Quote {
  text: string;
  author: string;
  reference: string;
}

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Quote size={20} color="#3b82f6" />
        <Text style={styles.headerText}>Daily Inspiration</Text>
      </View>
      
      <Text style={styles.quoteText}>"{quote.text}"</Text>
      
      <View style={styles.attribution}>
        <Text style={styles.author}>— {quote.author}</Text>
        <Text style={styles.reference}>{quote.reference}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1e293b',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  attribution: {
    alignItems: 'flex-end',
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 2,
  },
  reference: {
    fontSize: 12,
    color: '#94a3b8',
  },
});