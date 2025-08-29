import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Bell, Palette, Target, Info } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function SettingsTab() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const settingSections = [
    {
      title: 'Customization',
      items: [
        { 
          label: 'Weekly Indicators', 
          icon: Target, 
          action: () => {},
          subtitle: 'Customize goals and tracking'
        },
        { 
          label: 'Event Colors', 
          icon: Palette, 
          action: () => {},
          subtitle: 'Change calendar event colors'
        },
        { 
          label: 'Dot System', 
          icon: Target, 
          action: () => {},
          subtitle: 'Customize relationship tracking'
        },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { 
          label: 'Goal Reminders', 
          icon: Bell, 
          toggle: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
          subtitle: 'Weekly indicator reminders'
        },
      ]
    },
    {
      title: 'About',
      items: [
        { 
          label: 'Version', 
          icon: Info, 
          action: () => {},
          value: '1.0.0'
        },
      ]
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>

      {/* Settings Sections */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {settingSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                
                return (
                  <Pressable
                    key={item.label}
                    style={[
                      styles.settingItem,
                      itemIndex === section.items.length - 1 && styles.lastItem
                    ]}
                    onPress={item.action}
                  >
                    <View style={styles.settingLeft}>
                      <View style={styles.iconContainer}>
                        <Icon size={20} color="#64748b" />
                      </View>
                      <View style={styles.settingText}>
                        <Text style={styles.settingLabel}>{item.label}</Text>
                        {item.subtitle && (
                          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                        )}
                      </View>
                    </View>
                    
                    <View style={styles.settingRight}>
                      {item.toggle ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                          thumbColor={item.value ? '#ffffff' : '#f1f5f9'}
                        />
                      ) : item.value ? (
                        <Text style={styles.settingValue}>{item.value}</Text>
                      ) : (
                        <ChevronRight size={20} color="#94a3b8" />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for returned missionaries
          </Text>
          <Text style={styles.footerSubtext}>
            Helping you live your gospel daily
          </Text>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 16,
  },
  settingValue: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#94a3b8',
  },
});