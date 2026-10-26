import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, cardShadow } from '@/constants/theme';

// El component da bya5od list choices w yeraga3 lel parent el choice elli etdas 3aleh.
export default function SimplePickerModal({ visible, title, options, onSelect, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.background} onPress={onClose} />

        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>

          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => onSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(23,35,28,0.46)',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    backgroundColor: colors.surface,
    ...cardShadow,
  },
  title: {
    marginBottom: 12,
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: 15,
    color: colors.primaryDark,
    textAlign: 'center',
  },
});
