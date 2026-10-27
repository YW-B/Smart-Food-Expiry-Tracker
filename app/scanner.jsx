import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import SimpleButton from '@/components/SimpleButton';
import { colors, cardShadow } from '@/constants/theme';

export default function ScannerScreen() {
  // El variable da bey7faz el flash sh8al wala ma2fool.
  const [flashOn, setFlashOn] = useState(false);
  const detectedProduct = 'Fresh Milk 1L';
  const detectedBarcode = '5012345678900';

  function toggleFlash() {
    setFlashOn(!flashOn);
  }

  function useScannedItem() {
    router.replace({
      pathname: '/add-item',
      params: {
        scannedName: detectedProduct,
        scannedBarcode: detectedBarcode,
      },
    });
  }

  function enterManually() {
    router.back();
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Scan Barcode" showBack={true} />

      <View style={styles.content}>
        <View style={styles.viewfinder}>
          <TouchableOpacity
            style={[styles.flashButton, flashOn && styles.flashButtonActive]}
            onPress={toggleFlash}
            activeOpacity={0.7}
          >
            <Text style={styles.flashText}>{flashOn ? '⚡' : 'F'}</Text>
          </TouchableOpacity>

          <View style={styles.scanningFrame}>
            <Text style={styles.scanningFrameText}>Scanning frame</Text>
          </View>

          <Text style={styles.viewfinderSubtext}>Camera viewfinder</Text>
        </View>

        <Text style={styles.instructionText}>
          Point the camera at the barcode
        </Text>

        <View style={styles.detectedCard}>
          <Text style={styles.detectedProductText}>
            Product: {detectedProduct}
          </Text>

          <SimpleButton
            title="Use This Item"
            variant="primary"
            onPress={useScannedItem}
            style={styles.useItemButton}
          />
        </View>

        <TouchableOpacity
          style={styles.manualLinkContainer}
          onPress={enterManually}
        >
          <Text style={styles.manualLinkText}>Enter manually</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewfinder: {
    width: '100%',
    height: 340,
    backgroundColor: colors.primaryDark,
    borderWidth: 0,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 16,
    overflow: 'hidden',
    ...cardShadow,
  },
  flashButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashButtonActive: {
    backgroundColor: colors.accent,
  },
  flashText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  scanningFrame: {
    width: '78%',
    height: 140,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.surface,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  scanningFrameText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.surface,
  },
  viewfinderSubtext: {
    position: 'absolute',
    bottom: 16,
    fontSize: 13,
    color: colors.primarySoft,
  },
  instructionText: {
    fontSize: 14,
    color: colors.mutedText,
    marginVertical: 12,
    textAlign: 'center',
  },
  detectedCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 18,
    backgroundColor: colors.surface,
    ...cardShadow,
  },
  detectedProductText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  useItemButton: {
    marginVertical: 0,
  },
  manualLinkContainer: {
    paddingVertical: 12,
  },
  manualLinkText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
