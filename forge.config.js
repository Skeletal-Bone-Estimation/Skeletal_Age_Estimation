const path = require('path');
const { execSync } = require('child_process');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  buildDirectory: 'out',

  packagerConfig: {
    asar: { unpack: 'python/**' },
    extraResources: [
      {
        from: path.resolve(__dirname, 'src', 'ml', 'dist', 'server.exe'),
        to: 'python',
      },
    ]
  },
  makers: [
    { name: '@electron-forge/maker-squirrel', config: { name: 'skeletal_age_app' } },
    /* … other makers … */
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
