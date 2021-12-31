# Todo Backend

TODO REST API

It is a personal project

### Clone project

```bash
git clone https://github.com/logsbydeepak/todo-backend
```

### Project requirement

- [Node](https://nodejs.org/)
- [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/) / [MongoDB Atlas Account](https://www.mongodb.com/atlas/database)

## RUN in `development`

1. create `dev.env` file with the properties as follows

```
API_PORT
DB_URL
DB_LOG_URL
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
ENCRYPT_SECRET
```

`sample value`

```
API_PORT=4000
DB_URL=mongodb://localhost:27017/todo
DB_LOG_URL=mongodb://localhost:27017/todo-logs
ACCESS_TOKEN_SECRET=B9xSfjmzuChskF8RkzXpJQXkWKCwvCTGB2atamCfNKxK2gcbF
REFRESH_TOKEN_SECRET=B9xSfjmzuChskF8RkzXpJQXkWKCwvCTGB2atamCfNKxK2gcbF
ENCRYPT_SECRET=B9xSfjmzuChskF8RkzXpJQXkWKCwvCTGB2atamCfNKxK2gcbF
```

2. install package

```bash
npm install
```

3. start

```bash
npm run dev
```

## RUN in `production`

1. set all the env property in system
2. install package

```bin
npm install
```

3. build the project

```bin
npm run build
````

4. start

```bash
npm run prod
```

`optional` after building project

5.  remove `node_modules`

```bin
rm -rf node_modules
```

or remove manually

6. install production package

```bin
npm install --production
```

7. start

```bin
npm run prod
```
