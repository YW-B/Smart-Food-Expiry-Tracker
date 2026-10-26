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
import { colors, cardShadow } from '@/constants/theme';

export default function CategoriesScreen() {
  // El state da bey7faz list el categories elli zahra 3ala el screen.
  const [categories, setCategories] = useState(sampleCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  function deleteCategory(id, name) {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCategories((currentCategories) => {
              return currentCategories.filter((category) => category.id !== id);
            });
          },
        },
      ]
    );
  }

  function openEditCategory(category) {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setModalVisible(true);
  }

  function openNewCategory() {
    setEditingCategory(null);
    setNewCategoryName('');
    setModalVisible(true);
  }

  function saveCategory() {
    const cleanName = newCategoryName.trim();

    if (cleanName === '') {
      Alert.alert('Validation Error', 'Please enter a category name.');
      return;
    }

    if (editingCategory) {
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: cleanName }
            : category
        )
      );
    } else {
      const lastCategory = categories[categories.length - 1];
      const newCategory = {
        id: lastCategory ? lastCategory.id + 1 : 1,
        name: cleanName,
        count: 0,
      };
      setCategories((currentCategories) => [...currentCategories, newCategory]);
    }

    setNewCategoryName('');
    setEditingCategory(null);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Categories" showBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <Text style={styles.categoryTitle}>
              {category.name} - {category.count} items
            </Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => openEditCategory(category)}
              >
                <Text style={styles.actionButtonText}>edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteActionButton]}
                onPress={() => deleteCategory(category.id, category.name)}
              >
                <Text style={[styles.actionButtonText, styles.deleteActionText]}>del</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <SimpleButton
          title="+ Add Category"
          variant="primary"
          onPress={openNewCategory}
        />
      </View>

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
                onPress={saveCategory}
              >
                <Text style={[styles.modalBtnText, styles.modalSaveText]}>Save</Text>
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 24,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 7,
    ...cardShadow,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 11,
    marginLeft: 8,
    backgroundColor: colors.primarySoft,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  deleteActionButton: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.dangerSoft,
  },
  deleteActionText: {
    color: colors.danger,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(23,35,28,0.46)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: 10,
  },
  modalCancelBtn: {
    backgroundColor: colors.surface,
  },
  modalSaveBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  modalSaveText: {
    color: colors.surface,
  },
});
