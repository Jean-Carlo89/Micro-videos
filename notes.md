Em vez de usar ts ou babel pra compilar typescript usamos o swc da vercel nos testes

npm install @swc/core @swc/jest -D

no jest.config
transform: {
"^.+\\.ts?$": ["@swc/jest"],
},

testRegex: ".*\\..*spec\\.ts$",
