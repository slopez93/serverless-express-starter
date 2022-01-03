module.exports = {
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '.*\\.test.(ts|tsx|js)',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
