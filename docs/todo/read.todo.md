# READ TODO

- **URL**

  `GET /v1/todo` <br/>
  `AUTHENTICATION`

- **URL Params**

  **Required:** <br/>
  `skip="0"` <br/>
  `limit="2"` <br/>
  `status="false"`

  **Value:** <br/>
  **skip:** `integer value` <br/>
  **limit:** `integer value` or `0` to get all the todo <br/>
  **status:** `true` or `false`

- **Data Params** <br/>
  None

- **Success Response:**

  - **Code:** 200 <br/>
    **Content:**:

    ```json
    {
      "data": {
        [
          {
            "id": "61c9d2c3df3feac98cf40180",
            "task": "task 1",
            "status": true
          },
          {
            "id": "61c9d2cbdf3feac98cf40188",
            "task": "task 3",
            "status": true
          }
        ]
      }
    }
    ```
