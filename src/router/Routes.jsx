import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Analytics from "../Pages/Analytics/Analytics";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";
import ContinuePage from "../Pages/Auth/ContinuePage/ContinuePage";

import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../Pages/Settings/TermsCondition/TermsCondition";
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
import ManagePackage from "../Pages/ManagePackage/ManagePackage";
import ManageCourse from "../Pages/ManageCourse/ManageCourse";
import ClassManagement from "../Components/ClassManagement/ClassManagement";
import OrderDetails from "../Pages/ManageOrder/OrderDetails";
import ManageCategory from "../Pages/ManageCategory/ManageCategory";
import EditProduct from "../Components/ProductManagement/EditProduct";
import NonScheduledClass from "../Components/ClassManagement/NonScheduledClass";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn></SignIn>,
  },

  {
    path: "/forgate-password",
    element: <ForgatePassword></ForgatePassword>,
  },
  {
    path: "/varification",
    element: <VerifyPass></VerifyPass>,
  },

  {
    path: "/new-password",
    element: <Newpass></Newpass>,
  },
  {
    path: "/continue-page",
    element: <ContinuePage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Analytics />,
      },
      {
        path: "/manage-class",
        element: <ManageClass />,
      },
      {
        path: "/add-schedule-class",
        element: <ClassManagement />,
      },
      {
        path: "/add-non-schedule-class",
        element: <NonScheduledClass />,
      },
      {
        path: "manage-category",
        element: <ManageCategory />,
      },

      {
        path: "/manage-product",
        element: <ManageProducts />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/edit-product/:_id",
        element: <EditProduct />,
      },
      {
        path: "/manage-order",
        element: <MAnageOrder />,
      },
      {
        path: "/order-details/:_id",
        element: <OrderDetails />,
      },
      {
        path: "/manage-membership",
        element: <ManageMenbership />,
      },
      {
        path: "/manage-package",
        element: <ManagePackage />,
      },
      {
        path: "/manage-course",
        element: <ManageCourse />,
      },
      {
        path: "/add-new-membership",
        element: <AddNewMembership />,
      },
      {
        path: "/edit-membership",
        element: <EditMembership />,
      },
      {
        path: "/manage-banner",
        element: <ManageBanner />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/manage-coupon",
        element: <ManageCoupon />,
      },

      // setting:

      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/settings/terms-condition",
        element: <TermsCondition />,
      },

      // Admin profile:
      {
        path: "/admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
]);
