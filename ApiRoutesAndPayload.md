# API Routes Overview

**Base URL:** `http://localhost:4000/api/v1`  
**Authentication:** HTTP‑only cookies (`accessToken`, `refreshToken`). Include credentials (`credentials: 'include'` or `withCredentials: true`).

| Route                          | Method | Authentication | Request Body / Params                                                                                             |
|--------------------------------|--------|----------------|-------------------------------------------------------------------------------------------------------------------|
| `/auth/user/register`           | POST   | Admin | `{ firstName, lastName, Phone, gender, email, nric, address, nationality, password }`                    |
| `/auth/admin/changepassword`    | POST   | Admin | `{ "oldPassword": "123456", "newPassword": "12345678" }`                    |
| `/auth/user/changepassword`     | POST   | Admin | `{ "userId": "69b5bc28f968882568b25ce7", "newPassword": "123456" }`                    |
| `/auth/login`                   | POST   | Public         | `{ "email": "palak1@gmail.com", "password": 12345678 }`                                                                                             |
| `/auth/logout`                  | GET    | User            | None                                                                                                              |
| `/auth/me`                      | GET    | User            | None                                                                                                              |
| `/investment/create`            | POST   | User            | `{ "name": "test2 Investment", "year": 2027, "amount": 200, "user": "69b2f9bb08c63d8e441fc9a6" }`                                                                                    |
| `/investment/validity`          | POST   | User            | `{ "valid": false, "investmentId": "69b5c9bb43096c3836a118f0" }`                                                                                          |
| `/investment/get`                | GET    | User            | **Body:** `{ "userId": "69b2f9bb08c63d8e441fc9a6" }`<br>**Query (optional):** `?year=2027`                                                       |
| `/investment/get/:investmentId` | GET    | User            | **URL param:** `investmentId` (e.g., `/get/69b47a926476d4c1c33c483a`) – no body                                   |
| `/document/upload` | POST | User | **Multipart:** `{ "file": (File), "userId": "69b2f9..." }` |
| `/document/delete/:id` | DELETE | Admin | **URL param:** `id` (e.g., `/delete/69b5d8...`) – no body |

**Note:** All protected routes require the client to send cookies. The backend automatically refreshes the access token when expired.