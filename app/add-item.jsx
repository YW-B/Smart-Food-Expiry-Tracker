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
import { sampleCategories } from '@/data/sampleData';

const units = ['pcs', 'L', 'kg', 'g', 'pack', 'loaf', 'can'];
const categoryNames = sampleCategories.map((category) => category.name);

export default function AddItemScreen() {
  const params = useLocalSearchParams();

  // Kol state variable hena bey7faz value el user katabha aw ekhtarha fel form.
  const [name, setName] = useState(params.scannedName ? String(params.scannedName) : '');
  const [category, setCategory] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('');
  const [showUnitPicker, setShowUnitPicker] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');

  function saveItem() {
    if (name.trim() === '') {
      Alert.alert('Missing Field', 'Please enter an item name.');
      return;
    }
    if (!category) {
      Alert.alert('Missing Field', 'Please select a food category.');
      return;
    }
    if (quantity === '' || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      Alert.alert('Invalid Field', 'Please enter a valid quantity greater than 0.');
      return;
    }
    if (!unit) {
      Alert.alert('Missing Field', 'Please select a unit of measurement.');
      return;
    }
    if (expiryDate.trim() === '') {
      Alert.alert('Missing Field', 'Please enter an expiry date (e.g. DD / MM / YYYY).');
      return;
    }

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

  function fillDateOneWeekFromNow() {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    setExpiryDate(`${day} / ${month} / ${year}`);
  }

  function chooseCategory(selectedCategory) {
    setCategory(selectedCategory);
    setShowCategoryPicker(false);
  }

  function chooseUnit(selectedUnit) {
    setUnit(selectedUnit);
    setShowUnitPicker(false);
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Add Item" showBack={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Item Name</Text>
          <View style={styles.row}>
            <View style={styles.inputBesideButton}>
              <SimpleInput
                value={name}
                onChangeText={setName}
                placeholder="Enter item name"
                style={styles.inputWithoutMargin}
              />
            </View>

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

        <View style={styles.row}>
          <View style={styles.inputBesideButton}>
            <Text style={styles.label}>Quantity</Text>
            <SimpleInput
              value={quantity}
              onChangeText={setQuantity}
              placeholder="0"
              keyboardType="numeric"
              style={styles.inputWithoutMargin}
            />
          </View>

          <View style={styles.halfWidth}>
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
              onPress={fillDateOneWeekFromNow}
              activeOpacity={0.7}
            >
              <Text style={styles.calButtonText}>cal</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonSpacer} />

        <SimpleButton
          title="Save Item"
          variant="primary"
          onPress={saveItem}
        />

        <SimpleButton
          title="Cancel"
          variant="secondary"
          onPress={() => router.back()}
        />
      </ScrollView>

      <SimplePickerModal
        visible={showCategoryPicker}
        title="Choose Category"
        options={categoryNames}
        onSelect={chooseCategory}
        onClose={() => setShowCategoryPicker(false)}
      />

      <SimplePickerModal
        visible={showUnitPicker}
        title="Choose Unit"
        options={units}
        onSelect={chooseUnit}
        onClose={() => setShowUnitPicker(false)}
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
    marginBottom: 16,
  },
  inputBesideButton: {
    flex: 1,
    marginRight: 8,
  },
  halfWidth: {
    flex: 1,
  },
  inputWithoutMargin: {
    marginVertical: 0,
  },
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
  buttonSpacer: {
    height: 40,
  },
});
