import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommunityContent } from '@/types/CommunityContent';

const sampleContent: CommunityContent[] = [
  {
    id: '1',
    category: 'dates',
    text: 'Go mini golfing! It\'s casual, fun, and gives you plenty of time to talk. Plus, you can laugh at each other\'s terrible shots.',
    upvotes: 23,
    downvotes: 2,
    userVote: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    comments: 5,
  },
  {
    id: '2',
    category: 'memes',
    text: 'When someone asks if you miss your mission and you start crying happy tears while explaining how much you loved the structure...',
    upvotes: 45,
    downvotes: 1,
    userVote: 'up',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    comments: 12,
  },
  {
    id: '3',
    category: 'spiritual',
    text: '"The most important thing in our lives is what we do for others" - President Nelson. Small acts of service can change everything.',
    upvotes: 67,
    downvotes: 0,
    userVote: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    comments: 8,
  },
  {
    id: '4',
    category: 'dates',
    text: 'Try a cooking class together! It\'s interactive, you learn something new, and you get to eat the results. Win-win-win.',
    upvotes: 31,
    downvotes: 4,
    userVote: null,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    comments: 7,
  },
];

export function useCommunityContent() {
  const [content, setContent] = useState<CommunityContent[]>(sampleContent);

  const loadContent = async () => {
    try {
      const stored = await AsyncStorage.getItem('communityContent');
      if (stored) {
        const parsedContent = JSON.parse(stored).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
        setContent(parsedContent);
      }
    } catch (error) {
      console.error('Error loading community content:', error);
    }
  };

  const saveContent = async (newContent: CommunityContent[]) => {
    try {
      await AsyncStorage.setItem('communityContent', JSON.stringify(newContent));
    } catch (error) {
      console.error('Error saving community content:', error);
    }
  };

  const addContent = (contentData: Omit<CommunityContent, 'id' | 'upvotes' | 'downvotes' | 'userVote' | 'createdAt'>) => {
    const newContent: CommunityContent = {
      ...contentData,
      id: Date.now().toString(),
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      createdAt: new Date(),
      comments: 0,
    };
    const updatedContent = [newContent, ...content];
    setContent(updatedContent);
    saveContent(updatedContent);
  };

  const voteContent = (id: string, voteType: 'up' | 'down') => {
    const updatedContent = content.map(item => {
      if (item.id === id) {
        const newItem = { ...item };
        
        // Remove previous vote if exists
        if (item.userVote === 'up') {
          newItem.upvotes--;
        } else if (item.userVote === 'down') {
          newItem.downvotes--;
        }
        
        // Add new vote if different from current
        if (item.userVote !== voteType) {
          if (voteType === 'up') {
            newItem.upvotes++;
            newItem.userVote = 'up';
          } else {
            newItem.downvotes++;
            newItem.userVote = 'down';
          }
        } else {
          newItem.userVote = null;
        }
        
        return newItem;
      }
      return item;
    });
    
    setContent(updatedContent);
    saveContent(updatedContent);
  };

  useEffect(() => {
    // loadContent(); // Commented out to use sample data for demo
  }, []);

  return {
    content,
    addContent,
    voteContent,
  };
}