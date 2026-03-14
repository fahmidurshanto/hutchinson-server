**Base URL:** `http://localhost:4000/api/v1`

**Route:** `/auth/me`  
**Method** `GET`  
**Response** {
"success": true,
"user": {
"id": "69b2fe0f9f780f4730036dc5",
"firstName": "Palak",
"lastName": "Basak",
"email": "palak1@gmail.com",
"role": "admin",
"iat": 1773514401,
"exp": 1773515301
}
}

**Route:** `/investment/get/69b47a926476d4c1c33c483a`
**Method** `GET`  
**Response** {
"success": true,
"investment": {
"\_id": "69b47a926476d4c1c33c483a",
"name": "test1 Investment",
"year": 2026,
"amount": 0,
"isValid": true,
"user": "69b2f9bb08c63d8e441fc9a6",
"createdAt": "2026-03-13T20:58:58.168Z",
"updatedAt": "2026-03-13T20:58:58.168Z",
"\_\_v": 0
}
}

**Route:** `investment/get?year=2027`
**Method** `GET`
**Body** `{  "userId":"69b2f9bb08c63d8e441fc9a6"}`  
**Response** {
"success": true,
"investments": [
{
"_id": "69b47ac06476d4c1c33c483d",
"name": "test2 Investment",
"year": 2027,
"amount": 200,
"isValid": true,
"user": "69b2f9bb08c63d8e441fc9a6",
"createdAt": "2026-03-13T20:59:44.165Z",
"updatedAt": "2026-03-13T20:59:44.165Z",
"__v": 0
}
]
}

**Route:** `/investment/create`
**Method** `POST`
**Body** `{  "name":"test2 Investment",  "year": 2027,  "amount": 200,  "user":"69b2f9bb08c63d8e441fc9a6"}`  
**Response**{
"success": true,
"message": "Investment Created",
"investment": {
"name": "test2 Investment",
"year": 2027,
"amount": 200,
"isValid": true,
"user": "69b2f9bb08c63d8e441fc9a6",
"\_id": "69b5b00bbda6b6e488816b39",
"createdAt": "2026-03-14T18:59:23.189Z",
"updatedAt": "2026-03-14T18:59:23.189Z",
"\_\_v": 0
}
}

**Route:** `/investment/validity`
**Method** `POST`
**Body** `{    "valid":false,   "investmentId":"69b5c9bb43096c3836a118f0"}`  
**Response**{
"success": true,
"message": "Investment Created",
"investment": {
"name": "test2 Investment",
"year": 2027,
"amount": 200,
"isValid": true,
"user": "69b5b9ae880c493a71ca62dc",
"\_id": "69b5c9bb43096c3836a118f0",
"createdAt": "2026-03-14T20:48:59.015Z",
"updatedAt": "2026-03-14T20:48:59.015Z",
"\_\_v": 0
}
}

**Route:** `/admin/changepassword`
**Method** `POST`
**Body** `{
  "oldPassword": "123456",
  "newPassword": "12345678"
}
`  
**Response** {
"success": true,
"message": "Password changed successfully"
}

**Route:** `/auth/user/changepassword`
**Method** `POST`
**Body** `{
  "userId": "69b5bc28f968882568b25ce7",
  "newPassword": "123456"
}
`  
**Response** {
"success": true,
"message": "Password changed successfully"
}
