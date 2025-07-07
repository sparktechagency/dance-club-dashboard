/* eslint-disable no-unused-vars */
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  TimePicker,
  Upload,
} from "antd";
import GoBackButton from "../Shared/GobackButton/GoBackButton";
import { FaImage } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useUpdateClassMutation } from "../../redux/api/features/classApi/classApi";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const EditNonScheduledClass = () => {
  const [form] = Form.useForm();
  const [banner, setbanner] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const location = useLocation();
  const nevigate = useNavigate();
  const [isScheduled, setIsScheduled] = useState(false);

  const TypeOfClass = location.state?.classType;
  if (!TypeOfClass === "Scheduled Class") {
    setIsScheduled(false);
  }

  const classData = location.state.classData;
  console.log("record:", classData);
  const _id = classData?._id;
  console.log("Id", _id);

  useEffect(() => {
    if (classData) {
      // Set default banner preview if existing
      if (classData.class_banner) {
        setPreviewImage(`${classData.class_banner}`);
      }

      setIsScheduled(classData?.classType === "Scheduled Class");

      form.setFieldsValue({
        title: classData.title,
        description: classData.description,
        tokenNeedForBook: classData.tokenNeedForBook,
        classType: classData.classType,
        date: classData.date ? dayjs(classData.date) : null,
        time: classData.time ? dayjs(classData.time, "HH:mm") : null,
        durationInMinutes: classData.durationInMinutes,
        totalSeat: classData.totalSeat,
        location: classData.location,
        instructorName: classData.instructorName,
      });
    }
  }, [classData, form]);

  // console.log("banner", isScheduled);

  const handleBeforeUpload = (file) => {
    form.setFieldsValue({ class_banner: [file] });
    setbanner(file);
    setPreviewImage(URL.createObjectURL(file));
    return false; // Prevent auto upload
  };

  const [updateClass] = useUpdateClassMutation();

  const onFinish = async (values) => {
    const time = values?.time ? dayjs(values.time).format("HH:mm") : "";

    const data = {
      title: values.title,
      description: values?.description,
      tokenNeedForBook: values?.tokenNeedForBook,
      classType: values?.classType,
      isScheduled: isScheduled,
      date: values.date,
      time: time,
      durationInMinutes: values?.durationInMinutes,
      totalSeat: values.totalSeat,
      location: values.location,
      instructorName: values.instructorName,
    };

    console.log(data);

    try {
      if (!banner) {
        message.error("Please upload a class banner image.");
        return;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("class_banner", banner);

      await updateClass({ _id: _id, data: formData }).unwrap();
      message.success("Class Updated successfully!");
      form.resetFields();
      setbanner(null);
      setPreviewImage(null);
      nevigate("/manage-class");
    } catch (error) {
      console.log(error);
      message.error("Failed to Update class.");
    }
  };

  const handleOk = () => {};
  const handleProfilePicUpload = (e) => {
    const file = e.file.originFileObj;
    setbanner(file);
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <GoBackButton text={"Edit Non Scheduled class"} />

      <div className="mt-5">
        <Form
          form={form}
          name="add-product"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="class_banner"
                label={<p className=" text-md">Add Class image</p>}
                required
              >
                <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                  <Upload
                    showUploadList={false}
                    maxCount={1}
                    beforeUpload={handleBeforeUpload}
                    // onChange={handleProfilePicUpload}
                    setFileList={setbanner}
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
                        <p className="text-secondary">{banner?.name}</p>
                      </>
                    )}
                  </Upload>
                </div>
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%] flex flex-col">
              <Form.Item
                name="title"
                label={<p className=" text-md">Class Name</p>}
                required
              >
                <Input
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<p className=" text-md">Description</p>}
                required
              >
                <Input
                  style={{ padding: "6px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="classType"
                label={<p className=" text-md">class Type</p>}
                required
              >
                <Select
                  placeholder="Select Class Type"
                  style={{ width: "100%" }}
                >
                  <Select.Option value="POPUP_CLASS">POPUP_CLASS</Select.Option>
                  <Select.Option value="NORMAL_CLASS">
                    NORMAL_CLASS
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="totalSeat"
                label={<p className="text-md">Total Seat</p>}
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
                  style={{ padding: "3px", width: "100%" }}
                  className="text-md"
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="instructorName"
                label={<p className=" text-md">Instructor Name</p>}
                required
              >
                <Input
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder="Add Instructor Name"
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="location"
                label={<p className=" text-md">location</p>}
                required
              >
                <Input
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder="Add Location"
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="tokenNeedForBook"
                label={<p className=" text-md">Token Need For Booking</p>}
                rules={[
                  {
                    required: true,
                    message: "Token must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="date"
                label={<p className=" text-md">Date</p>}
                required
              >
                <DatePicker
                  style={{ padding: "4px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="time"
                label={<p className=" text-md">Time</p>}
                required
              >
                <TimePicker
                  format="HH:mm"
                  style={{ padding: "6px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="durationInMinutes"
                label={<p className=" text-md">Duration</p>}
                required
              >
                <InputNumber
                  style={{ padding: "3px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-center ">
            <Form.Item>
              <button
                onClick={handleOk}
                className="px-10 py-3 bg-primary text-white font-semiboldbold md:text-xl  shadow-lg rounded-xl"
                type="submit"
              >
                Publish
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditNonScheduledClass;
