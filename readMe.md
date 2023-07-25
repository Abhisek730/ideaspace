# Development Guide

## Getting Started (Ehh - CLI)

- Using Cli : Use Can create a new project in ehh using ehh-cli command line tool.

  - Pre-Requistics :
    ```
    nodejs : version 16.20.0 and higher
    npm : 8.19.4
    Mongo DB Connection URI
    mySQL Connection Config

          Html,Css,Js Basic - Knowledge
    ```
  - Features :
    ```
    1. Create a full stack application through ehh.js
    ```
### How To Use

#### Step 1

```
  install node js & npm
```

#### Step 2

```
   npm i -g ehh-cli
```

#### Step 4

```
   ehh-cli create-app qrse
```

#### Step 4

```
    cd qrse
```

#### Step 5

```
    npm i
```

#### Step 6

---

    update /userConfig/userServerConfig
    modify mongoDB Connection String
    modify SQL Connection

---

#### Step 7

```
    npm run build
```

#### Step 8

```
    npm run dev-app
```

#### Step 9

```
    npm run dev-app-client
```


### How To Extend