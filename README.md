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
```

`optional` 5 and 6 step

4.  remove `node_modules`

```bin
rm -rf node_modules
```

or remove manually

5. install production package

```bin
npm install --production
```

6. start

```bin
npm run prod
```

### With `Docker`

1. Build image

```bash
docker build -t [REPOSITORY]:[TAG] -f docker/prod/Dockerfile .

# example
docker build -t todo-api-prod:v1 -f docker/prod/Dockerfile .
```

2. Run image

```bash
# with env file
docker run --detach --env-file [env file path] -p [HOST PORT]:[CONTAINER PORT] [IMAGE]

# example
docker run --detach --env-file ./prod.env -p [HOST PORT]:[CONTAINER PORT] todo-api-prod:v1

# set env manually
docker run --detach \
-e KEY=VALUE \
-e KEY=VALUE \
-p [HOST PORT]:[CONTAINER PORT] \
[IMAGE]
```
