import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { X, MessageCircle, Phone, MapPin, Edit } from 'lucide-react-native';
import { Person } from '@/types/Person';

interface PersonDetailModalProps {
  visible: boolean;
  person: Person | null;
  onClose: () => void;
}

export function PersonDetailModal({ visible, person, onClose }: PersonDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'progress' | 'timeline'>('profile');

  if (!person) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#64748b" />
          </Pressable>
          <Text style={styles.headerTitle}>{person.name}</Text>
          <Pressable style={styles.menuButton}>
            <Text style={styles.menuText}>⋮</Text>
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(['profile', 'progress', 'timeline'] as const).map((tab) => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Status Banners */}
        <View style={styles.statusBanners}>
          <View style={styles.shareNurturingBanner}>
            <Text style={styles.bannerText}>Share Nurturing Content</Text>
          </View>
          <View style={styles.stoppedTeachingBanner}>
            <Text style={styles.bannerText}>Stopped Teaching: Not Progressing</Text>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'profile' && (
            <>
              {/* Contact Information */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Contact Information</Text>
                  <Pressable>
                    <Text style={styles.editButton}>Edit</Text>
                  </Pressable>
                </View>

                <View style={styles.warningMessage}>
                  <View style={styles.warningIcon}>
                    <Text style={styles.warningIconText}>!</Text>
                  </View>
                  <Text style={styles.warningText}>
                    Record phone, social profile, and an email address so you have more ways to nurture this person
                  </Text>
                </View>

                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Mobile</Text>
                  <View style={styles.contactActions}>
                    <Text style={styles.contactValue}>{person.phone || '123'}</Text>
                    <Pressable style={styles.contactButton}>
                      <MessageCircle size={20} color="#2563eb" />
                    </Pressable>
                    <Pressable style={styles.contactButton}>
                      <Phone size={20} color="#2563eb" />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Facebook</Text>
                  <View style={styles.contactActions}>
                    <Text style={styles.contactValue}>13 and chill comes to movie night</Text>
                    <Pressable style={styles.contactButton}>
                      <Text style={styles.facebookIcon}>f</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Address</Text>
                  <View style={styles.contactActions}>
                    <Text style={styles.contactValue}>Dropped Pin</Text>
                    <Pressable style={styles.contactButton}>
                      <MapPin size={20} color="#2563eb" />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Country</Text>
                  <Text style={styles.contactValue}>Dominica</Text>
                </View>

                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Preferred Contact Method</Text>
                  <Text style={styles.contactValue}>Other</Text>
                </View>
              </View>

              {/* Creation Details */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Creation Details</Text>
                  <Pressable>
                    <Text style={styles.editButton}>Edit</Text>
                  </Pressable>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Finding Source</Text>
                  <Text style={styles.detailValue}>Mediante persona a la que se está enseñando</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>System Created Date</Text>
                  <Text style={styles.detailValue}>Feb 16, 2023</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Origin</Text>
                  <Text style={styles.detailValue}>Missionary</Text>
                </View>
              </View>

              {/* Assignment */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Assignment</Text>
                  <Pressable>
                    <Text style={styles.editButton}>Edit</Text>
                  </Pressable>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Assignment</Text>
                  <Text style={styles.detailValue}>Portsmouth Branch</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Show on Covenant Path Progress Report</Text>
                  <Text style={styles.detailValue}>No</Text>
                </View>
              </View>

              {/* Additional Information */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Additional Information</Text>
                  <Pressable>
                    <Text style={styles.editButton}>Edit</Text>
                  </Pressable>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Type</Text>
                  <Text style={styles.detailValue}>Not Progressing</Text>
                </View>
              </View>

              {/* Household */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Household</Text>
                  <Pressable>
                    <Text style={styles.editButton}>Edit</Text>
                  </Pressable>
                </View>

                <View style={styles.householdMember}>
                  <View style={styles.memberAvatar}>
                    <Text style={styles.memberInitial}>E</Text>
                  </View>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>Ezekial</Text>
                    <Text style={styles.memberLastContact}>Last Taught 9 months ago</Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {activeTab === 'progress' && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Progress content coming soon</Text>
            </View>
          )}

          {activeTab === 'timeline' && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Timeline content coming soon</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 20,
    color: '#64748b',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  tabText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  statusBanners: {
    gap: 1,
  },
  shareNurturingBanner: {
    backgroundColor: '#a855f7',
    paddingVertical: 8,
    alignItems: 'center',
  },
  stoppedTeachingBanner: {
    backgroundColor: '#f59e0b',
    paddingVertical: 8,
    alignItems: 'center',
  },
  bannerText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  editButton: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  warningMessage: {
    flexDirection: 'row',
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  warningIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  warningIconText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#dc2626',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  contactLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactValue: {
    fontSize: 14,
    color: '#1e293b',
  },
  contactButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookIcon: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  detailItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#1e293b',
  },
  householdMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  memberInitial: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  memberLastContact: {
    fontSize: 14,
    color: '#64748b',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  placeholderText: {
    fontSize: 16,
    color: '#94a3b8',
  },
});