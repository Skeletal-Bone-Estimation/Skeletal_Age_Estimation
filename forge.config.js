// forge.config.js
const path = require('path');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const isMac = process.platform === 'darwin';

module.exports = {
  buildDirectory: 'out',
  name: 'Skeletage',
  
  icon: isMac 
    ? path.resolve(__dirname, 'static', 'images', 'Skeletage_Logo_2025.icns')
    : path.resolve(__dirname, 'static', 'images', 'Skeletage_Logo_2025.ico'),
  packagerConfig: {
    asar: {
      unpack: '{static/**,server.exe,models/**}',
    },
    icon: isMac 
      ? path.resolve(__dirname, 'static', 'images', 'Skeletage_Logo_2025.icns')
      : path.resolve(__dirname, 'static', 'images', 'Skeletage_Logo_2025.ico'),
    extraResource: [
      path.resolve(__dirname, 'src', 'ml', 'models'),
      path.resolve(__dirname, 'src', 'ml', 'dist', isMac ? 'server' : 'server.exe'),
      path.resolve(__dirname, 'static')
    ],
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Skeletage',
        
        setupIcon: path.resolve(__dirname, 'static', 'images', 'Skeletage_Logo_2025.ico'),
      
        iconUrl: path.resolve(__dirname, 'static', 'images', 'Skeletage_Logo_2025.ico'),
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'Skeletage',
        format: 'ULFO',
       
        icon: path.resolve(__dirname, 'static', 'images', 'Skeletage_Logo_2025.icns'),
      }
    },
    {
      name: '@electron-forge/maker-zip', // fallback for unsigned builds
      platforms: ['darwin'],
    }
  ],
  plugins: [
    { name: '@electron-forge/plugin-auto-unpack-natives', config: {} },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};