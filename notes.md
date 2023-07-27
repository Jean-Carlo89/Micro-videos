DDD - divisao de pastas

normalmente é algo do tipo application, domain, infra no mesmo nivel

- recomendacao de método modular

# - > Jest

instalando swc para compilar os testes mais rapido

compilador da vercel

npm i @swc/core @swc/jest -D

- in jest config

transform: {
"^.+\\.ts?$": ["@swc/jest"],
},

# Decorators in test -swc

In Tsconfig.json there is a flag of experimental decorators that will be necessary for the class validator.

It wont be enought for tests with swc. to make it understand it:

1- create .swcrc file like this:

{
"jsc": {
"parser": {
"syntax": "typescript",
"decorators": true
}
}
}




-----

Usar feraramenta para gera indexes.ts

npm install create-ts-index -D

gera um shell script (cti.sh)
chmod +x cti.sh

 "cti": "cti",
        "cti:@core": "sh ./cti.sh"