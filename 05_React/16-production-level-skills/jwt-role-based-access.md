# JWT + Role Based Access

## JWT Flow
1. User logs in
2. Server returns JWT
3. Store token securely (httpOnly cookie preferred)
4. Send token in authenticated requests

## Role-based Access
- Check roles (`admin`, `editor`, `user`) before rendering routes/pages
- Hide unauthorized UI and enforce checks on backend too
