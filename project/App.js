import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-manager';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [dataToSend, setDataToSend] = useState('');
  const [receivedData, setReceivedData] = useState('');

  useEffect(() => {
    startScan();
    return () => {
      stopScan();
    };
  }, []);

  const bleManager = new BleManager();

  const startScan = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
      if (!devices.some((d) => d.id === device.id)) {
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    });
  };

  const stopScan = () => {
    bleManager.stopDeviceScan();
  };

  const connectToDevice = (deviceId) => {
    bleManager.connectToDevice(deviceId)
      .then((device) => {
        console.log('Connected to device:', device);
        setConnectedDevice(device);
      })
      .catch((error) => {
        console.error('Connection error:', error);
      });
  };

  const disconnectDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id)
        .then(() => {
          console.log('Disconnected from device:', connectedDevice.id);
          setConnectedDevice(null);
        })
        .catch((error) => {
          console.error('Disconnection error:', error);
        });
    }
  };

  const sendData = () => {
    if (connectedDevice && dataToSend) {
      bleManager.writeCharacteristicWithoutResponseForDevice(
        connectedDevice.id,
        'serviceUUID',
        'characteristicUUID',
        dataToSend
      )
        .then(() => {
          console.log('Data sent successfully');
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    }
  };

  const renderItem = ({ item }) => (
    <Button title={item.name} onPress={() => connectToDevice(item.id)} />
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Scan for Devices" onPress={startScan} />
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {connectedDevice && (
        <View>
          <Text>Connected to: {connectedDevice.name}</Text>
          <Button title="Disconnect" onPress={disconnectDevice} />
          <TextInput
            placeholder="Enter data to send"
            onChangeText={setDataToSend}
            value={dataToSend}
          />
          <Button title="Send Data" onPress={sendData} />
        </View>
      )}
      <Text>Received Data: {receivedData}</Text>
    </View>
  );
};

export default App;
