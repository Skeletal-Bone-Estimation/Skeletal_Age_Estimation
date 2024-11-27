import type {Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    verbose: true,
    //automock: true //possibly helpful?
}

export default config;