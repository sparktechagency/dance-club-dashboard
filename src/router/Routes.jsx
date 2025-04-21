import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Analytics from "../Pages/Analytics/Analytics";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";
import ContinuePage from "../Pages/Auth/ContinuePage/ContinuePage";

import AboutUs from "../Pages/Settings/AboutUS/AboutUs";
import ContactUS from "../Pages/Settings/ContactUS/COntactUS";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../Pages/Settings/TermsCondition/TermsCondition";
import Banner from "../Pages/Settings/Banner/Banner";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import Notifications from "../Pages/Notification/Notification";
import ManageClass from "../Pages/ManageCLass/ManageClass";
import ManageProducts from "../Pages/ManageProducts/ManageProducts";
import AddProduct from "../Components/ProductManagement/AddProduct";
import MAnageOrder from "../Pages/ManageOrder/MAnageOrder";
import ManageMenbership from "../Pages/ManageMembership/ManageMenbership";
import AddNewMembership from "../Components/MemberShipManagement/AddNewMembership";
import EditMembership from "../Components/MemberShipManagement/EditMembership";
import ManageBanner from "../Pages/ManageBanner/ManageBanner";
import Feedback from "../Pages/Feedback/Feedback";
import ManageCoupon from "../Pages/ManageCoupon/ManageCoupon";


export const router = createBrowserRouter([
    {
        path: "/sign-in",
        element: <SignIn></SignIn>
    },

    {
        path: "/forgate-password",
        element: <ForgatePassword></ForgatePassword>
    },
    {
        path: "/varification",
        element: <VerifyPass></VerifyPass>
    },

    {
        path: "/new-password",
        element: <Newpass></Newpass>
    },
    {
        path: "/continue-page",
        element: <ContinuePage />
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Analytics />
            },
            {
                path: "/manage-class",
                element: <ManageClass/>
            },
            {
                path: "/manage-product",
                element: <ManageProducts/>
            },
            {
                path: "/add-product",
                element: <AddProduct/>
            },
            {
                path: "/edit-product",
                element: <AddProduct/>
            },
            {
                path: "/manage-order",
                element: <MAnageOrder/>
            },
            {
                path: "/manage-membership",
                element: <ManageMenbership/>
            },
            {
                path: "/add-new-membership",
                element: <AddNewMembership/>
            },
            {
                path: "/edit-membership",
                element: <EditMembership/>
            },
            {
                path: "/manage-banner",
                element: <ManageBanner/>
            },
            {
                path: "/feedback",
                element: <Feedback/>
            },
            {
                path: "/manage-coupon",
                element: <ManageCoupon/>
            },
           

            // setting:
            {
                path: "/settings/about-us",
                element: <AboutUs />
            },
            {
                path: "/settings/contact-us",
                element: <ContactUS />
            },


            {
                path: "/settings/privacy-policy",
                element: <PrivacyPolicy />
            },
            {
                path: "/settings/terms-condition",
                element: <TermsCondition />
            },
            {
                path: "/settings/banner",
                element: <Banner />
            },

            // Admin profile:
            {
                path: '/admin-profile',
                element: <AdminProfile />
            },
            {
                path: '/notification',
                element: <Notifications />
            }

        ]
    },
]);
