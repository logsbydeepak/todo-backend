# CREATE TODO

- **URL**

`POST /v1/todo`

`AUTHENTICATION`

- **URL Params**

  None

- **Data Params**

```json
{
  "task": "task 1",
  "status": true
}
```

**Value:**

**status:** `true` or `false`

- **Success Response:**

  - **Code:** 201

    **Content:**

    ```json
    {
      "data": {
        "id": "61c9d2c3df3feac98cf40180",
        "task": "task 1",
        "status": true
      }
    }
    ```
