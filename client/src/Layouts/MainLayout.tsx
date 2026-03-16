import { Outlet } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";

function MainLayout() {
	return (
		<div className="font-sans">
			<TopNavbar />
			<Outlet />
		</div>
	);
}

export default MainLayout;
