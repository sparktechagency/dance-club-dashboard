/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdDashboard, MdPrivacyTip } from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiTerminalWindowLine } from "react-icons/ri";

const Sidebar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Dashboard");
  const [activeSubItem, setActiveSubItem] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");

  const handleActiveRoute = (item) => {
    setActive(item);
    setOpenDropdown("");
    setActiveSubItem("");
  };

  const toggleDropdown = (label, subItems) => {
    const isOpening = openDropdown !== label;
    setOpenDropdown(isOpening ? label : "");

    if (isOpening && subItems?.length) {
      setActive(label);
      // setActiveSubItem(subItems[0].label);
    } else {
      setActiveSubItem("");
    }
  };

  const menuItems = [
    {
      icon: <MdDashboard className="h-5 w-5" />,
      label: "Dashboard",
      Link: "/",
    },
    {
      icon: <BsGraphUp className="h-5 w-5" />,
      label: "Manage Users",
      Link: "/manage-user",
    },
    {
      icon: <BsGraphUp className="h-5 w-5" />,
      label: "Manage Class",
      Link: "/manage-class",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Manage Category ",
      Link: "/manage-category",
    },
    {
      icon: <LuCircleDollarSign className="h-5 w-5" />,
      label: "Manage Product ",
      Link: "/manage-product",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Manage Order ",
      Link: "/manage-order",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Manage Booking ",
      Link: "/manage-booking",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Manage Package ",
      Link: "/manage-package",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Manage Course",
      Link: "/manage-course",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Manage Banner",
      Link: "/manage-banner",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Feedback",
      Link: "/feedback",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Manage Coupon",
      Link: "/manage-coupon",
    },
    {
      icon: <AiOutlineSetting className="h-5 w-5" />,
      label: "Settings",
      isDropdown: true,
      subItems: [
        {
          icon: <MdPrivacyTip className="h-5 w-5" />,
          label: "Privacy Policy",
          Link: "/settings/privacy-policy",
        },
        {
          icon: <RiTerminalWindowLine className="h-5 w-5" />,
          label: "Terms & Condition",
          Link: "/settings/terms-condition",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#eeeeee] h-full">
      <div className="flex flex-col md:h-full">
        <div className="flex flex-col gap-2 md:my-5 mb-10">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div className="flex gap-5">
                <div
                  className={`w-2 flex justify-between items-center py-2 cursor-pointer rounded-e-md ${
                    active === item.label
                      ? "bg-primary text-white font-semibold"
                      : "bg-secondary text-white font-semibold"
                  }`}
                ></div>

                {/* Menu Item */}
                {item.isDropdown ? (
                  <div
                    className={`w-52 flex justify-between items-center px-5 py-2 cursor-pointer rounded-e-md ${
                      active === item.label
                        ? "bg-primary text-white font-semibold"
                        : "bg-secondary text-white font-semibold"
                    }`}
                    onClick={() => toggleDropdown(item.label, item.subItems)}
                  >
                    <div className="flex items-center gap-3">
                      <p>{item.label}</p>
                      <BiChevronDown
                        className={`transform transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                ) : (
                  <Link to={item.Link}>
                    <div
                      className={`w-52 flex justify-between items-center px-5 py-2 cursor-pointer rounded-e-md ${
                        active === item.label
                          ? "bg-primary text-white font-semibold"
                          : "bg-secondary text-white font-semibold"
                      }`}
                      onClick={() => {
                        handleActiveRoute(item.label);
                        closeDrawer();
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <p>{item.label}</p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* Dropdown SubItems */}
              {item.isDropdown && openDropdown === item.label && (
                <div className="flex flex-col">
                  {item.subItems.map((subItem) => (
                    <Link to={subItem.Link} key={subItem.label}>
                      <div
                        className={`py-2 px-5 cursor-pointer ml-6 mt-2 rounded-md w-52 ${
                          activeSubItem === subItem.label
                            ? "text-white bg-primary font-bold"
                            : "text-white bg-secondary"
                        }`}
                        onClick={() => {
                          setActive(item.label);
                          setActiveSubItem(subItem.label);
                          closeDrawer();
                        }}
                      >
                        <p>{subItem.label}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Logout */}
          <Link className="text-black hover:text-black" to="/sign-in">
            <div
              className="bg-primary w-56 md:mt-20 py-3 flex justify-center items-center cursor-pointer hover:bg-primary text-white"
              onClick={() => console.log("Logged out")}
            >
              <FiLogOut className="text-xl" />
              <p className="ml-2">Log out</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
