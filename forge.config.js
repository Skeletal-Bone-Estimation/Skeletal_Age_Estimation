// forge.config.js
const path = require('path');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  buildDirectory: 'out',

  packagerConfig: {
    // 2) Pack into an asar, but UNPACK python exe & static so they're real folders on disk
    asar: {
      unpack: '{static/**,server.exe}'
    },

    // 3) Copy your python exe into resources/python
    extraResource: [
      path.resolve(__dirname, 'src', 'ml', 'dist', 'server.exe'), 
      path.resolve(__dirname, 'static')
    ],
  },

  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: { name: 'skeletal_age_app' }
    },
    // … your other makers
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