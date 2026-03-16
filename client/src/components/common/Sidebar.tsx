import { FaAlignRight, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import { createContext, useContext, useState, type ReactNode, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeAuthToken } from "../../utils/auth";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({ expanded: true });

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true); // Default to expanded for admin
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate("/login");
  };

  return (
    <aside className="h-screen bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800 transition-all duration-300 shadow-sm">
      <nav className="flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between p-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <h2 className={`font-bold text-primary transition-all duration-300 overflow-hidden whitespace-nowrap ${expanded ? "w-36 opacity-100" : "w-0 opacity-0"}`}>
              EcoWaste <span className="text-emerald-500">Admin</span>
            </h2>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="rounded p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {expanded ? <FaArrowLeft /> : <FaAlignRight />}
            </button>
          </div>
          <div className="relative mt-6">
            <SidebarContext.Provider value={{ expanded }}>
              <ul className="px-3 space-y-1">{children}</ul>
            </SidebarContext.Provider>
          </div>
        </div>

        <div className={`p-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between transition-all duration-300`}>
          <div className={`leading-4 overflow-hidden transition-all duration-300 ${expanded ? "w-36 opacity-100" : "w-0 opacity-0 invisible"}`}>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">EcoWaste Admin</h4>
            <span className="text-[11px] text-gray-500">admin@ecowaste.tech</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  link: string;
  active?: boolean;
  alert?: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  alert = false,
  link,
}) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={link}>
      <li
        className={`group relative flex items-center rounded-lg px-3 py-3 my-1 font-medium transition-all duration-200 cursor-pointer ${
          active
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900/40 hover:text-emerald-500 dark:hover:text-emerald-400"
        }`}
      >
        <div className={`text-xl transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`}>
          {icon}
        </div>
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 font-semibold text-sm ${
            expanded ? "ml-3 w-40 opacity-100" : "w-0 opacity-0"
          }`}
        >
          {text}
        </span>

        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-1 bg-emerald-500 rounded-r-md"></div>
        )}

        {alert && (
          <div
            className={`absolute right-2 h-2 w-2 rounded-full bg-emerald-500 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}

        {!expanded && (
          <div
            className={`invisible absolute left-full z-50 ml-6 rounded-md bg-zinc-900 px-2 py-1.5 text-xs text-white whitespace-nowrap opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
};
