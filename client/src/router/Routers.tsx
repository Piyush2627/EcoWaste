import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import AdminLayout from "../Layouts/AdminLayout";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Marketplace from "../pages/Marketplace";
import ImpactPage from "../pages/ImpactPage";
import AboutPage from "../pages/AboutPage";
import HowItWorks from "../pages/HowItWorks";
import AIAnalyzer from "../pages/AIAnalyzer";
import DirectPickup from "../pages/DirectPickup";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminWareHouseInventory from "../pages/Admin/AdminWareHouseInventory";
import AdminUserDashboard from "../pages/Admin/AdminUserDashboard";
import ProtectedRoute from "../utils/ProtectedRoute";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminPickupRequests from "../pages/Admin/AdminPickupRequests";
import UpgradeRole from "../pages/UpgradeRole";
import PickupLayout from "../Layouts/PickupLayout";
import DriverDashboard from "../pages/Driver/DriverDashboard";
import DriverRequests from "../pages/Driver/DriverRequests";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <Homepage />,
            },
            {
                path: "/marketplace",
                element: <Marketplace />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/ai-analyzer",
                        element: <AIAnalyzer />,
                    },
                    {
                        path: "/schedule-pickup",
                        element: <DirectPickup />,
                    },
                    {
                        path: "/become-driver",
                        element: <UpgradeRole />,
                    },
                ]
            },
            {
                path: "/impact",
                element: <ImpactPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/how-it-work",
                element: <HowItWorks />,
            },
        ],
    },
    {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: "/adminDashboard",
                        element: <AdminDashboard />,
                    },
                    {
                        path: "/adminWareHouseInventory",
                        element: <AdminWareHouseInventory />,
                    },
                    {
                        path: "/adminUserDashboard",
                        element: <AdminUserDashboard />,
                    },
                    {
                        path: "/adminPickupRequests",
                        element: <AdminPickupRequests />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute allowedRoles={['pickuppatner']} />,
        children: [
            {
                element: <PickupLayout />,
                children: [
                    {
                        path: "/driverDashboard",
                        element: <DriverDashboard />,
                    },
                    {
                        path: "/driverPickupRequests",
                        element: <DriverRequests />,
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/admin/login",
        element: <AdminLoginPage />,
    },
]);
const Router: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default Router;
