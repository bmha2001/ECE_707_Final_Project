import React, { useState } from 'react';
import BluetoothComponent from './BluetoothComponent';

const App = () => {
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState(false);

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
