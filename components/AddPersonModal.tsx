import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TextInput, ScrollView, Switch } from 'react-native';
import { X, Check, Plus } from 'lucide-react-native';
import { Person } from '@/types/Person';

interface AddPersonModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (person: Omit<Person, 'id'>) => void;
}

const findingSources = [
  'Not Recorded',
  'Referral',
  'Street Contact',
  'Online',
  'Friend',
  'Family',
  'Church Member',
  'Other'
];

const assignments = [
  'Portsmouth Branch',
  'Norfolk Ward',
  'Virginia Beach Stake',
  'Other'
];

export function AddPersonModal({ visible, onClose, onSave }: AddPersonModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [socialProfile, setSocialProfile] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [findingSource, setFindingSource] = useState('Not Recorded');
  const [assignment, setAssignment] = useState('Portsmouth Branch');
  const [wasReferred, setWasReferred] = useState(false);
  
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showSocialInput, setShowSocialInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) return;

    const person: Omit<Person, 'id'> = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      instagram: socialProfile.trim() || undefined,
      dotColor: 'yellow',
      dateCount: 0,
      notes: [],
    };

    onSave(person);
    
    // Reset form
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setSocialProfile('');
    setAddress('');
    setLocation('');
    setFindingSource('Not Recorded');
    setAssignment('Portsmouth Branch');
    setWasReferred(false);
    setShowPhoneInput(false);
    setShowEmailInput(false);
    setShowSocialInput(false);
    setShowAddressInput(false);
    setShowLocationInput(false);
  };

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
          <Text style={styles.headerTitle}>Add Person</Text>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Check size={24} color="#ffffff" />
          </Pressable>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Name Fields */}
          <View style={styles.inputSection}>
            <TextInput
              style={styles.textInput}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputSection}>
            <TextInput
              style={styles.textInput}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Info Message */}
          <View style={styles.infoMessage}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>
            <Text style={styles.infoText}>
              Record phone, social profile, and an email address so you have more ways to nurture this person
            </Text>
          </View>

          {/* Contact Options */}
          <View style={styles.contactOptions}>
            {!showPhoneInput ? (
              <Pressable style={styles.addOption} onPress={() => setShowPhoneInput(true)}>
                <Plus size={20} color="#2563eb" />
                <Text style={styles.addOptionText}>Phone</Text>
              </Pressable>
            ) : (
              <View style={styles.inputSection}>
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Phone"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                />
              </View>
            )}

            {!showEmailInput ? (
              <Pressable style={styles.addOption} onPress={() => setShowEmailInput(true)}>
                <Plus size={20} color="#2563eb" />
                <Text style={styles.addOptionText}>Email</Text>
              </Pressable>
            ) : (
              <View style={styles.inputSection}>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            )}

            {!showSocialInput ? (
              <Pressable style={styles.addOption} onPress={() => setShowSocialInput(true)}>
                <Plus size={20} color="#2563eb" />
                <Text style={styles.addOptionText}>Social Profile</Text>
              </Pressable>
            ) : (
              <View style={styles.inputSection}>
                <TextInput
                  style={styles.textInput}
                  value={socialProfile}
                  onChangeText={setSocialProfile}
                  placeholder="Social Profile"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            )}

            {!showAddressInput ? (
              <Pressable style={styles.addOption} onPress={() => setShowAddressInput(true)}>
                <Plus size={20} color="#2563eb" />
                <Text style={styles.addOptionText}>Address</Text>
              </Pressable>
            ) : (
              <View style={styles.inputSection}>
                <TextInput
                  style={styles.textInput}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Address"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            )}

            {!showLocationInput ? (
              <Pressable style={styles.addOption} onPress={() => setShowLocationInput(true)}>
                <Plus size={20} color="#2563eb" />
                <Text style={styles.addOptionText}>Location</Text>
              </Pressable>
            ) : (
              <View style={styles.inputSection}>
                <TextInput
                  style={styles.textInput}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Location"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            )}
          </View>

          {/* Finding Source */}
          <View style={styles.dropdownSection}>
            <Text style={styles.dropdownLabel}>Finding Source</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownValue}>{findingSource}</Text>
            </View>
          </View>

          {/* Was Referred */}
          <View style={styles.checkboxSection}>
            <Text style={styles.checkboxLabel}>Was this person referred?</Text>
            <Switch
              value={wasReferred}
              onValueChange={setWasReferred}
              trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
              thumbColor={wasReferred ? '#ffffff' : '#f1f5f9'}
            />
          </View>

          {/* Assignment */}
          <View style={styles.dropdownSection}>
            <Text style={styles.dropdownLabel}>Assignment</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownValue}>{assignment}</Text>
            </View>
          </View>

          {/* Expand Options Button */}
          <Pressable style={styles.expandButton}>
            <Text style={styles.expandButtonText}>Expand Options</Text>
          </Pressable>
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
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputSection: {
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  infoMessage: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoIconText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  contactOptions: {
    gap: 12,
    marginBottom: 24,
  },
  addOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  addOptionText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
  dropdownSection: {
    marginBottom: 16,
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dropdownValue: {
    fontSize: 16,
    color: '#1e293b',
  },
  checkboxSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  expandButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  expandButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});