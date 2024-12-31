import os from 'os'

export const getLocalIPAddress = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const iface of networkInterfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address; // Return the local IP address
            }
        }
    }
    return 'Unable to determine local IP';
};

