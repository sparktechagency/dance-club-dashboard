/* eslint-disable no-unused-vars */
import { useState } from "react";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/features/categoryApi/categoryApi";
import { Form, Input, message, Modal, Table, Upload } from "antd";
import { FaImage, FaPen, FaTrash } from "react-icons/fa";
import { use } from "react";

const ManageCategory = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation({ categoryId });
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation({
    categoryId,
  });

  const handleBeforeUpload = (file) => {
    form.setFieldsValue({ category_image: [file] });
    setProfilePic(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };

  //   console.log("profilePic", profilePic);

  const handleDelete = async (_id) => {
    console.log(_id);
    setCategoryId(_id);
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        await deleteCategory({_id:categoryId}).unwrap();
        message.success("Category deleted successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };
  const handleOk = () => {
    setIsAddModalOpen(false);
  };

  const handleEdit = async (_id) => {
    console.log(_id);
    setCategoryId(_id);

    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handlEditeOk = () => {
    setIsEditModalOpen(false);
  };

  const handleAddCategory = () => {
    setIsAddModalOpen(true);
  };

  const { data: categpryData } = useGetAllCategoryQuery({
    page: page,
    limit: limit,
  });

  const columns = [
    {
      title: "Category Image",
      key: "category_image",
      render: (record) => (
        <img className="w-10 h-10" src={record.category_image} />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <div className="flex justify-start items-center gap-5">
            <button className="btn btn-primary">
              <FaPen
                onClick={() => handleEdit(record?._id)}
                className="text-primary"
              ></FaPen>
            </button>
            <button className="btn btn-primary">
              <FaTrash
                onClick={() => handleDelete(record._id)}
                className="text-red-500"
              ></FaTrash>
            </button>
          </div>
        );
      },
    },
  ];
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("category_image", profilePic);
    formData.append("name", values.name);
    try {
      await createCategory(formData).unwrap();
      message.success("Category added successfully!");
      form.resetFields();
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfilePicUpload = (e) => {
    const file = e.file.originFileObj;
    // setProfilePic(file);
  };

  const onFinishEdit = async (values) => {
    const formData = new FormData();
    formData.append("category_image", profilePic);
    formData.append("name", values.name);
    try {
      await updateCategory({ categoryId, formData }).unwrap();

      message.success("Category updated successfully!");
      form.resetFields();
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center gap-5">
        <GoBackButton text="Manage Category" />
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Add Category
        </button>
      </div>

      <div className="my-10">
        <Table
          columns={columns}
          dataSource={categpryData?.data?.result}
        ></Table>
      </div>
      {/* Add Modal */}
      <Modal
        open={isAddModalOpen}
        onCancel={handleAddModalClose}
        title="Add Category"
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          name="add-category"
          layout="vertical"
        >
          <Form.Item name="category_image">
            <div className="flex flex-col">
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={handleBeforeUpload}
                  //   onChange={handleProfilePicUpload}
                  //   setFileList={setProfilePic}
                >
                  {!previewImage ? (
                    <>
                      <FaImage className="text-secondary h-10 w-10" />
                      <p className="text-secondary">Upload Image</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 object-contain"
                      />
                      <p className="text-secondary">{profilePic?.name}</p>
                    </>
                  )}
                </Upload>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="name"
            label={<p className=" text-md">Category Name</p>}
          >
            <Input
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full "
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="bg-primary text-white w-full py-3 rounded-md"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        onCancel={handleEditModalClose}
        title="Add Category"
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinishEdit}
          name="edit-category"
          layout="vertical"
        >
          <Form.Item name="category_image">
            <div className="flex flex-col">
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={handleBeforeUpload}
                >
                  {!previewImage ? (
                    <>
                      <FaImage className="text-secondary h-10 w-10" />
                      <p className="text-secondary">Upload Image</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 object-contain"
                      />
                      <p className="text-secondary">{profilePic?.name}</p>
                    </>
                  )}
                </Upload>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="name"
            label={<p className=" text-md">Category Name</p>}
          >
            <Input
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full "
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="bg-primary text-white w-full py-3 rounded-md"
            >
              {  isLoading ? "Updating..." : "Update"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategory;
