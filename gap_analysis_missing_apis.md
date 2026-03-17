# API Gap Analysis: Missing Backend Endpoints

This document identifies the backend APIs that need to be built to replace hardcoded mock data and local-only logic currently found in the Next.js frontend.

## 👥 User Management & Admin Controls

### 1. Get All Users
- **Frontend Usage:** `src/app/admin/components/UserManagement.js`
- **Required Method:** `GET`
- **Recommended Endpoint:** `/auth/users`
- **Auth:** Admin Only
- **Purpose:** Replace the `initialUsers` mock data and provide a live list of registered partners.

### 2. Update User Profile (Admin)
- **Frontend Usage:** `src/app/admin/users/[id]/page.js` and `UserManagement.js`
- **Required Method:** `PUT` / `PATCH`
- **Recommended Endpoint:** `/auth/user/:id`
- **Auth:** Admin Only
- **Purpose:** Allow admins to update user details (First Name, Last Name, Email, Status, Phone, etc.). Currently, this is only updated in local state.

### 3. Delete User
- **Frontend Usage:** `src/app/admin/users/[id]/page.js`
- **Required Method:** `DELETE`
- **Recommended Endpoint:** `/auth/user/:id`
- **Auth:** Admin Only
- **Purpose:** Permanently remove a user from the system. Currently, this action only removes the user from the local `userList` state.

---

## 📈 Financials & Entities

### 1. User Financial Summary
- **Frontend Usage:** `src/app/(dashboard)/components/FinancialSummaryModal.js`
- **Required Method:** `GET`
- **Recommended Endpoint:** `/user/financial-summary/:userId`
- **Auth:** User or Admin
- **Purpose:** Provide an aggregated view of a user's investments and total disbursements. Currently, this uses hardcoded USD values.

### 2. Registered Entities
- **Frontend Usage:** `src/app/(dashboard)/components/EntitiesModal.js`
- **Required Method:** `GET`
- **Recommended Endpoint:** `/user/entities/:userId`
- **Auth:** User or Admin
- **Purpose:** Fetch a list of primary and 3rd party entities associated with the user account. Currently, these are static lists in the frontend.

---

## 🛠️ Service & Account Status

### 1. Service Analysis Status
- **Frontend Usage:** `src/app/(dashboard)/components/ServiceAnalysisModal.js`
- **Required Method:** `GET`
- **Recommended Endpoint:** `/user/services/:userId`
- **Auth:** User or Admin
- **Purpose:** List the status of various services (Cessation, Stamp Fee, AML, etc.) for a specific user. Currently, all values are hardcoded as "COMPLETED (2018)".

### 2. Profile Management Search (Admin)
- **Frontend Usage:** `UserManagement.js` Search Bar
- **Required Method:** `GET`
- **Recommended Endpoint:** `/auth/users?search=...`
- **Auth:** Admin Only
- **Purpose:** Backend-side filtering for large user lists to improve performance over local state filtering.
