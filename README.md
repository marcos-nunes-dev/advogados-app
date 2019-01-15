# Documentação

## Sobre

Esse projeto usa [Preact](https://preactjs.com/) e [Preact-CLI](https://github.com/developit/preact-cli).


## Inicializando o Projeto

1. Tenha certeza que voce tenha [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) instalados.
2. É necessário instalar o preact-cli globalmente rodando o código a seguir:

```npm install -g preact-cli```

3. Instale as dependencias do projeto, caso contenha no repositorio clonado package-lock.json, delete o mesmo e a
pasta node_modules

    ```
    cd pasta/do/projeto; npm install
    ```

4. Inicie a aplicação

    ```
    npm start
    ```

### Rodando em Ambiente de Desenvolvimento

Basta rodar no terminal dentro da pasta do projeto:

```yarn start```

e começar a trabalhar no código.

### Build do Projeto (WEB)

Basta rodar no terminal dentro da pasta do projeto:

```yarn build```

e será gerado uma pasta `/www` dentro do projeto.
Essa pasta é a que deverá ser usada para atualizar o App e o PWA

### Build do Projeto (CORDOVA)

É necessário ter o Cordova pre instalado na maquina:

```npm install -g cordova```

A versão do cordova-android usada é a 6.2.3 por uma incompatibilidade gerada na sua ultima versão publicada. O Comando seguinte é pra preparar o projeto em Android:

```cordova platform add android@6.2.3```

Se estiver em ambiente windows e receber "Failed to fetch..." Adicione o seguinte path as variáveis de
ambiente:

```C:\Windows\System32```

Erro Current working directory is not a Cordova based project, digite o comando

```mkdir www```

E preparar o projeto ios:

```cordova platform add ios```

Para buildar uma versão de debug basta rodar:
```cordova build android```

Para buildar uma versão de release basta rodar:
```cordova build android --release```