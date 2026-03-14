# Notification Redirect System (March 13, 2026)

## Summary
Implemented notification "Read" redirect behavior. Each notification now carries a `reference_id` used to open the related request after marking the notification as read. Notifications created before the migration will not redirect because `reference_id` is NULL.

## Changes
### Backend
- Added nullable `reference_id` column to `notifications`.
- Added `reference_id` to Notification model fillable fields.
- Set `reference_id` when creating account and maintenance request notifications.
- Fixed `maintenance_request_done` notification to use the correct request id for `reference_id`.

### Frontend
- "Read" button now marks as read and navigates to the related page when `reference_id` exists.

Role routing:
- Admin: `account_request_created` -> `/adminuserrequestsform/{user_id}`
- Staff: `maintenance_request_created`, `maintenance_request_approved_by_campus_director` -> `/staffmaintenancerequestform/{id}`
- Head: `maintenance_request_verified` -> `/headmaintenancerequestform/{id}`
- Campus Director: `maintenance_request_verified`, `maintenance_request_approved_by_head` -> `/campusdirectormaintenancerequestform/{id}`
- User: maintenance-related types -> `/viewmaintenancerequestform/{id}`

## Files Touched
### Backend
- `docker-gsobackend/database/migrations/2026_03_13_000002_add_reference_id_to_notifications_table.php`
- `docker-gsobackend/app/Models/Notification.php`
- `docker-gsobackend/app/Http/Controllers/UserController.php`
- `docker-gsobackend/app/Http/Controllers/MaintenanceRequestController.php`

### Frontend
- `docker-gsofrontend/src/pages/Admin/Adminnotifications.jsx`
- `docker-gsofrontend/src/pages/Staff/StaffNotifications.jsx`
- `docker-gsofrontend/src/pages/Head/HeadNotifications.jsx`
- `docker-gsofrontend/src/pages/CampusDirector/CampusDirectorNotifications.jsx`
- `docker-gsofrontend/src/pages/Userdashboard/Notifications.jsx`

## Migrations
- `2026_03_13_000002_add_reference_id_to_notifications_table` (applied)

## Errors
