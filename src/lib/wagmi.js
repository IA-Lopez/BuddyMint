import { getDefaultConfig } from '@rainbow-me/rainbowkit';

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


const etnTest = {
  id: 5201420,
  name: 'ETN Testnet',
  network: 'etn',
  iconBackground: '#fff',
  nativeCurrency: {
    name: 'ETN',
    symbol: 'ETN',
    decimals: 2,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/electroneum_testnet/'],
    },
    public: {
      http: ['https://rpc.ankr.com/electroneum_testnet/'],
    },
  },
  blockExplorers: {
    default: { name: 'ETN Testnet Explorer', url: 'https://blockexplorer.thesecurityteam.rocks' },
  },
};

// Configuración de RainbowKit
export const config = getDefaultConfig({
  appName: 'Buddy',
  projectId: '91e4298f4ed8aa463e3565e8116a943f',
  chains: [etn],
});
