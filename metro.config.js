const {getDefaultConfig} = require('metro-config');

module.exports = async () => {
  const defaultConfig = await getDefaultConfig();
  const {assetExts} = defaultConfig.resolver;
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: [...assetExts, 'bin'],
    },
  };
};

// module.exports = async () => {
//   const defaultConfig = await getDefaultConfig();
//   const {assetExts} = defaultConfig.resolver;
//   return {
//     resolver: {
//       assetExts: [...assetExts, 'bin'],
//     },
//   };
// };

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };
