import React, { useState } from 'react';

const BluetoothComponent = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [connected, setConnected] = useState(false);

  // Function to start scanning for nearby Bluetooth devices
  const scanDevices = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      });
      setDevices([device]);
    } catch (error) {
      console.error('Bluetooth device scan error:', error);
    }
  };

  // Function to connect to a selected Bluetooth device
  const connectToDevice = async (device) => {
    try {
      const server = await device.gatt.connect();
      console.log('Connected to device:', server);
      setConnected(true);
      setSelectedDevice(device);
      // Add code here to communicate with the device
    } catch (error) {
      console.error('Bluetooth device connection error:', error);
    }
  };

  return (
    <div>
      <button onClick={scanDevices}>Scan for Devices</button>
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            <button onClick={() => connectToDevice(device)}>
              {device.name || 'Unnamed Device'}
            </button>
          </li>
        ))}
      </ul>
      {connected && (
        <p>Connected to: {selectedDevice.name || 'Unnamed Device'}</p>
      )}
    </div>
  );
};

export default BluetoothComponent;
