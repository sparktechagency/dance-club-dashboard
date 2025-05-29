import { Avatar, Upload, ConfigProvider, Input, Form, message } from "antd";
import { useEffect, useState } from "react";
import { FaCamera, FaLockOpen, FaUserEdit } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/features/profileApi/profileApi";

const AdminProfile = () => {
  const [profilePic, setProfilePic] = useState();
  const [previwImg, setPreviwImg] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [form] = Form.useForm();
  const { data: profile } = useGetProfileQuery();
  const [userData, setUserData] = useState(null);

  const [oldPassword, setoldPassword] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);
  const [showconfirmNewPassword, setShowconfirmNewPassword] = useState(false);
  const [changePassword] = useChangePasswordMutation();

  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (profile?.data) {
      setUserData(profile.data);
      form.setFieldsValue(profile.data);
    }
  }, [profile?.data, form]);

  const togglePasswordVisibility = (type) => {
    if (type === "current") setoldPassword(!oldPassword);
    else if (type === "new") setShownewPassword(!shownewPassword);
    else setShowconfirmNewPassword(!showconfirmNewPassword);
  };

  const toggleEditMode = () => setIsEditing(!isEditing);

  const onFinish = (values) => {
    const data = { name: values.name };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (profilePic) formData.append("profile_image", profilePic);

    updateProfile(formData)
      .unwrap()
      .then((res) => {
        setUserData(res.data);
        form.setFieldsValue(res.data);
        setPreviwImg(null);
        isEditing(false);
        message.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const beforeUpload = (file) => {
    setProfilePic(file);
    setPreviwImg(URL.createObjectURL(file));
    return false; // Prevent auto-upload
  };

  const onFinishChangePassword = (values) => {
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    };

    changePassword(data)
      .unwrap()
      .then((res) => {
        console.log("res", res);
        form.resetFields();
        message.success("Password changed successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-2">
      <GoBackButton text="Admin Profile" />
      <ConfigProvider>
        <div className="flex flex-col justify-center items-center py-5">
          <div className="flex flex-col items-center text-center mb-10 py-6 bg-white w-full">
            <div className="relative">
              <Avatar
                size={140}
                src={previwImg || profile?.data?.profile_image}
                className="border-4 border-neutral-600 shadow-xl"
              />
              {isEditing && (
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={beforeUpload}
                  className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full cursor-pointer"
                >
                  <FaCamera className="text-primary h-5 w-5" />
                </Upload>
              )}
            </div>
            <h1 className="text-2xl font-semibold my-3">
              {profile?.data?.name}
            </h1>
          </div>
        </div>

        <div className="my-6 flex justify-center items-center gap-5 text-xl font-semibold">
          <p
            onClick={() => setActiveTab("Edit Profile")}
            className={`cursor-pointer ${
              activeTab === "Edit Profile"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-gray-500"
            }`}
          >
            Edit Profile
          </p>
          <p
            onClick={() => setActiveTab("Change Password")}
            className={`cursor-pointer ${
              activeTab === "Change Password"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-gray-500"
            }`}
          >
            Change Password
          </p>
        </div>

        {activeTab === "Edit Profile" && (
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: 800 }}
            className="mx-auto p-5 bg-white shadow-md rounded-md"
          >
            <div className="flex items-center justify-center">
              <p className="text-center font-bold text-xl my-6 text-gray-700">
                Edit your Profile
              </p>
              <button
                onClick={toggleEditMode}
                type="button"
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
                  <strong>Name:</strong> {userData?.name}
                </p>
                <p className="text-md mb-2">
                  <strong>Email:</strong> {userData?.email}
                </p>
              </div>
            ) : (
              <>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Your Name" />
                </Form.Item>

                <Form.Item className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-10 py-2 rounded-md shadow-lg"
                  >
                    Save Changes
                  </button>
                </Form.Item>
              </>
            )}
          </Form>
        )}

        {activeTab === "Change Password" && (
          <Form
            onFinish={onFinishChangePassword}
            layout="vertical"
            style={{ maxWidth: 800 }}
            className="mx-auto p-5 bg-white shadow-md rounded-md"
          >
            <p className="text-center font-bold text-xl my-6 text-gray-700">
              Change your Password
            </p>

            <Form.Item
              name="oldPassword"
              label="old Password"
              rules={[{ required: true }]}
            >
              <div className="relative">
                <Input
                  type={oldPassword ? "text" : "password"}
                  placeholder="Enter old Password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-2 top-2"
                >
                  {oldPassword ? <FaLockOpen /> : <IoIosLock />}
                </button>
              </div>
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true }]}
            >
              <div className="relative">
                <Input
                  type={shownewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-2 top-2"
                >
                  {shownewPassword ? <FaLockOpen /> : <IoIosLock />}
                </button>
              </div>
            </Form.Item>

            <Form.Item
              name="confirmNewPassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <div className="relative">
                <Input
                  type={showconfirmNewPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-2 top-2"
                >
                  {showconfirmNewPassword ? <FaLockOpen /> : <IoIosLock />}
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
        )}
      </ConfigProvider>
    </div>
  );
};

export default AdminProfile;
