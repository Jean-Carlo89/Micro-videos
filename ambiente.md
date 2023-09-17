## 1 - npm init -y


## 2 -  npm install typescript -d


## 3 - npx tsc --init


## 4 -  npm install jest @types/jest -D


## 5 - npm install @swc/core @swc/cli @swc/jest -D


## 6 - npx jest --init

## 7  In jest.cofig.ts

```

//* for ts-jest as compiles for test (babel)
  // transform: {
  //   "^.+\\.ts?$": ["ts-jest"],
  // },

  //* for swc as compiler for tests

  transform: {
    "^.+\\.ts?$": "@swc/jest",
  },
```

## 8 - npm i ts-node -D

## 9    rootDir: "./src",  in jest.config.ts