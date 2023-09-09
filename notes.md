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




# ----- 5

Usar feraramenta para gera indexes.ts

npm install create-ts-index -D

gera um shell script (cti.sh)
chmod +x cti.sh

 "cti": "cti",
        "cti:core-micro-videos ": "sh ./cti.sh"



# ---------------- npm Worksapces

- Ferramenta para gerenciar projeto com multiplos projetos/pacotes (Monorepo)

 "workspaces": [
        "./src/core-micro-videos ",
        "./src/nestjs"
    ],

## Como instalar separadamente por projeto?

ex: apenas no pasta core-micro-videos 

npm i axios --worskpace (-w) nome_dentro_do_package_json

## Serve para comands tambem

ex: apenas no pasta core-micro-videos 

npm run command -w nome_dentro_do_package_json

ex2: rodars em todos os projetos

npm run test --workspaces

## Organizando config de typescript

criar na raiz um tsconfig.base.json



# ------------ Para o nest conseguir importar as camadas do core, adiconar o codigo abaixo no package.json do core

"exports": {
        "./shared/application": "./dist/shared/application/index.js",
        "./shared/domain": "./dist/shared/domain/index.js",
        "./shared/infra": "./dist/shared/infra/index.js",
        "./category/application": "./dist/category/application/index.js",
        "./category/domain": "./dist/category/domain/index.js",
        "./category/infra": "./dist/category/infra/index.js"
    },


## para fazer o ts entender : 

 "typesVersions": {
        ">=4.0": {
            "category/domain": [
                "./dist/category/domain/index.d.ts"
            ]
        }
    },
-----------

## export de namespace nao funciona com swc, tem que por config adicional

## Diferenca entre & simples e &&

-> comand 1  &  command 2  rodam em paralelo

-> comand 1  &&  command 2  rodam em sequencia


# Jest personalized config

in jest.configts of each project we can use 

 displayName: {
        name: 'nestjs',
        color: 'magentaBright',
    },