//make cross-fetch calls work in tests
require('whatwg-fetch');
const fs = require('node:fs');

// stub for config.ts to avoid `import.meta.*` errors
jest.mock('./src/config', () => {
  return {
    env: {}
  }
});

if (fs.existsSync('./src/core/security/oidcConfig.ts')) {
  jest.mock('./src/core/security/oidcConfig.ts', () => {
    return {
      env: {}
    }
  });
}

// do not load graphql schema (src/core/schema/schema.graphqls) in tests
jest.mock('./src/core/schema/util/getGraphQLSchema', () => {
  return {
    getGraphQLSchema: () => {}
  }
});