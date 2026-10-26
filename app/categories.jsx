// app/categories.jsx
// Categories Screen (Screen 5 in the PDF Wireframe)
// Displays category list with item counts, [edit] and [del] actions, and "+ Add Category" button.

import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenHeader from '@/components/ScreenHeader';
import SimpleButton from '@/components/SimpleButton';
import { sampleCategories } from '@/data/sampleData';

export default function CategoriesScreen() {
  // Store the list of categories in state so the user can add, edit, or delete items.
  // In the future SQLite phase:
  // SELECT * FROM Category;
  const [categories, setCategories] = useState(sampleCategories);

  // Modal state for adding a new category
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Editing state
  const [editingCategory, setEditingCategory] = useState(null);

  // Delete a category from local state
  // Demonstrates how array .filter() is used to remove an item by ID
  function handleDeleteCategory(id, name) {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Remove category from state
            // SQLite future implementation: DELETE FROM Category WHERE id = ?
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
          },
        },
      ]
    );
  }

  // Open modal to edit category name
  function handleEditCategory(category) {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setModalVisible(true);
  }

  // Save new or edited category
  function handleSaveCategory() {
    if (!newCategoryName.trim()) {
      Alert.alert('Validation Error', 'Please enter a category name.');
      return;
    }

    if (editingCategory) {
      // Update existing category
      // SQLite future implementation: UPDATE Category SET name = ? WHERE id = ?
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: newCategoryName.trim() }
            : cat
        )
      );
    } else {
      // Add new category
      // SQLite future implementation: INSERT INTO Category (name) VALUES (?)
      const newId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
      const newCat = {
        id: newId,
        name: newCategoryName.trim(),
        count: 0,
      };
      setCategories((prev) => [...prev, newCat]);
    }

    // Reset modal state
    setNewCategoryName('');
    setEditingCategory(null);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      {/* Screen Header with back arrow */}
      <ScreenHeader title="Categories" showBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* List of category cards matching wireframe Page 5 */}
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            {/* Category Name and item count */}
            <Text style={styles.categoryTitle}>
              {category.name} - {category.count} items
            </Text>

            {/* Small Action buttons: [edit] and [del] */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditCategory(category)}
              >
                <Text style={styles.actionButtonText}>edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeleteCategory(category.id, category.name)}
              >
                <Text style={styles.actionButtonText}>del</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Button: + Add Category */}
      <View style={styles.bottomBar}>
        <SimpleButton
          title="+ Add Category"
          variant="primary"
          onPress={() => {
            setEditingCategory(null);
            setNewCategoryName('');
            setModalVisible(true);
          }}
        />
      </View>

      {/* Simple Modal Dialog for Adding / Editing Category */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCategory ? 'Edit Category' : 'New Category'}
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Enter category name"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              autoFocus={true}
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalCancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.modalSaveBtn]}
                onPress={handleSaveCategory}
              >
                <Text style={styles.modalBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingBottom: 24,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#333333',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111111',
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 8,
    backgroundColor: '#ffffff',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#333333',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 15,
    marginBottom: 20,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#333333',
    marginLeft: 10,
  },
  modalCancelBtn: {
    backgroundColor: '#ffffff',
  },
  modalSaveBtn: {
    backgroundColor: '#b5b5b5',
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
});
