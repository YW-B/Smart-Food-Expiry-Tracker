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

export default function ScannerScreen() {
  // This value remembers whether the flash button is on or off.
  const [flashOn, setFlashOn] = useState(false);
  const detectedProduct = 'Fresh Milk 1L';

  function toggleFlash() {
    setFlashOn(!flashOn);
  }

  function useScannedItem() {
    router.replace({
      pathname: '/add-item',
      params: { scannedName: detectedProduct },
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
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewfinder: {
    width: '100%',
    height: 340,
    backgroundColor: '#b0b0b0',
    borderWidth: 1.5,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 16,
  },
  flashButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashButtonActive: {
    backgroundColor: '#ffe082',
  },
  flashText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
  },
  scanningFrame: {
    width: '78%',
    height: 140,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  scanningFrameText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
  },
  viewfinderSubtext: {
    position: 'absolute',
    bottom: 16,
    fontSize: 13,
    color: '#222222',
  },
  instructionText: {
    fontSize: 14,
    color: '#333333',
    marginVertical: 12,
    textAlign: 'center',
  },
  detectedCard: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  detectedProductText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
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
    color: '#222222',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
