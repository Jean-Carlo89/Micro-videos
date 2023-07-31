/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    // All imported modules in your tests should be mocked automatically
    // automock: false,

    displayName: {
        name: 'nestjs',
        color: 'magentaBright',
    },

    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\..*spec\\.ts$',
    // transform: {
    //     '^.+\\.(t|j)s$': 'ts-jest',
    // },

    transform: {
        '^.+\\.(t|j)s$': '@swc/jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    // coverageProvider: 'v8',
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        'core\\-micro\\-videos/(.*)$':
            '<rootDir>/../../../node_modules/core-micro-videos/dist/$1',
        // //'#seedwork/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/@seedwork/domain/index.js',
        // //TODO - vamos ver depois
        // '#seedwork/(.*)$':
        //     '<rootDir>/../../../node_modules/@fc/micro-videos/dist/@seedwork/$1',
        // //'#category/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/category/domain/index.js',
        // //vamos ver mais tarde se é necessário
        // //TODO - vamos ver depois
        // '#category/(.*)$':
        //     '<rootDir>/../../../node_modules/@fc/micro-videos/dist/category/$1',
    },
};
