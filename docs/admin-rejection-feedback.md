# Admin Account Rejection Feedback (March 13, 2026)

## Summary
Added a required rejection reason when admins reject account requests. The reason is stored on the user record, surfaced in the login error message for rejected users, and sent as a system notification.

## Changes
### Backend
- Added `rejection_reason` and `rejected_at` fields to `users` via migration.
- `rejectAccountStatus` now requires `rejection_reason`, saves it, and creates a system notification for the user.
- `updateAccountStatus` clears rejection fields when an account is approved.
- `login` now includes the rejection reason in the error message for disapproved accounts.

### Frontend
- Added a rejection modal for Admin: requires a reason before sending the reject action.
- Reject request now sends `rejection_reason` in the payload.

## Files Touched
### Backend
- `docker-gsobackend/database/migrations/2026_03_13_000001_add_rejection_fields_to_users_table.php`
- `docker-gsobackend/app/Http/Controllers/UserController.php`

### Frontend
- `docker-gsofrontend/src/pages/Admin/AdminUserRequestsForm.jsx`

## Migrations
- `2026_03_13_000001_add_rejection_fields_to_users_table` (applied)

## Errors

