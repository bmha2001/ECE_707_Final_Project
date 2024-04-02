import React, { useState } from 'react';
import BluetoothComponent from './BluetoothComponent';

const App = () => {
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Function to handle the "Find Devices" button click
  const handleFindDevices = () => {
    setScanning(true);
  };

  // Function to handle the "Connect" button click
  const handleConnectToDevice = (device) => {
    setScanning(false);
    setConnecting(true);
    // Additional logic can be added here if needed
  };

  // Function to handle disconnection or cancellation
  const handleDisconnect = () => {
    setConnecting(false);
    // Additional logic can be added here if needed
  };

  return (
    <div>
      <h1>Bluetooth Device Manager</h1>
      <button onClick={handleFindDevices} disabled={scanning || connecting}>
        {scanning ? 'Scanning...' : 'Find Devices'}
      </button>
      <button disabled={scanning || !connecting} onClick={handleDisconnect}>
        Disconnect
      </button>
      {scanning && <p>Scanning for devices...</p>}
      {connecting && (
        <p>Connecting to device...</p>
      )}
      <BluetoothComponent
        onConnect={handleConnectToDevice}
        onDisconnect={handleDisconnect}
        scanning={scanning}
        connecting={connecting}
      />
    </div>
  );
};

export default App;
