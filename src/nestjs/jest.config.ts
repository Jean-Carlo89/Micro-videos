export default {
    displayName: {
        name: 'nestjs',
        color: 'magentaBright',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\..*spec\\.ts$',
    // transform: {
    //     '^.+\\.(t|j)s$': '@swc/jest',
    // },

    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageProvider: 'v8',
    coverageDirectory: '../__coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        'core-micro-videos/(.*)$': `<rootDir>/../../../node_modules/core-micro-videos/dist/$1`,
        // '@fc/micro\\-videos/(.*)$': `${fc_micro_videos_path}/$1`,
        // //'#seedwork/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/@seedwork/domain/index.js',
        // //TODO - vamos ver depois
        // '#seedwork/(.*)$': `${fc_micro_videos_path}/@seedwork/$1`,
        // //'#category/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/category/domain/index.js',
        // //vamos ver mais tarde se é necessário
        // //TODO - vamos ver depois
        // '#category/(.*)$': `${fc_micro_videos_path}/category/$1`,
        // '#cast-member/(.*)$': `${fc_micro_videos_path}/cast-member/$1`,
    },
};
