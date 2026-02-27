# Routing Coverage Guide

This project can be extended to cover full routing roadmap:

## Covered
- Client-side routing

## Add/Practice
- Dynamic routes: `/users/:id`
- Nested routes: dashboard sub-routes
- Protected routes using auth context
- 404 page with wildcard route `*`

## Example route setup
```jsx
<Route path="/users/:id" element={<UserDetails />} />
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>
<Route path="*" element={<NotFound />} />
```
