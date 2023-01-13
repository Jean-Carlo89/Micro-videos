Admin do catalogo de vídeos
Em vez de usar ts ou babel pra compilar typescript usamos o swc da vercel nos testes

npm install @swc/core @swc/jest -D

no jest.config
transform: {
"^.+\\.ts?$": ["@swc/jest"],
},

testRegex: ".*\\..*spec\\.ts$",

setName => nao indica o que quer ser feito

## Npm run test archive_name -> roda aepnas os testes do arquivo

## Npm run test -- -option

- ## npm run test -- -t "Unique entity id test" archive_name -> Roda somente os testes com a tring do arquivo especificado

- ## npm run test -- -t "Unique entity id test" archive_name --watch ->
