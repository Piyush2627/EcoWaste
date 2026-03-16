import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/common/Sidebar";
import { MdSpaceDashboard, MdLocalShipping } from "react-icons/md";

function PickupLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950">
      <div className="h-screen flex-shrink-0 scroll-smooth">
        <Sidebar>
          <SidebarItem
            icon={<MdSpaceDashboard />}
            text="Dashboard"
            link="/driverDashboard"
            active={location.pathname === "/driverDashboard"}
          />

          <SidebarItem
            icon={<MdLocalShipping />}
            text="Pickup Requests"
            link="/driverPickupRequests"
            active={location.pathname === "/driverPickupRequests"}
          />
        </Sidebar>
      </div>
      <div className="h-screen flex-1 overflow-y-auto p-6 scroll-smooth">
        <Outlet />
      </div>
    </div>
  );
}

export default PickupLayout;
