// app/scanner.jsx
// Scan Barcode Screen (Screen 3 in the PDF Wireframe)
// Barcode scanner viewfinder interface with simulated scan detection card.

import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import ScreenHeader from '@/components/ScreenHeader';
import SimpleButton from '@/components/SimpleButton';

export default function ScannerScreen() {
  // Local state to track whether the flashlight is turned on or off
  const [flashOn, setFlashOn] = useState(false);

  // Simulated detected item from barcode scan
  const detectedProduct = 'Fresh Milk 1L';

  // Toggle flash state
  function handleToggleFlash() {
    setFlashOn(!flashOn);
  }

  // Use the scanned product: navigate back to Add Item screen with product name pre-filled
  function handleUseScannedItem() {
    // We pass the scanned item name as a query parameter in Expo Router
    router.replace({
      pathname: '/add-item',
      params: { scannedName: detectedProduct },
    });
  }

  // Manual entry fallback
  function handleEnterManually() {
    router.back();
  }

  return (
    <View style={styles.container}>
      {/* Top Header with Back Button */}
      <ScreenHeader title="Scan Barcode" showBack={true} />

      <View style={styles.content}>
        {/* Camera Viewfinder Box matching wireframe Page 3 */}
        <View style={styles.viewfinder}>
          {/* Flashlight toggle button in circle at top right */}
          <TouchableOpacity
            style={[styles.flashButton, flashOn && styles.flashButtonActive]}
            onPress={handleToggleFlash}
            activeOpacity={0.7}
          >
            <Text style={styles.flashText}>{flashOn ? '⚡' : 'F'}</Text>
          </TouchableOpacity>

          {/* Center Dashed Scanning Frame */}
          <View style={styles.scanningFrame}>
            <Text style={styles.scanningFrameText}>Scanning frame</Text>
          </View>

          {/* Subtitle inside camera viewfinder */}
          <Text style={styles.viewfinderSubtext}>Camera viewfinder</Text>
        </View>

        {/* Instructions text */}
        <Text style={styles.instructionText}>
          Point the camera at the barcode
        </Text>

        {/* Detected Product Card matching wireframe */}
        <View style={styles.detectedCard}>
          <Text style={styles.detectedProductText}>
            Product: {detectedProduct}
          </Text>

          {/* Button to confirm using the detected item */}
          <SimpleButton
            title="Use This Item"
            variant="primary"
            onPress={handleUseScannedItem}
            style={styles.useItemButton}
          />
        </View>

        {/* Enter manually link at the bottom */}
        <TouchableOpacity
          style={styles.manualLinkContainer}
          onPress={handleEnterManually}
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
  // Large viewfinder rectangle matching wireframe
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
  // Flash toggle button in circle
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
  // Dashed inner scanning frame
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
  // Detected product card with thick border
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
