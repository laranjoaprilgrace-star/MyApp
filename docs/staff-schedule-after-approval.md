# Staff Scheduling After Campus Director Approval (March 13, 2026)

## Summary
Scheduling is now tied to a fully approved maintenance request and only after staff verification. Only Staff can create schedules, and only after Campus Director approval. One schedule is allowed per request. Assigned office is automatically taken from the request’s requesting office. Calendar creation is disabled; scheduling happens from a modal window opened in the staff request form. Admin can edit/delete any schedule, and creators can edit/delete their own.

## Changes
### Backend
- Added `maintenance_request_id` to `schedule_events` (unique, FK to maintenance_requests).
- Added `maintenanceRequest()` relationship on `ScheduleEvent` and `scheduleEvent()` on `MaintenanceRequest`.
- Added `requesting_office_id` to staff POV response for automatic office assignment.
- Updated `ScheduleEventController`:
  - `GET /schedule-events` supports `maintenance_request_id` filter.
  - `POST /schedule-events` requires `maintenance_request_id`, staff-only, ensures Campus Director approval, enforces one schedule per request, auto-assigns office, and notifies requester (notification explicitly includes scheduled date, time, and assigned priority number).
  - `PUT /schedule-events/{id}` keeps admin/creator edit and preserves assigned office for request-linked events.

### Frontend
- Calendar is read-only for creation (no Add Event button).
- Staff request form now automatically opens a Schedule modal immediately after priority assignment and staff verification (Campus Director approval required):
  - Fetches existing schedule via `maintenance_request_id`.
  - Creates schedule via `POST /schedule-events`.
  - Displays schedule details once created, with a new **"Finish and Return"** button to cleanly navigate back to the request slip list.
- Requester notifications include `maintenance_request_scheduled` and redirect to the request.

## Files Touched
### Backend
- `docker-gsobackend/database/migrations/2026_03_13_000004_add_maintenance_request_id_to_schedule_events_table.php`
- `docker-gsobackend/app/Models/ScheduleEvent.php`
- `docker-gsobackend/app/Models/MaintenanceRequest.php`
- `docker-gsobackend/app/Http/Controllers/ScheduleEventController.php`
- `docker-gsobackend/app/Http/Controllers/MaintenanceRequestController.php`

### Frontend
- `docker-gsofrontend/src/pages/Schedules/SchedulePage.jsx`
- `docker-gsofrontend/src/pages/Staff/StaffMaintenanceRequestForm.jsx`
- `docker-gsofrontend/src/pages/Userdashboard/Notifications.jsx`

## API Endpoints
- `GET /schedule-events?maintenance_request_id={id}`
- `POST /schedule-events` (requires `maintenance_request_id`, staff-only)
- `PUT /schedule-events/{id}`
- `DELETE /schedule-events/{id}`

## Migration
- `2026_03_13_000004_add_maintenance_request_id_to_schedule_events_table` (successfully migrated)

## Errors (Resolved)
- The missing column error (`Column not found: 1054 Unknown column 'maintenance_request_id'`) was fixed by running the database migrations via Docker.

## Verification Steps (Manual)
1. Run migration once DB host is available.
2. Login as Staff; open a request that has `approved_by_2` set; schedule it.
3. Confirm the schedule appears on the shared calendar and in the staff request view.
4. Verify a requester receives a “scheduled” notification that opens the request.
5. Ensure other roles cannot create new schedules via the calendar.
6. Confirm Admin can edit/delete any schedule and creator can edit/delete their own.
