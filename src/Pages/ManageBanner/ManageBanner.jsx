import { useState } from "react";
import { AllImages } from "../../assets/image/AllImages";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { Form, Modal, Upload } from "antd";
import { FaImage } from "react-icons/fa";

const ManageBanner = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showModal = () => {
    setIsAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };
  const handleOk = () => {
    setIsAddModalOpen(false);
  };
  const handleEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handlEditeOk = () => {
    setIsEditModalOpen(false);
  };
  const onFinish = () => {};
  const handleProfilePicUpload = () => {};

  return (
    <div>
      <div className="flex justify-between items-center">
        <GoBackButton text={"Banner Managements"} />
        <button
          onClick={showModal}
          className=" px-4 py-2 rounded-md bg-primary text-white"
        >
          Add Banner
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-neutral-200 p-5 rounded-xl flex flex-col gap-5">
        <img src={AllImages.banner1} alt="" className="w-full" />
          <button onClick={handleEdit} className="text-xl font-bold px-4 py-1 rounded-md">
            Edit
          </button>
        </div>
        <div className="bg-neutral-200 p-5 rounded-xl flex flex-col gap-5">
        <img src={AllImages.banner2} alt="" className="w-full" />
          <button onClick={handleEdit} className="text-xl font-bold px-4 py-1 rounded-md">
            Edit
          </button>
        </div>
        <div className="bg-neutral-200 p-5 rounded-xl flex flex-col gap-5">
        <img src={AllImages.banner3} alt="" className="w-full" />
          <button onClick={handleEdit} className="text-xl font-bold px-4 py-1 rounded-md">
            Edit
          </button>
        </div>
      </div>
      {/* Add Banner */}
      <Modal
        title="Add New Course"
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleAddModalClose}
        footer={false}
      >
        <Form
          onFinish={onFinish}
          name="add-token"
          initialValues={{ remember: false }}
          layout="vertical"
        >
          <div className="w-full">
            <Form.Item
              name="title"
              label={<p className=" text-md">Add Banner image</p>}
            >
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  onChange={handleProfilePicUpload}
                  className=" "
                >
                  <FaImage className="text-secondary h-10 w-10" />
                  <p className="text-secondary">Upload Image</p>
                </Upload>
              </div>
            </Form.Item>
          </div>

          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              <button className="px-6 py-2 rounded-md bg-primary text-white">
                Save
              </button>
              <button className="px-6 py-2 rounded-md border border-primary text-primary">
                cancel
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {/* Edit Banner */}
      <Modal
        title="Edit Banner"
        open={isEditModalOpen}
        onOk={handlEditeOk}
        onCancel={handleEditModalClose}
        footer={false}
      >
        <Form
          onFinish={onFinish}
          name="add-token"
          initialValues={{ remember: false }}
          layout="vertical"
        >
          <div className="w-full">
            <Form.Item
              name="title"
              label={<p className=" text-md">Add Banner image</p>}
            >
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  onChange={handleProfilePicUpload}
                  className=" "
                >
                  <FaImage className="text-secondary h-10 w-10" />
                  <p className="text-secondary">Upload Image</p>
                </Upload>
              </div>
            </Form.Item>
          </div>

          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              <button className="px-6 py-2 rounded-md bg-primary text-white">
                Save
              </button>
              <button className="px-6 py-2 rounded-md border border-primary text-primary">
                cancel
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBanner;
