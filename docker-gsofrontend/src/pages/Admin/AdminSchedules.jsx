import SchedulePage from '../Schedules/SchedulePage';
import { AdminSidebar, MENU_ITEMS as ADMIN_MENU_ITEMS } from '../../components/AdminSidebar';

const AdminSchedules = () => (
  <SchedulePage
    SidebarComponent={AdminSidebar}
    menuItems={ADMIN_MENU_ITEMS}
    title="Admin"
  />
);

export default AdminSchedules;
