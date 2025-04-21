import { Avatar, Upload, ConfigProvider, Input, Form, message } from "antd";
import { useState } from "react";
import { FaCamera, FaLockOpen } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import user from "../../assets/image/user.png";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";

const AdminProfile = () => {
    const [profilePic, setProfilePic] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("Edit Profile");
    const [form] = Form.useForm();

    const [userData, setUserData] = useState({
        name: "John Doe",
        contact: "123-456-7890",
        address: "79/A Joker Vila, Gotham City",
    });

    const [currentPassword, setCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (type) => {
        if (type === "current") setCurrentPassword(!currentPassword);
        else if (type === "new") setShowNewPassword(!showNewPassword);
        else setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const onFinish = (values) => {
        setUserData({
            name: values.name,
            contact: values.contact,
            address: values.address,
        });
        setIsEditing(false);
        message.success("Profile updated successfully!");
    };

    const onChangePassword = (values) => {
        console.log("Password Change Request: ", values);
        message.success("Password changed successfully!");
    };

    return (
        <div className="mx-2">
           <GoBackButton text={"Admin Profile"}/>
            <div className="flex flex-col justify-center items-center py-5">
                <div className="flex flex-col items-center text-center mb-10 py-6 bg-white w-full">
                    <div className="relative">
                        <Avatar
                            size={140}
                            src={profilePic}
                            className="border-4 border-neutral-600 shadow-xl"
                        />
                        {isEditing && (
                            <Upload
                                showUploadList={false}
                                onChange={(e) =>
                                    setProfilePic(URL.createObjectURL(e.file.originFileObj))
                                }
                                className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full cursor-pointer"
                            >
                                <FaCamera className="text-primary h-5 w-5" />
                            </Upload>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold my-6">{userData.name}</h1>
                </div>
            </div>

            {/* Tabs for Edit Profile and Change Password */}
            <div className="my-6 flex justify-center items-center gap-5 text-xl font-semibold">
                <p
                    onClick={() => setActiveTab("Edit Profile")}
                    className={`cursor-pointer ${activeTab === "Edit Profile"
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-gray-500"
                        }`}
                >
                    Edit Profile
                </p>
                <p
                    onClick={() => setActiveTab("Change Password")}
                    className={`cursor-pointer ${activeTab === "Change Password"
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-gray-500"
                        }`}
                >
                    Change Password
                </p>
            </div>

            {/* Content based on active tab */}
            {activeTab === "Edit Profile" && (
                <div className="p-5 bg-white shadow-md rounded-md">
                    <div className="flex items-center justify-center">
                        <p className="text-center font-bold text-xl my-6 text-gray-700">
                            Edit your Profile
                        </p>
                        <button
                            onClick={toggleEditMode}
                            className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-dark ml-3"
                        >
                            {isEditing ? (
                                <MdOutlineCancel className="h-6" />
                            ) : (
                                <FaUserEdit className="h-6" />
                            )}
                        </button>
                    </div>
                    {!isEditing ? (
                        <div className="w-[40%] mx-auto">
                            <p className="text-md mb-2">
                                <strong>Name:</strong> {userData.name}
                            </p>
                            <p className="text-md mb-2">
                                <strong>Contact:</strong> {userData.contact}
                            </p>
                            <p className="text-md mb-2">
                                <strong>Address:</strong> {userData.address}
                            </p>
                        </div>
                    ) : (
                        <ConfigProvider>
                            <Form
                                form={form}
                                initialValues={userData}
                                onFinish={onFinish}
                                layout="vertical"
                                style={{ maxWidth: 800 }}
                                className="mx-auto"
                            >
                                <Form.Item name="name" label={<p className="text-md">Name</p>}>
                                    <Input required placeholder="Your Name" />
                                </Form.Item>
                                <Form.Item
                                    name="contact"
                                    label={<p className="text-md">Contact Number</p>}
                                >
                                    <Input required placeholder="Contact Number" />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label={<p className="text-md">Address</p>}
                                >
                                    <Input required placeholder="Address" />
                                </Form.Item>
                                <Form.Item className="text-center">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white px-10 py-2 rounded-md shadow-lg"
                                    >
                                        Save Changes
                                    </button>
                                </Form.Item>
                            </Form>
                        </ConfigProvider>
                    )}
                </div>
            )}

            {activeTab === "Change Password" && (
                <div className="p-5 bg-white shadow-md rounded-md">
                    <p className="text-center font-bold text-xl my-6 text-gray-700">
                        Change your Password
                    </p>
                    <ConfigProvider>
                        <Form
                            onFinish={onChangePassword}
                            layout="vertical"
                            style={{ maxWidth: 800 }}
                            className="mx-auto"
                        >
                            <Form.Item
                                name="currentPassword"
                                label={<p className="text-md">Current Password</p>}
                            >
                                <div className="relative">
                                    <Input
                                        type={currentPassword ? "text" : "password"}
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("current")}
                                        className="absolute right-2 top-2"
                                    >
                                        {currentPassword ? <FaLockOpen /> : <IoIosLock />}
                                    </button>
                                </div>
                            </Form.Item>

                            <Form.Item
                                name="newPassword"
                                label={<p className="text-md">New Password</p>}
                            >
                                <div className="relative">
                                    <Input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("new")}
                                        className="absolute right-2 top-2"
                                    >
                                        {showNewPassword ? <FaLockOpen /> : <IoIosLock />}
                                    </button>
                                </div>
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label={<p className="text-md">Confirm Password</p>}
                            >
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("confirm")}
                                        className="absolute right-2 top-2"
                                    >
                                        {showConfirmPassword ? <FaLockOpen /> : <IoIosLock />}
                                    </button>
                                </div>
                            </Form.Item>

                            <Form.Item className="text-center">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white px-10 py-2 rounded-md shadow-lg hover:bg-primary-dark"
                                >
                                    Save Changes
                                </button>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;
