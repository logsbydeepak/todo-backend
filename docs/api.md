# Documentation

### Error Response Structure

```json
{
  "error": {
    "title": "BODY_PARSE",
    "message": "cannot parse body",
    "statusCode": "400"
  }
}
```

### Success Response Structure

```json
{
  "data": {
    ...
  }
}
```

All error response data [**error.data.json**](/src/response/data/error.data.json)

## AUTHORIZATION Cookie Paths

1. access token - `v1/`
1. refresh token - `v1/refresh/`

## User Router

[**CREATE USER**](/docs/user/create.user.md) - SignUp<br/>
[**READ USER**](/docs/user/read.user.md)<br/>
[**UPDATE USER**](/docs/user/update.user.md)<br/>
[**DELETE USER**](/docs/user/delete.user.md)<br/>

## Todo Router

[**CREATE TODO**](/docs/todo/create.todo.md) <br/>
[**READ TODO**](/docs/todo/read.todo.md) <br/>
[**UPDATE TODO**](/docs/todo/update.todo.md) <br/>
[**DELETE TODO**](/docs/todo/delete.todo.md) <br/>

## Session Router

[**CREATE SESSION**](/docs/session/create.session.md) - SignIn<br/>
[**UPDATE SESSION**](/docs/session/update.session.md) - Refresh Token<br/>
[**DELETE SESSION**](/docs/session/delete.session.md) - Logout<br/>
[**DELETE ALL SESSION**](/docs/session/deleteAll.session.md) - Logout all<br/>
