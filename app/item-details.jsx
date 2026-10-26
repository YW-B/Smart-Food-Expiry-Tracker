import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import SimpleInput from '@/components/SimpleInput';
import SimpleButton from '@/components/SimpleButton';
import SimplePickerModal from '@/components/SimplePickerModal';
import { sampleCategories, sampleItems } from '@/data/sampleData';

const categoryNames = sampleCategories.map((category) => category.name);
const statusOptions = ['Active', 'Consumed', 'Discarded'];

export default function ItemDetailsScreen() {
  const params = useLocalSearchParams();
  const itemId = params.id ? parseInt(String(params.id), 10) : 2;

  const selectedItem =
    sampleItems.find((item) => item.id === itemId) || sampleItems[1];

  // These values start with the selected item's details and change as the user edits.
  const [name, setName] = useState(selectedItem.name);
  const [category, setCategory] = useState(selectedItem.category);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [quantity, setQuantity] = useState(selectedItem.quantity);
  const [expiryDate, setExpiryDate] = useState(selectedItem.expiryDate);
  const [status, setStatus] = useState(selectedItem.status);

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function saveChanges() {
    if (name.trim() === '') {
      Alert.alert('Validation Error', 'Item name cannot be empty.');
      return;
    }

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

  function deleteItem() {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${name}" from your inventory?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Deleted', 'Item was removed.', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  }

  function chooseCategory(selectedCategory) {
    setCategory(selectedCategory);
    setShowCategoryPicker(false);
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Item Details" showBack={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Item Name</Text>
          <SimpleInput
            value={name}
            onChangeText={setName}
            placeholder="Item name"
            style={styles.inputWithoutMargin}
          />
        </View>

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

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Quantity</Text>
          <View style={styles.stepperRow}>
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={decreaseQuantity}
              activeOpacity={0.7}
            >
              <Text style={styles.stepperButtonText}>-</Text>
            </TouchableOpacity>

            <View style={styles.stepperValueBox}>
              <Text style={styles.stepperValueText}>{quantity}</Text>
            </View>

            <TouchableOpacity
              style={styles.stepperButton}
              onPress={increaseQuantity}
              activeOpacity={0.7}
            >
              <Text style={styles.stepperButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Expiry Date</Text>
          <View style={styles.row}>
            <View style={styles.inputBesideButton}>
              <SimpleInput
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="DD / MM / YYYY"
                style={styles.inputWithoutMargin}
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

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Barcode (read-only)</Text>
          <View style={styles.barcodeBox}>
            <Text style={styles.barcodeText}>{selectedItem.barcode}</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusSegmentContainer}>
            {statusOptions.map((statusName) => {
              const isSelected = status === statusName;

              return (
                <TouchableOpacity
                  key={statusName}
                  style={[styles.statusSegment, isSelected && styles.statusSegmentActive]}
                  onPress={() => setStatus(statusName)}
                >
                  <Text
                    style={[
                      styles.statusSegmentText,
                      isSelected && styles.statusSegmentTextActive,
                    ]}
                  >
                    {statusName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.buttonSpacer} />

        <SimpleButton
          title="Save Changes"
          variant="primary"
          onPress={saveChanges}
        />

        <SimpleButton
          title="Delete Item"
          variant="secondary"
          onPress={deleteItem}
        />
      </ScrollView>

      <SimplePickerModal
        visible={showCategoryPicker}
        title="Select Category"
        options={categoryNames}
        onSelect={chooseCategory}
        onClose={() => setShowCategoryPicker(false)}
      />
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
  inputBesideButton: {
    flex: 1,
    marginRight: 8,
  },
  inputWithoutMargin: {
    marginVertical: 0,
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
  buttonSpacer: {
    height: 24,
  },
});
