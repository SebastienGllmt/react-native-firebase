const { resolve, join } = require('path');
const { createBlacklist } = require('metro');
const { mergeConfig } = require('metro-config');
const { DEFAULT } = require('react-native/local-cli/util/Config');


const config = {
  projectRoot: __dirname,
  resolver: {
    resolverMainFields: ['testsMain', 'browser', 'main'],
    blackListRE: createBlacklist([
      new RegExp(`^${escape(resolve(__dirname, '..', 'docs'))}\\/.*$`),
      new RegExp(`^${escape(resolve(__dirname, '..', 'tests/node_modules'))}\\/.*$`),
      new RegExp(`^${escape(resolve(__dirname, '..', 'packages/tooling'))}\\/.*$`),
      new RegExp(`^${escape(resolve(__dirname, '..', 'tests/android'))}\\/.*$`),
      new RegExp(`^${escape(resolve(__dirname, '..', 'tests/ios'))}\\/.*$`),
      new RegExp(`^${escape(resolve(__dirname, '..', 'tests/e2e'))}\\/.*$`),
      new RegExp(`^${escape(resolve(__dirname, '..', 'tests/functions'))}\\/.*$`),
    ]),
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          if (name === 'react-native-firebase') {
            return join(__dirname, `../packages/firebase/app/src`);
          }

          if (name.startsWith('@react-native-firebase')) {
            // TODO
            return join(__dirname, `../src`);
          }

          // console.log(name, join(__dirname, '..', `node_modules/${name}`));

          return join(__dirname, '..', `node_modules/${name}`);
        },
      }
    ),
    platforms: ['android', 'ios'],
  },
  watchFolders: [
    resolve(__dirname, '..'),
    resolve(__dirname, '../packages/firebase/app/src'),
    // resolve(__dirname, '../packages/firebase/analytics/src'),
  ],
};

module.exports = mergeConfig(DEFAULT, config);
