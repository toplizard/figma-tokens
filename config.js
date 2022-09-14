const StyleDictionary = require('style-dictionary');
const tokens = require('./tokens');
// const fs = require('fs');
// Object.values(Object.keys(tokens)).map((directory) => {
//   !directory.includes('$') ? fs.mkdirSync(`tokens/${directory}`) : null;
// });

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    'esm/category': {
      buildPath: 'tokens/',
      transforms: ['attribute/cti', 'name/cti/camel', 'size/px', 'color/hex'],
      files: tokens.map((tokenCategory) => ({
        destination: `${tokenCategory}/${tokenCategory}.js`,
        format: 'javascript/es6',
        filter: {
          attributes: {
            category: tokenCategory,
          },
        },
      })),
    },
    'esm/index': {
      buildPath: 'tokens/js/esm/',
      transforms: ['attribute/cti', 'name/cti/camel', 'size/px', 'color/hex'],
      files: [
        {
          destination: `index.js`,
          format: 'javascript/es6',
        },
      ],
    },
    'cjs/category': {
      buildPath: 'tokens/js/cjs/',
      transforms: ['attribute/cti', 'name/cti/camel', 'size/px', 'color/hex'],
      files: tokens.map((tokenCategory) => ({
        destination: `${tokenCategory}.js`,
        format: 'custom/cjsmodule',
        filter: {
          attributes: {
            category: tokenCategory,
          },
        },
      })),
    },
    'cjs/index': {
      buildPath: 'tokens/js/cjs/',
      transforms: ['attribute/cti', 'name/cti/camel', 'size/px', 'color/hex'],
      files: [
        {
          destination: `index.js`,
          format: 'custom/cjsmodule',
        },
      ],
    },

    // Web output in scss format
    scss: {
      transformGroup: 'scss',
      buildPath: `tokens/scss/`,
      files: [
        {
          destination: `tokens.scss`,
          format: 'scss/variables',
        },
      ],
    },
    // Web output in scss partialformat
    'scss/category': {
      transformGroup: 'scss',
      buildPath: `tokens/scss/`,
      files: tokens.map((tokenCategory) => ({
        destination: `${tokenCategory}.scss`,
        format: 'scss/variables',
        filter: {
          attributes: {
            category: tokenCategory,
          },
        },
      })),
    },
  },
};

StyleDictionary.registerFormat({
  name: 'custom/cjsmodule',
  formatter: function ({ dictionary }) {
    return `module.exports = {${dictionary.allTokens.map(
      (token) => `\n\t${token.name}: "${token.value}"`
    )}\n};`;
  },
});
