import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/common/Sidebar";
import { MdSpaceDashboard, MdInventory, MdPeopleAlt, MdLocalShipping } from "react-icons/md";

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950">
      <div className="h-screen flex-shrink-0 scroll-smooth">
        <Sidebar>
          <SidebarItem
            icon={<MdSpaceDashboard />}
            text="Dashboard"
            link="/adminDashboard"
            active={location.pathname === "/adminDashboard"}
          />

          <SidebarItem
            icon={<MdInventory />}
            text="Warehouse Inventory"
            link="/adminWareHouseInventory"
            active={location.pathname === "/adminWareHouseInventory"}
          />

          <SidebarItem
            icon={<MdPeopleAlt />}
            text="Manage Users"
            link="/adminUserDashboard"
            active={location.pathname === "/adminUserDashboard"}
          />

          <SidebarItem
            icon={<MdLocalShipping />}
            text="Pickup Requests"
            link="/adminPickupRequests"
            active={location.pathname === "/adminPickupRequests"}
          />
          
        </Sidebar>
      </div>
      <div className="h-screen flex-1 overflow-y-auto p-6 scroll-smooth">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
