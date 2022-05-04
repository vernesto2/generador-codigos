# SIVET WEB API Documentation v.1.0.0

Basic API Documentation

## Installation and Run Dev

1. Run `npm install` command to install packages.
2. Setup database settings inside `ormconfig.json` file.
3. Run `npm run dev` command.

## Get model from database with TypeORM
1. Run `typeorm-model-generator -h localhost -p 3306 -d DBNAME -u root -x PASS -e mysql -o DBNAME-entities`
2. Replace connection info if you want.

## Generate API Documentation

1. If you only want generate API Documentation skip to step 5
2. Setup ApiDoc settings inside `apidoc.json` file
3. Add API Notation on your source code (Go to [APIDOC](https://apidocjs.com/) for examples and documentation).
4. If want versioning API Notation, We recommend put the old notation on `_apidoc.js` into `src` folder (create file if it doesn't exist)
5. Open terminal and run `apidoc -i src/controllers/ -o apidoc/` to generate the documentation code.
6. Go to `apidoc` folder and youre find the `index.html` file (This folder can be published anywhere with or without server).