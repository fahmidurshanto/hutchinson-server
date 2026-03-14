# API Routes Overview

**Base URL:** `http://localhost:4000/api/v1`  
**Authentication:** HTTP‑only cookies (`accessToken`, `refreshToken`). Include credentials (`credentials: 'include'` or `withCredentials: true`).

| Route                          | Method | Authentication | Request Body / Params                                                                                             |
|--------------------------------|--------|----------------|-------------------------------------------------------------------------------------------------------------------|
| `/auth/user/register`           | POST   | Admin | `{ firstName, lastName, Phone, gender, email, nric, address, nationality, password }`                    |
| `/auth/admin/changepassword`    | POST   | Admin | `{ newPassword, oldPassword}`                    |
| `/auth/user/changepassword`     | POST   | Admin | `{ newPassword, userId}`                    |
| `/auth/login`                   | POST   | Public         | `{ email, password }`                                                                                             |
| `/auth/logout`                  | GET    | User            | None                                                                                                              |
| `/auth/me`                      | GET    | User            | None                                                                                                              |
| `/investment/create`            | POST   | User            | `{ name, year, amount, user }`                                                                                    |
| `/investment/validity`          | POST   | User            | `{ valid, investmentId }`                                                                                          |
| `/investment/get`                | GET    | User            | **Body:** `{ userId }`<br>**Query (optional):** `?year=YYYY`                                                       |
| `/investment/get/:investmentId` | GET    | User            | **URL param:** `investmentId` (e.g., `/get/69b45e578b7778cbef9b8970`) – no body                                   |

**Note:** All protected routes require the client to send cookies. The backend automatically refreshes the access token when expired.