# Schedule/Calendar Fix and Shared Events (March 13, 2026)

## Summary
Fixed schedule/calendar access for Head, Staff, and Campus Director and introduced shared schedule events. Admin, Head, Staff, and Campus Director can now view/add schedule events. Only the creator or Admin can edit/delete events. Requesters are blocked from the schedule page. Schedule details now appear in a day-click modal instead of an upcoming list.

## Changes
### Backend
- Added `schedule_events` table for shared schedule entries (title, date, time, location, notes, assigned office, created_by).
- Added `ScheduleEvent` model with relationships to `Office` and `User`.
- Added `ScheduleEventController` with CRUD endpoints and role/ownership checks.
- Added schedule-events routes under auth.

### Frontend
- Created shared schedule page and wrapped it per role (Admin/Staff/Head/Campus Director).
- Added schedule routes: `/adminschedules`, `/staffschedules`, `/headschedules`, `/campusdirectorschedules`.
- Replaced requester `/schedules` with an access-denied page.
- Fixed schedule menu links for Staff/Head routes that incorrectly pointed to `/adminschedules`.
- Replaced the upcoming events list with a modal that opens when a day is clicked.
- Modal shows day-specific schedule details and provides Edit/Delete for authorized users.

## Files Touched
### Backend
- `docker-gsobackend/database/migrations/2026_03_13_000003_create_schedule_events_table.php`
- `docker-gsobackend/app/Models/ScheduleEvent.php`
- `docker-gsobackend/app/Http/Controllers/ScheduleEventController.php`
- `docker-gsobackend/routes/api.php`

### Frontend
- `docker-gsofrontend/src/pages/Schedules/SchedulePage.jsx`
- `docker-gsofrontend/src/pages/Schedules/ScheduleAccessDenied.jsx`
- `docker-gsofrontend/src/pages/Admin/AdminSchedules.jsx`
- `docker-gsofrontend/src/pages/Staff/StaffSchedules.jsx`
- `docker-gsofrontend/src/pages/Head/HeadSchedules.jsx`
- `docker-gsofrontend/src/pages/CampusDirector/CampusDirectorSchedules.jsx`
- `docker-gsofrontend/src/App.jsx`
- `docker-gsofrontend/src/pages/Head/HeadDashboard.jsx`
- `docker-gsofrontend/src/pages/Staff/StaffMaintenance/StaffMaintenance.jsx`
- `docker-gsofrontend/src/pages/Staff/StaffRequests.jsx`

## API Endpoints
- `GET /schedule-events`
- `POST /schedule-events`
- `PUT /schedule-events/{id}`
- `DELETE /schedule-events/{id}`

## Migration
- `2026_03_13_000003_create_schedule_events_table` (applied)

## Errors

## Verification Steps (Manual)
1. Login as Admin, Staff, Head, Campus Director; open Schedules; ensure calendar renders.
2. Create a schedule event and confirm it appears for all roles.
3. Click a day to open the modal and verify day-specific schedules appear.
4. Edit/delete as creator and as Admin; confirm non-creators cannot edit/delete.
5. Login as requester and attempt `/schedules`; verify access denied.
