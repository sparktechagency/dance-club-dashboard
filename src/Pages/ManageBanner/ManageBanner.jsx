/* eslint-disable no-unused-vars */
import { useState } from "react";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { Form, message, Modal, Upload } from "antd";
import { FaImage } from "react-icons/fa";
import {
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetAllBannerQuery,
} from "../../redux/api/features/bannerApi/bannerApi";
import swal from "sweetalert";

const ManageBanner = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [bannerPic, setBannerPic] = useState(null);
  const [form] = Form.useForm();
  const { data: bannerData } = useGetAllBannerQuery();
  const [createBanner, { isLoading }] = useCreateBannerMutation();
  const banner = bannerData?.data?.result;
  // console.log("banner", banner);

  const [deleteBanner] = useDeleteBannerMutation();

  const showModal = () => {
    form.resetFields();
    setPreviewImage(null);
    setBannerPic(null);
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
  const onFinish = async (values) => {
    const formData = new FormData();
    try {
      formData.append("banner", bannerPic);
      await createBanner(formData).unwrap();
      // form.resetFields();
      message.success("Banner added successfully!");
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfilePicUpload = (file) => {
    setBannerPic(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };
  const handleDelete = (id) => {
    swal({
      title: "Are you sure you want to delete this banner?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteBanner(id);
        message.success("Banner deleted successfully!");
      }
    });
  };

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
        {banner?.map((b) => (
          <div
            key={b?._id}
            className="bg-neutral-200 p-5 rounded-xl flex flex-col gap-5"
          >
            <img src={b?.image} alt="" className="w-full h-44" />
            <button
              onClick={() => handleDelete(b?._id)}
              className="text-xl font-bold px-4 py-1 rounded-md bg-primary text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {/* Add Banner */}
      <Modal
        title="Add Banner"
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleAddModalClose}
        footer={false}
        form={form}
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
                  // onChange={handleProfilePicUpload}
                  beforeUpload={handleProfilePicUpload}
                  className=" "
                >
                  {previewImage ? (
                    <img src={previewImage} alt="" className="w-full h-32" />
                  ) : (
                    <p className="text-secondary">Upload Image</p>
                  )}
                </Upload>
              </div>
            </Form.Item>
          </div>

          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              {isLoading ? (
                <button className="px-6 py-2 rounded-md bg-primary text-white">
                  Submitting...
                </button>
              ) : (
                <button className="px-6 py-2 rounded-md bg-primary text-white">
                  Submit
                </button>
              )}
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
