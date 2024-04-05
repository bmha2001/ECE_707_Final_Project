import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import BleManager from 'react-native-ble-plx';

const BluetoothScanner = () => {
  const [devices, setDevices] = useState([]);
  const manager = new BleManager();

  const renderDevices = () => {
    return manager.devices.map(device => (
      <View key={device.id}>
        <Text>{device.name || 'Unknown'}</Text>
        <Text>{device.DeviceID}</Text>
      </View>
    ));
  };

  return (
    <View>
      <Button title="Scan for Devices" onPress={() => setDevices([])} />
      {renderDevices()}
    </View>
  );
};

export default BluetoothScanner;
