# Todo Backend

TODO REST API </br>
It is a personal project

### **[LIVE DEMO](https://todo-backend-project-prod.herokuapp.com/v1/)**

### **[API Documentation](docs/api.md)**

### Clone project

```bash
git clone https://github.com/logsbydeepak/todo-backend
```

## Table of contents

- **[Project requirement](#project-requirement)**
- **[Run in development](#run-in-development)**
  - [With Docker Compose](#with-docker-compose)
  - [With devcontainer](#with-devcontainer)
- **[Run in production](#run-in-production)**
  - [With Docker](#with-docker)

### Project requirement

- [Node](https://nodejs.org/)
- [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/) / [MongoDB Atlas Account](https://www.mongodb.com/atlas/database)

### Run in `development`

1. create `dev.env` file with the properties as follows

```
PORT
DB_URL
DB_LOG_URL
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
ENCRYPT_SECRET
ALLOW_ORIGIN
```

`sample value`

```
PORT=4000
DB_URL=mongodb://mongo_container:27017/todo
DB_LOG_URL=mongodb://mongo_container:27017/todo-logs
ACCESS_TOKEN_SECRET=B9xSfjmzuChskF8RkzXpJQXkWKCwvCTGB2atamCfNKxK2gcbF
REFRESH_TOKEN_SECRET=B9xSfjmzuChskF8RkzXpJQXkWKCwvCTGB2atamCfNKxK2gcbF
ENCRYPT_SECRET=B9xSfjmzuChskF8RkzXpJQXkWKCwvCTGB2atamCfNKxK2gcbF
ALLOW_ORIGIN=http://localhost:3000
```

2. install package

```bash
npm install
```

3. start

```bash
npm run dev
```

API will start at http://localhost:4000

### With `Docker Compose`

step 1 is `optional`

1. run docker compose

```bash
docker-compose -p todo_dev_backend -f docker/dev/docker-compose.yml up -d
```

2. attach to container

```bash
docker exec -it todo_dev_backend_api /bin/sh
```

By default Port number 4000 of host and container is opened and port 8888 for mongo express.

MongoDB connection url inside container `mongodb://todo_dev_backend_mongo_container:27017`. Use this in [dev.env](#run-in-development). And `mongodb://localhost:27017` in host.

3. **[Run](#run)**

## With `devcontainer`

1. [Installation](https://code.visualstudio.com/docs/remote/containers#_installation)

2. **[Run](#run)**

## RUN in `production`

1. set all the [env](#run-in-development) property in system
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
npm run start
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
