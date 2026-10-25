// app/add-item.jsx
// Add Item Screen (Screen 2 in the PDF Wireframe)
// Form to register a new food item with name, barcode scan shortcut, category, quantity, unit, and expiry date.

import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import AppInput from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import { sampleCategories } from '@/data/sampleData';

export default function AddItemScreen() {
  // If the user scanned a barcode from the scanner screen, we can receive the product name via route params
  const params = useLocalSearchParams();

  // Form State:
  // 1. name: Text name of the food item
  const [name, setName] = useState(params.scannedName ? String(params.scannedName) : '');

  // 2. category: Selected food category name
  const [category, setCategory] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // 3. quantity: Amount of food items
  const [quantity, setQuantity] = useState('1');

  // 4. unit: Unit of measurement (L, pcs, kg, g, loaf, pack)
  const [unit, setUnit] = useState('');
  const [showUnitPicker, setShowUnitPicker] = useState(false);

  // 5. expiryDate: Target expiry date string (DD / MM / YYYY)
  const [expiryDate, setExpiryDate] = useState('');

  // Available units list for easy selection
  const unitsList = ['pcs', 'L', 'kg', 'g', 'pack', 'loaf', 'can'];

  // Form validation function:
  // Beginners can see how simple if statements guard against missing user input
  function handleSaveItem() {
    if (!name.trim()) {
      Alert.alert('Missing Field', 'Please enter an item name.');
      return;
    }
    if (!category) {
      Alert.alert('Missing Field', 'Please select a food category.');
      return;
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      Alert.alert('Invalid Field', 'Please enter a valid quantity greater than 0.');
      return;
    }
    if (!unit) {
      Alert.alert('Missing Field', 'Please select a unit of measurement.');
      return;
    }
    if (!expiryDate.trim()) {
      Alert.alert('Missing Field', 'Please enter an expiry date (e.g. DD / MM / YYYY).');
      return;
    }

    // In the future SQLite database phase, we will execute:
    // INSERT INTO Item (name, categoryId, quantity, unit, expiryDate, status)
    // VALUES (name, selectedCatId, quantity, unit, expiryDate, 'Active');
    Alert.alert(
      'Item Saved',
      `"${name}" has been added to your inventory! (Local state demo)`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  }

  // Quick helper to fill in a sample expiry date (7 days from now)
  function handleQuickCalendar() {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    setExpiryDate(`${day} / ${month} / ${year}`);
  }

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <ScreenHeader title="Add Item" showBack={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Item Name Input with [cam] Scan Barcode button beside it */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Item Name</Text>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <AppInput
                value={name}
                onChangeText={setName}
                placeholder="Enter item name"
                style={{ marginVertical: 0 }}
              />
            </View>

            {/* [cam] Scan Barcode Button matching wireframe Page 2 */}
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => router.push('/scanner')}
              activeOpacity={0.7}
            >
              <Text style={styles.scanButtonText}>[cam] Scan</Text>
              <Text style={styles.scanButtonText}>Barcode</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Dropdown Picker */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.pickerBox}
            onPress={() => setShowCategoryPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={category ? styles.pickerValueText : styles.pickerPlaceholderText}>
              {category || 'Select category'}
            </Text>
            <Text style={styles.dropdownArrow}>v</Text>
          </TouchableOpacity>
        </View>

        {/* Quantity and Unit Row (Side by side) */}
        <View style={styles.row}>
          {/* Quantity Input */}
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Quantity</Text>
            <AppInput
              value={quantity}
              onChangeText={setQuantity}
              placeholder="0"
              keyboardType="numeric"
              style={{ marginVertical: 0 }}
            />
          </View>

          {/* Unit Dropdown */}
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Unit</Text>
            <TouchableOpacity
              style={styles.pickerBox}
              onPress={() => setShowUnitPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={unit ? styles.pickerValueText : styles.pickerPlaceholderText}>
                {unit || 'Select unit'}
              </Text>
              <Text style={styles.dropdownArrow}>v</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Expiry Date Input with [cal] button */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Expiry Date</Text>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <AppInput
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="DD / MM / YYYY"
                style={{ marginVertical: 0 }}
              />
            </View>

            {/* [cal] Calendar picker helper button */}
            <TouchableOpacity
              style={styles.calButton}
              onPress={handleQuickCalendar}
              activeOpacity={0.7}
            >
              <Text style={styles.calButtonText}>cal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer before action buttons */}
        <View style={{ height: 40 }} />

        {/* Save Item Button (Primary filled gray) */}
        <AppButton
          title="Save Item"
          variant="primary"
          onPress={handleSaveItem}
        />

        {/* Cancel Button (Secondary outlined) */}
        <AppButton
          title="Cancel"
          variant="secondary"
          onPress={() => router.back()}
        />
      </ScrollView>

      {/* Category Picker Modal */}
      <Modal
        visible={showCategoryPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCategoryPicker(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Category</Text>
            {sampleCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.modalOption}
                onPress={() => {
                  setCategory(cat.name);
                  setShowCategoryPicker(false);
                }}
              >
                <Text style={styles.modalOptionText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Unit Picker Modal */}
      <Modal
        visible={showUnitPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUnitPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowUnitPicker(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Unit</Text>
            {unitsList.map((u) => (
              <TouchableOpacity
                key={u}
                style={styles.modalOption}
                onPress={() => {
                  setUnit(u);
                  setShowUnitPicker(false);
                }}
              >
                <Text style={styles.modalOptionText}>{u}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  // Scan barcode button beside Item Name input
  scanButton: {
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  scanButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
  },
  // Dropdown style box for Category and Unit
  pickerBox: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  pickerPlaceholderText: {
    fontSize: 15,
    color: '#888888',
  },
  pickerValueText: {
    fontSize: 15,
    color: '#111111',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  // [cal] Calendar button
  calButton: {
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  calButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  // Modal selection styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#333333',
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111111',
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#222222',
    textAlign: 'center',
  },
});
