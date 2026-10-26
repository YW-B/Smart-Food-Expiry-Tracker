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
import { colors, cardShadow } from '@/constants/theme';

const categoryNames = sampleCategories.map((category) => category.name);
const statusOptions = ['Active', 'Consumed', 'Discarded'];

export default function ItemDetailsScreen() {
  const params = useLocalSearchParams();
  const itemId = params.id ? parseInt(String(params.id), 10) : 2;

  const selectedItem =
    sampleItems.find((item) => item.id === itemId) || sampleItems[1];

  // El values dol beyebda2o be details el item, w beyett8ayaro lama el user ye3adelhom.
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 40,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
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
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
  },
  pickerValueText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  stepperButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  stepperValueBox: {
    width: 80,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  stepperValueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  calButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    ...cardShadow,
  },
  calButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  barcodeBox: {
    height: 54,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
  },
  barcodeText: {
    fontSize: 15,
    letterSpacing: 2,
    color: colors.mutedText,
    fontFamily: 'monospace',
  },
  statusSegmentContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  statusSegment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  statusSegmentActive: {
    backgroundColor: colors.primary,
  },
  statusSegmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mutedText,
  },
  statusSegmentTextActive: {
    color: colors.surface,
    fontWeight: 'bold',
  },
  buttonSpacer: {
    height: 24,
  },
});
