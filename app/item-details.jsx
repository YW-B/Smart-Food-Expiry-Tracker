// app/item-details.jsx
// Item Details Screen (Screen 6 in the PDF Wireframe)
// Displays full food item details, quantity stepper, status segments, and actions to save or delete.

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
import { sampleCategories, sampleItems } from '@/data/sampleData';

export default function ItemDetailsScreen() {
  // Read the item ID passed from Home or Inventory screen
  const params = useLocalSearchParams();
  const itemId = params.id ? parseInt(String(params.id), 10) : 2;

  // Find the selected item from our sample dataset, or default to the first one
  const selectedItem =
    sampleItems.find((item) => item.id === itemId) || sampleItems[1];

  // State variables for the item fields:
  // 1. name: item name string
  const [name, setName] = useState(selectedItem?.name || 'Fresh Milk 1L');

  // 2. category: item category name
  const [category, setCategory] = useState(selectedItem?.category || 'Dairy');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // 3. quantity: current count of the item
  const [quantity, setQuantity] = useState(selectedItem?.quantity || 2);

  // 4. expiryDate: expiry date formatted string
  const [expiryDate, setExpiryDate] = useState(
    selectedItem?.expiryDate || '26 / 10 / 2026'
  );

  // 5. barcode: read-only barcode value
  const [barcode] = useState(selectedItem?.barcode || '5 012345 678900');

  // 6. status: 'Active' | 'Consumed' | 'Discarded'
  const [status, setStatus] = useState(selectedItem?.status || 'Active');

  // Decrement quantity button handler (cannot go below 1)
  function handleDecrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  // Increment quantity button handler
  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  // Save changes handler
  function handleSaveChanges() {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Item name cannot be empty.');
      return;
    }

    // In the future SQLite database phase:
    // UPDATE Item
    // SET name = ?, categoryId = ?, quantity = ?, expiryDate = ?, status = ?
    // WHERE id = ?;
    Alert.alert(
      'Changes Saved',
      `"${name}" has been updated successfully! (Local state demo)`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  }

  // Delete item handler
  function handleDeleteItem() {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${name}" from your inventory?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In the future SQLite phase:
            // DELETE FROM Item WHERE id = ?;
            Alert.alert('Deleted', 'Item was removed.', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with back arrow */}
      <ScreenHeader title="Item Details" showBack={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Item Name Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Item Name</Text>
          <AppInput
            value={name}
            onChangeText={setName}
            placeholder="Item name"
            style={{ marginVertical: 0 }}
          />
        </View>

        {/* Category Selector */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.pickerBox}
            onPress={() => setShowCategoryPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.pickerValueText}>{category}</Text>
            <Text style={styles.dropdownArrow}>v</Text>
          </TouchableOpacity>
        </View>

        {/* Quantity Stepper Control matching wireframe Page 6: [-] [ 2 ] [+] */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Quantity</Text>
          <View style={styles.stepperRow}>
            {/* Decrement Button [-] */}
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={handleDecrement}
              activeOpacity={0.7}
            >
              <Text style={styles.stepperButtonText}>-</Text>
            </TouchableOpacity>

            {/* Current Quantity Display Box */}
            <View style={styles.stepperValueBox}>
              <Text style={styles.stepperValueText}>{quantity}</Text>
            </View>

            {/* Increment Button [+] */}
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={handleIncrement}
              activeOpacity={0.7}
            >
              <Text style={styles.stepperButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Expiry Date with [cal] helper button */}
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
            <TouchableOpacity
              style={styles.calButton}
              onPress={() => {
                Alert.alert('Calendar', 'Expiry date picker will open native calendar.');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.calButtonText}>cal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barcode (read-only) dashed box matching wireframe Page 6 */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Barcode (read-only)</Text>
          <View style={styles.barcodeBox}>
            <Text style={styles.barcodeText}>{barcode}</Text>
          </View>
        </View>

        {/* Status Segmented Buttons: [Active] [Consumed] [Discarded] */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusSegmentContainer}>
            <TouchableOpacity
              style={[
                styles.statusSegment,
                status === 'Active' && styles.statusSegmentActive,
              ]}
              onPress={() => setStatus('Active')}
            >
              <Text
                style={[
                  styles.statusSegmentText,
                  status === 'Active' && styles.statusSegmentTextActive,
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.statusSegment,
                status === 'Consumed' && styles.statusSegmentActive,
              ]}
              onPress={() => setStatus('Consumed')}
            >
              <Text
                style={[
                  styles.statusSegmentText,
                  status === 'Consumed' && styles.statusSegmentTextActive,
                ]}
              >
                Consumed
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.statusSegment,
                status === 'Discarded' && styles.statusSegmentActive,
              ]}
              onPress={() => setStatus('Discarded')}
            >
              <Text
                style={[
                  styles.statusSegmentText,
                  status === 'Discarded' && styles.statusSegmentTextActive,
                ]}
              >
                Discarded
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 24 }} />

        {/* Save Changes Button (Primary filled gray) */}
        <AppButton
          title="Save Changes"
          variant="primary"
          onPress={handleSaveChanges}
        />

        {/* Delete Item Button (Secondary outlined) */}
        <AppButton
          title="Delete Item"
          variant="secondary"
          onPress={handleDeleteItem}
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
            <Text style={styles.modalTitle}>Select Category</Text>
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
  },
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
  // Stepper styles: [-] [ 2 ] [+]
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  stepperButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
  },
  stepperValueBox: {
    width: 80,
    height: 44,
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  stepperValueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  // Calendar button
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
  // Dashed Barcode Box
  barcodeBox: {
    height: 48,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#333333',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
  barcodeText: {
    fontSize: 15,
    letterSpacing: 2,
    color: '#333333',
    fontFamily: 'monospace',
  },
  // Status Segments
  statusSegmentContainer: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statusSegment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#333333',
  },
  statusSegmentActive: {
    backgroundColor: '#b5b5b5',
  },
  statusSegmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  statusSegmentTextActive: {
    color: '#111111',
    fontWeight: 'bold',
  },
  // Modal styles
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
