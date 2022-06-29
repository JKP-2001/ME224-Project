<div align="center">

# Api Documentation (Company Side):
</div>

## Endpoints:-

### 1. RegisterCompany API
- For registering a company 
- URL for registration
  ```http
  POST /company/register
  ```
- Request body structure for registering user.

  | Parameter | Type | Required | Description | Default |
  | :--- | :--- | :--- | :--- | :---|
  | `email` | `string` | **true** | company email | - 
  | `password` | `string` | **true** | password | - 
  | `company_name` | `string` | **true** | company name | - 
  | `postal_address` | `string` | **true** | postal address of company | - 
  | `office_contact` | `string` | **true** | contact of office | -
  | `organization_type` | `string` | **true** | type of oraganization | -
  | `indrustry_sec` | `string` | **true** | indrusty section | - 
  | `F_email` | `string` | **true** | first point of contact email | - 
  | `F_name` | `string` | **true** | first point of contact name | - 
  | `F_altemail` | `string` | **false** | first point of contact alternate email | "" 
  | `F_contact` | `string` | **true** | first point of contact contact | - 
  | `S_email` | `string` | **true** | second point of contact email | - 
  | `S_name` | `string` | **true** | second point of contact name | - 
  | `S_altemail` | `string` | **false** | second point of contact alternate email | ""
  | `S_contact` | `string` | **true** | second point of contact contact | - 
  | `company_desc` | `string` | **false** | company desc in TEXT | ""
  | `Company_Desc` | `file` | **false** | company desc in **PDF** (**max 10MB**) and this will add to the DB as (**company_desc_path**) | ""



  

