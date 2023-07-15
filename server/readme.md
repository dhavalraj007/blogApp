# BlogApp

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

## Endpoints

postman collection: `BlogApp.postman_collection.json`

- [BlogApp](#blogapp)
  - [Endpoints](#endpoints)
  - [Users](#users)
    - [1. login](#1-login)
    - [2. Register User](#2-register-user)
    - [3. referesh token](#3-referesh-token)
    - [4. logout](#4-logout)
    - [5. get all users](#5-get-all-users)
  - [Blogs](#blogs)
    - [1. create blog](#1-create-blog)
    - [2. get all blogs](#2-get-all-blogs)
    - [3. update Blog](#3-update-blog)
    - [4. Get blog by id](#4-get-blog-by-id)
    - [5. Get blogs by user id](#5-get-blogs-by-user-id)
    - [6. delete blog](#6-delete-blog)

---

## Users

### 1. login

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: localhost:5000/user/login
```

**_Body:_**

```js
{
    "email":"rdjcoding@gmail.com",
    "password":"1234"
}
```

### 2. Register User

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: localhost:5000/user/register
```

**_Body:_**

```js
{
    "username":"dhaval",
    "email":"dhaval@gmail.com",
    "password":"12345567890"

}
```

### 3. referesh token

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: localhost:5000/user/refresh-token
```

**_Body:_**

```js
{
    "refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFjNGNjNWQzOTA5MGJiN2I2ZTNjYTMiLCJ1c2VybmFtZSI6IkRyaiIsImVtYWlsIjoicmRqY29kaW5nQGdtYWlsLmNvbSIsImlhdCI6MTY4OTA3NTI4N30.wK8d9EOdPDwjYeYNB2c9GD0mdXTFhLBCAt7gmd0I3mk"
}
```

### 4. logout

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: localhost:5000/user/logout
```

**_Body:_**

```js
{
    "refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFjNGNjNWQzOTA5MGJiN2I2ZTNjYTMiLCJ1c2VybmFtZSI6IkRyaiIsImVtYWlsIjoicmRqY29kaW5nQGdtYWlsLmNvbSIsImlhdCI6MTY4OTA3NTI4N30.wK8d9EOdPDwjYeYNB2c9GD0mdXTFhLBCAt7gmd0I3mk"
}
```

### 5. get all users

**_Endpoint:_**

```bash
Method: GET
Type: RAW
URL: localhost:5000/user/all-users
```

## Blogs

### 1. create blog

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: localhost:5000/blogs/create-blog
```

**_Body:_**

```js
{
    "title": "myy blog",
    "description": "my first blog ever",
    "image": "https://img.freepik.com/premium-photo/fantastic-view-kirkjufellsfoss-waterfall-near-kirkjufell-mountain-sunset_761071-868.jpg?w=2000",
    "user": "64aa7805106f4a7c9f418801"
}
```

### 2. get all blogs

**_Endpoint:_**

```bash
Method: GET
Type:
URL: localhost:5000/blogs/all-blogs
```

### 3. update Blog

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: localhost:5000/blogs/update-blog/64a3e438d0b15380ad2e4284
```

**_Body:_**

```js
{
    "title":"my first updated title"
}
```

### 4. Get blog by id

**_Endpoint:_**

```bash
Method: GET
Type:
URL: localhost:5000/blogs/blog/64a3e438d0b15380ad2e4284
```

### 5. Get blogs by user id

**_Endpoint:_**

```bash
Method: GET
Type:
URL: localhost:5000/blogs/user-blogs/64a3e40bd0b15380ad2e4280
```

### 6. delete blog

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: localhost:5000/blogs/delete-blog/64a3ec6a54d3c213414da32d
```

---

[Back to top](#blogapp)

> Generated at 2023-07-15 14:04:36 by [docgen](https://github.com/thedevsaddam/docgen)
