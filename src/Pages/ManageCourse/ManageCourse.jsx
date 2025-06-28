/* eslint-disable no-unused-vars */
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { FaImage, FaTrashAlt } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { AiOutlineEdit } from "react-icons/ai";
import swal from "sweetalert";
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetAllCourseQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "../../redux/api/features/courseApi/courseApi";
import dayjs from "dayjs";
const ManageCourse = () => {
  const [form] = Form.useForm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [coursesPic, setcoursesPic] = useState(null);
  const [instrctorPic, setinstrctorPic] = useState(null);
  const [previewInstructor, setPreviewInstrutor] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const [email, setEmail] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [createCourse] = useCreateCourseMutation();
  const { data: courseData, isLoading } = useGetAllCourseQuery({
    page: currentPage,
    limit: pageSize,
    searchTerm,
  });
  const courses = courseData?.data?.result;

  const { data: singleCourseData } = useGetCourseByIdQuery(courseId, {
    skip: !courseId || courseId.length !== 24,
  });
  const [updateCourse] = useUpdateCourseMutation({ courseId: courseId });
  const [deleteCourse] = useDeleteCourseMutation();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
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
  const handleEdit = (_id) => {
    setCourseId(_id);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (isEditModalOpen && singleCourseData?.data?.[0]) {
      const data = singleCourseData?.data?.[0];
      form.setFieldsValue({
        name: data?.instructorName,
        bannerImage: data.bannerImage,
        title: data.title,
        description: data.description,
        duration: data.duration,
        startDate: data.startDate ? dayjs(data.startDate) : null,
        price: data.price,
        totalSeat: data.totalSeat,
      });
    }
  }, [isEditModalOpen, singleCourseData, form]);

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handlEditeOk = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = (_id) => {
    console.log(_id);
    swal({
      title: "Are you sure you want to delete this course?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteCourse(_id).unwrap();
          message.success("Deleted Successfully");
        } catch (err) {
          console.error("Failed to delete:", err);
          message.error("Failed to delete course");
        }
      }
    });
  };

  const handleBefoeUpload = (file) => {
    form.setFieldValue({ bannerImage: file });
    setPreviewImage(URL.createObjectURL(file));
    setcoursesPic(file);
    return false;
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    const data = {
      title: values.title,
      description: values.description,
      duration: values.duration,
      startDate: values.startDate,
      price: values.price,
      totalSeat: values.totalSeat,
      instructorName: values.name,
    };

    const bannerImage = values.bannerImage;
    console.log("bannerImage", bannerImage);

    try {
      formData.append("data", JSON.stringify(data));
      formData.append("course_banner", coursesPic);
      await createCourse(formData).unwrap();
      message.success("Course Added Successfully");
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditFInish = async (values) => {
    const formData = new FormData();
    try {
      const data = {
        title: values.title,
        description: values.description,
        duration: values.duration.toString(),
        startDate: values.startDate,
        price: values.price,
        totalSeat: values.totalSeat,
        instructorName: values.name,
      };

      const bannerImage = coursesPic;
      // console.log("bannerImage", coursesPic);
      const editData = { ...data, bannerImage };
      formData.append("data", JSON.stringify(editData));
      formData.append("course_banner", coursesPic);

      await updateCourse({ data: formData, _id: courseId }).unwrap();
      message.success("Course Updated Successfully");
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
      message.error(error?.message);
    }
  };
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "slno",
      key: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Course Name",
      key: "title",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img src={record.bannerImage} alt="" className="w-10 h-10" />
          <span>{record.title}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Total Seat",
      dataIndex: "totalSeat",
      key: "totalSeat",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBorderColor: "rgb(47,84,235)",
                defaultHoverColor: "rgb(47,84,235)",
                defaultBorderColor: "rgb(47,84,235)",
              },
            },
          }}
        >
          <Space size="middle">
            <button onClick={() => handleEdit(record?._id)}>
              <AiOutlineEdit className="text-2xl" />
            </button>
            <button onClick={() => handleDelete(record?._id)}>
              <FaTrashAlt className="text-2xl"></FaTrashAlt>
            </button>
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <GoBackButton text="Manage Course" />
        <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    borderRadius: 0,
                    hoverBorderColor: "none",
                    activeBorderColor: "none",
                  },
                },
              }}
            >
              <div className="flex gap-2 items-center relative">
                <Input
                  placeholder="Search course"
                  allowClear
                  size="large"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onPressEnter={handleSearch}
                />

                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primaryColor text-white p-2 rounded-r-lg bg-primary"
                >
                  search
                </button>
              </div>
            </ConfigProvider>
            <button
              onClick={showModal}
              className="bg-primary text-white py-2 px-4 rounded-md"
            >
              Add new course
            </button>
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto">
        <Table
          columns={columns}
          dataSource={courses || []}
          pagination={false}
          rowKey="id"
        />
      </div>

      <div className="mt-10 flex justify-center items-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={courseData?.data?.meta?.total}
          onChange={handlePageChange}
        />
      </div>

      {/* Add course modal */}

      <Modal
        title="Add New Course"
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleAddModalClose}
        footer={false}
        width={800}
      >
        <Form
          onFinish={onFinish}
          name="add-token"
          initialValues={{ remember: false }}
          layout="vertical"
        >
          <div className="w-full">
            <Form.Item
              name="bannerImage"
              label={<p className=" text-md">Add Course Banner image</p>}
              required
            >
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  // onChange={handlecoursesPicUpload}
                  beforeUpload={handleBefoeUpload}
                  maxCount={1}
                  className=" "
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
                      <p className="text-secondary">{coursesPic?.name}</p>
                    </>
                  )}
                </Upload>
              </div>
            </Form.Item>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="title"
                label={<p className=" text-md">Course Name</p>}
                required
              >
                <Input
                  className=" text-md"
                  placeholder="Type Course Name"
                ></Input>
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="name"
                label={<p className=" text-md">Instructor Name</p>}
                required
              >
                <Input
                  className=" text-md"
                  placeholder="Type Instructor Name"
                ></Input>
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="duration"
                label={<p className=" text-md">Duration</p>}
                required
                // rules={[
                //   {
                //     required: true,
                //     message: "Duration must be at least 1.",
                //     type: "number",
                //     min: 1,
                //   },
                // ]}
              >
                <Input
                  style={{ width: "100%" }}
                  className=" text-md"
                  placeholder="Type  duration"
                ></Input>
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="startDate"
                label={<p className=" text-md">Start Date</p>}
                required
              >
                <DatePicker style={{ width: "100%" }}></DatePicker>
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="price"
                label={<p className=" text-md">Price</p>}
                rules={[
                  {
                    required: true,
                    message: "Price must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="Type Price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="totalSeat"
                label={<p className=" text-md">Total Seat </p>}
                rules={[
                  {
                    required: true,
                    message: "Total seat must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="Type Total Seat"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="description"
            label={<p className=" text-md">Description</p>}
            required
          >
            <Input.TextArea rows={4}></Input.TextArea>
          </Form.Item>

          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              <button className="px-6 py-2 rounded-md bg-primary text-white">
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {/* Edit Modal */}
      <Modal
        title="Edit Course"
        open={isEditModalOpen}
        onOk={handlEditeOk}
        onCancel={handleEditModalClose}
        footer={false}
        width={800}
      >
        <Form
          onFinish={onEditFInish}
          name="edit-course"
          layout="vertical"
          form={form}
        >
          <div className="w-full">
            <Form.Item
              name="bannerImage"
              label={<p className=" text-md">Add Course Banner image</p>}
            >
              <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                <Upload
                  showUploadList={false}
                  // onChange={handlecoursesPicUpload}
                  beforeUpload={handleBefoeUpload}
                  maxCount={1}
                  className=" "
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
                      <p className="text-secondary">{coursesPic?.name}</p>
                    </>
                  )}
                </Upload>
              </div>
            </Form.Item>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="title"
                label={<p className=" text-md">Course Name</p>}
              >
                <Input
                  className=" text-md"
                  placeholder="Type Course Name"
                ></Input>
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="name"
                label={<p className=" text-md">Instructor Name</p>}
              >
                <Input
                  className=" text-md"
                  placeholder="Type Instructor Name"
                ></Input>
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="duration"
                label={<p className=" text-md">Duration</p>}
              >
                <Input
                  className=" text-md"
                  placeholder="Type  duration"
                ></Input>
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="startDate"
                label={<p className=" text-md">Start Date</p>}
              >
                <DatePicker style={{ width: "100%" }}></DatePicker>
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="price"
                label={<p className=" text-md">Price</p>}
                rules={[
                  {
                    // required: true,
                    message: "Price must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="Type Price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="totalSeat"
                label={<p className=" text-md">Total Seat </p>}
                rules={[
                  {
                    required: true,
                    message: "Total seat must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="Type Total Seat"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="description"
            label={<p className=" text-md">Description</p>}
          >
            <Input.TextArea rows={4}></Input.TextArea>
          </Form.Item>

          <Form.Item type="submit">
            <div className="flex justify-center items-center gap-2">
              <button className="px-6 py-2 rounded-md bg-primary text-white">
                Save
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCourse;