- Example Input (**If PDF Is Not Choosen)
  
    ![image](https://user-images.githubusercontent.com/84286157/176546111-0fcb9da8-e303-4f88-a508-03597dda4cdd.png)
    ![image](https://user-images.githubusercontent.com/84286157/176546132-54460e2f-684b-460b-9dea-3d45bf059d5b.png)


- Example Response on success **(status code 200)**
  ```javascript
  {
  "msg": "success",
  "url": ""
  }
  ```
- Example Input (**If PDF Is Not Choosen)
  
    ![image](https://user-images.githubusercontent.com/84286157/176546111-0fcb9da8-e303-4f88-a508-03597dda4cdd.png)|
    ![image](https://user-images.githubusercontent.com/84286157/176546840-233b1299-840e-45a5-b5e5-3a28bad685e5.png)

- Example Response on success **(status code 200)**
  ```javascript
  {
  "msg": "success",
  "url": "http://localhost:5000/uploads/company/2-48-53-30-6-2022-admit card.pdf"
  }
  ```

### User Model
- User Model

  | Parameter | Type | Required | Description | Default |
  | :--- | :--- | :--- | :--- | :--- |
  | `id` | `string` | **Required**| id (unique parameter) | - |
  | `name` | `string` | **Required**| User Name | - |
  | `email` | `string` | **Required**| User Email | - |
  | `password` | `string` | **Required**| User Password **(HASHED form)** | - |
  | `token` | `string` | **Required**| User Token **(JWT TOKEN)** | - |
  | `date` | `date` | **Required**| Creation Date | Date Accoriding To User Local Date |
  | `time` | `time` | **Not Required**| Creation Time | Time Corresponding To User Local Time |
  | `seckey` | `string` | **Required**| JWT SecretKey Of The User | - |
  | `social_account` | `boolean` | **Required**| Is Userd Registered From Socail Website | `false` |
  | `items_shared` | `array of object_id` | **Not Required**| Array Of item id shared by user | [ ] |
  | `followers` | `array of object_id` | **Not Required**| Array Of users id following the user | [ ] |
  | `follower_request` | `array of object_id` | **Not Required**| Array Of users id that request to follow the user | [ ] |
  | `followings` | `array of object_id` | **Not Required**| Array Of users id that the user follows | [ ] |
  | `img_address` | `string` | **Required**| User Porfile Image | /uploads/profile.png |
  | `bio` | `string` | **Not Required**| User Bio | "" |
  
  
- Example User
  ```javascript
  {
    "_id": "62a32de56c15b96ac5d370c9",
    "id": "hello_world@gmail.com",
    "name": "hello_world",
    "email": "hello_world@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9............",
    "date": "10-6-2022",
    "time": "16:41:42",
    "social_account": false,
    "items_shared": [
      "62a378ac6580bd6715e59b21"
    ],
    "followers": [],
    "follower_request": [],
    "followings": [],
    "img_address": "/uploads/profile.png",
    "bio": "",
    "__v": 0
  }
  ```



### 2. SetPassword For The Registered User.
- For setting the password of the user, **(Email Sent To The Mail-Id)**
- URL **(token is the parameter here, which is a jwt token generated using the data providing at the time of registeration)**
  ```http
  POST /api/auth/confirm-email/:token  
  ```
- Request body structure

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `password` | `string` | **Required**| password |

- Example Input
  ```javascript
  {
   "password": "hello_world"
  }

  ```
- Example Response on success **(status code 200)**
  ```javascript
  {
    msg:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....................
  }
  ```
- Remarks:
  - Here we get a response in which the key is **msg** and value is **A JWT Token**.


### 3. Login User
- For Loggin A Registered User.
- URL
  ```http
  POST /api/auth/loginuser
  ```
- Request body structure

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `email` | `string` | **Required**| email |
  | `password` | `string` | **Required**| password |

- Example Input
  ```javascript
  {
    email:hello_world@gmail.com,
    password: hello_world
  }
  ```
- Example Response on success **(status code 200)**
  ```javascript
  {
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......................
  }
  ```
- Example Response on Wrong Email Id **(Status Code 400)**
  ```javascript
    {
       msg: "Invalid Credentials" 
    }
  ```
  
  
- Example Response on Wrong Password **(Status Code 401)**
  ```javascript
    {
       msg: "Password Not Matched"
    }

- Remarks:
  - Here we get a response in which the key is **token** and value is **A JWT Token**.
  - Email Id Should be Valid, other wise **status code 404** occured.
    
    

### 4. Get User Detail 
- For getting a specific user detail.
- URL
  ```http
  GET /api/auth/getuser
  ```
- Request body structure

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `none` | `none` | | none |

- Example Input
  ```javascript
  {}
  ```
- Example Response on success **(Status code 200)**
  ```javascript
  {
    "_id": "62a32de56c15b96ac5d370c9",
    "id": "hello_world@gmail.com",
    "name": "hello_world",
    "email": "hello_world@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9............",
    "date": "10-6-2022",
    "time": "16:41:42",
    "social_account": false,
    "items_shared": [
      "62a378ac6580bd6715e59b21"
    ],
    "followers": [],
    "follower_request": [],
    "followings": [],
    "img_address": "/uploads/profile.png",
    "bio": "",
    "__v": 0
  }
  ```

- Example Response on wrong **JWT TOKEN** **(Status code 400)**
  ```javascript
  {msg:"User Not Found"}
  ```

- Remarks:
  - We have to the corresponding **JWT TOKEN** of the user in the **HEADER** as **auth-token**, for success.

### 5. Sending Mail To Reset User Password
- For resetting a registered user id, by sending a corresponding link through mail.
- URL
  ```http
  POST /api/auth/resetpassword/
  ```
- Request body structure (only these fields must be updated via this api)

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `email` | `string` | **Required**| Add the email id. |

- Example Input (**Staus Code 200**)
  ```javascript
    {
    "email":"johndoe@gmail.com"
    }

  ```
- Example Response on success
  ```javascript
  {
    msg:"Email Sent"
  }
  ```
  

- Example Input (**Staus Code 400**)
  ```javascript
    {
    "email":"johndoezx@gmail.com"
    }

  ```
- Example Response on success
  ```javascript
  {
    "msg": "User Not Existed"
  }
  ```


### 6. Reset User Password
- For resetting user password
- URL **(user id and corresponding jwt token are passed as parameter)**
  ```http
  PATCH /api/auth/resetpassword/:id/:token
  ```

- Example Input
  ```javascript
  {
    "password":"highfjdhs"
  }
  ```
- Example Response on success **(Status Code 200)**
  ```javascript
  {
    success: "Password Changed Successfully"
  }
  ```
  
- Example Response when link reused. **(Status Code 400)**
  ```javascript
  {
    error: "Link Expired" 
  }
  ```
  
- Remarks:
  - If the link usedat once, the link get expired.
  - If Password matched with previous ones, error with **status code 300** occured.
  
### 7. Update User Details/Profile.
- For updating user details/profile.
- URL
  ```http
  PUT /api/auth/editProfile
  ```
- Request body structure

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `name` | `string` | **Required**| Name Of The User. |
  | `bio` | `string` | **Not Required**| Bio of the user.|
  | `Image` | `file` | **Required**| User profile image. |

- Example Input
  ```javascript
  {
    "name":"JOHN_CENA.
    "Image":"/image/1.png"
  }
  ```
- Example Response on success **(Status Code 200)**
  ```javascript
  {
     "msg": "success" 
  }
  ```
  

- Example Response on Error
  ```javascript
  {
      "message":"Invalid Token"
  }
  ```
  
  
  
### 8. Get Logged In User Email.
- For fetching logged in user email id.
- URL
  ```http
  GET /api/auth/getemail
  ```
- Request body structure

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `none` | `none` | **none**| none |

- Example Input
  ```javascript
  {
  }
  ```
- Example Response on success **(Status Code 200)**
  ```javascript
  {
    "mail": "jklm@gmail.com"
  }
  ```


- Example Response on Error
  ```javascript
  {
      "message":"Invalid Token"
  }
  ```
  

- Remarks:
  - call this api when user logged in.
  
### 9. Request a user to follow.
- For sending follow request to a user. 
- URL
  ```http
  GET /api/auth/requestFollow
  ```
- Request body structure

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `email`| `string`| **Required** | Enter the email of user you want to follow |

- Example Input
  ```javascript
  {
    "email":"jklmnop@gmail.com"
  }
  ```
- Example Response on success
  ```javascript
  {
    "message": "Follow Request Sent"
  }
  ```
  

- Example Response on Error
  ```javascript
  {
      "message":"Invalid Token"
  }
  ```
  
 
- Remarks:
  - please note that the **email** enetered must be correct.
  
  
### 10. Get Items Shared By User.
- For getting items shared by user 
- URL
  ```http
  GET /api/auth/getshareditems
  ```
- Request body structure

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `none` | `none` | | none |

- Example Input
  ```javascript
  {}
  ```
- Example Response on success
  ```javascript
  [
  {
    "_id": "62a377346580bd6715e59a53",
    "name": "lkjklfjl",
    "description": "Paklnfklfn",
    "tag": "#Pkljlkf",
    "creation_date": "10-6-2022",
    "creation_time": "16:54:12",
    "img_address": "uploads/16-54-12-10-6-2022-pa.jpg",
    "creator": "lknfkljnfknfk",
    "creatorMail": "xx@gmail.com",
    "getFull": "6 10, 2022 16:54:12",
    "liked_by": [
      "xx@gmail.com",
      "zxx@gmail.com",
      "xdddx@gmail.com"
    ],
    "shared_by": [],
    "comments": [
      {
        "user_name": "xx@gmail.com",
        "message": "llfjlkdjl",
        "time": "16:54:39",
        "date": "10-6-2022",
        "_id": "62a3774f6580bd6715e59a62"
      },
      {
        "user_name": "xxdd@gmail.com",
        "message": "l;fmklf",
        "time": "16:55:51",
        "date": "10-6-2022",
        "_id": "62a377976580bd6715e59a82"
      },
      {
        "user_name": "lkfjhlkfjkljfkl",
        "message": "😠",
        "time": "16:56:0",
        "date": "10-6-2022",
        "_id": "62a377a06580bd6715e59a8a"
      },
    ],
    "__v": 0
  },
  {
    "_id": "62a377346580bd6715e59a53",
    "name": "lkjklfjl",
    "description": "Paklnfklfn",
    "tag": "#Pkljlkf",
    "creation_date": "10-6-2022",
    "creation_time": "16:54:12",
    "img_address": "uploads/16-54-12-10-6-2022-pa.jpg",
    "creator": "lknfkljnfknfk",
    "creatorMail": "xx@gmail.com",
    "getFull": "6 10, 2022 16:54:12",
    "liked_by": [
      "xx@gmail.com",
      "zxx@gmail.com",
      "xdddx@gmail.com"
    ],
    "shared_by": [],
    "comments": [
      {
        "user_name": "xx@gmail.com",
        "message": "llfjlkdjl",
        "time": "16:54:39",
        "date": "10-6-2022",
        "_id": "62a3774f6580bd6715e59a62"
      },
      {
        "user_name": "xxdd@gmail.com",
        "message": "l;fmklf",
        "time": "16:55:51",
        "date": "10-6-2022",
        "_id": "62a377976580bd6715e59a82"
      },
      {
        "user_name": "lkfjhlkfjkljfkl",
        "message": "😠",
        "time": "16:56:0",
        "date": "10-6-2022",
        "_id": "62a377a06580bd6715e59a8a"
      },
    ],
    "__v": 0
  }]
  ```
  

- Example Response on Error
  ```javascript
  {
      "message":"Invalid Token"
  }
  ```



### 11. Get User Followers List.
- For Listing all the users that follow the logged in user.
- URL
  ```http
  GET /api/auth/getUserFriend
  ```
- Request body structure

  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `none` | `none` |  | none |

- Example Input
  ```javascript
  {}
  ```
- Example Response on success and 0 followers found
  ```javascript
  []
  ```
- Example Response on success and some followes found
  ```javascript
  [
      {freind 1},
      {freind 2},
      {freind 3}
  ]
  ```
- Example Response on Error
  ```javascript
  {
      "message":"Invalid Token"
  }
  ```
