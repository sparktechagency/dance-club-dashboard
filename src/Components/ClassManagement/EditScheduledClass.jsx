/* eslint-disable no-unused-vars */
import {
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

const EditScheduledClass = () => {
  const [form] = Form.useForm();
  const [banner, setbanner] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const location = useLocation();
  const nevigate = useNavigate();
  const [isScheduled, setIsScheduled] = useState(true);
  const TypeOfClass = location.state?.classType;
  if (!TypeOfClass === "Scheduled Class") {
    setIsScheduled(false);
  }
  const classData = location.state.classData;
  console.log("record:", classData);
  const _id = classData?._id;
  console.log("Id", _id);

  const handleBeforeUpload = (file) => {
    form.setFieldsValue({ class_banner: [file] });
    setbanner(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };

  const [updateClass] = useUpdateClassMutation();

  useEffect(() => {
    if (classData) {
      if (classData.class_banner) {
        setPreviewImage(`${classData.class_banner}`);
      }

      setIsScheduled(classData?.classType === "Scheduled Class");

      form.setFieldsValue({
        title: classData.title,
        description: classData.description,
        tokenNeedForBook: classData.tokenNeedForBook,
        classType: classData.classType,
        // isScheduled: isScheduled,
        totalSeat: classData.totalSeat,
        location: classData.location,
        instructorName: classData.instructorName,
        classSchedule: [
          {
            day: classData.day,
            time: classData.time?.format("HH:mm"),
            durationInMinutes: classData.durationInMinutes,
          },
        ],
      });
    }
  }, [classData, form]);

  const onFinish = async (values) => {
    const data = {
      title: values.title,
      description: values.description,
      tokenNeedForBook: values.tokenNeedForBook,
      classType: values.classType,
      isScheduled: isScheduled,
      totalSeat: values.totalSeat,
      location: values.location,
      instructorName: values.instructorName,
      classSchedule: [
        {
          day: values.day,
          time: values.time?.format("HH:mm"),
          durationInMinutes: values.durationInMinutes,
        },
      ],
    };
    // console.log(data);

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
      message.error("Failed to Updated class.");
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
      <GoBackButton text={"Edit Scheduled class"} />

      <div className="mt-5">
        <Form
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
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<p className=" text-md">Description</p>}
              >
                <Input
                  required
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
                style={{}}
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
                label={<p className=" text-md">Total Seat</p>}
                style={{}}
              >
                <InputNumber
                  required
                  style={{ padding: "3px", width: "100%" }}
                  className=" text-md"
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="instructorName"
                label={<p className=" text-md">Instructor Name</p>}
                style={{}}
              >
                <Input
                  required
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
                style={{}}
              >
                <Input
                  required
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
                style={{}}
              >
                <InputNumber
                  required
                  style={{ width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="day"
                label={<p className=" text-md">Day</p>}
                style={{}}
              >
                <Select placeholder="Select Day" style={{ width: "100%" }}>
                  <Select.Option value="Saturday">Saturday</Select.Option>
                  <Select.Option value="Sunday">Sunday</Select.Option>
                  <Select.Option value="Monday">Monday</Select.Option>
                  <Select.Option value="Tuesday">Tuesday</Select.Option>
                  <Select.Option value="Wednesday">Wednesday</Select.Option>
                  <Select.Option value="Thursday">Thursday</Select.Option>
                  <Select.Option value="Friday">Friday</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="time"
                label={<p className=" text-md">Time</p>}
                style={{}}
              >
                <TimePicker
                  required
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
                style={{}}
              >
                <InputNumber
                  required
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

export default EditScheduledClass;
