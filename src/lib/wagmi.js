import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Define la red personalizada ETN
const etn = {
  id: 52014,
  name: 'ETN Network',
  network: 'etn',
  iconBackground: '#fff',
  nativeCurrency: {
    name: 'ETN',
    symbol: 'ETN',
    decimals: 2,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/electroneum/'],
    },
    public: {
      http: ['https://rpc.ankr.com/electroneum/'],
    },
  },
  blockExplorers: {
    default: { name: 'ETN Explorer', url: 'https://blockexplorer.electroneum.com' },
  },
};

// Configuración de RainbowKit
export const config = getDefaultConfig({
  appName: 'Buddy',
  projectId: '91e4298f4ed8aa463e3565e8116a943f',
  chains: [etn],
});
