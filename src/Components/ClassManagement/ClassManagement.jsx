import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  TimePicker,
  Upload,
} from "antd";
import GoBackButton from "../Shared/GobackButton/GoBackButton";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { useCraeteClassMutation } from "../../redux/api/features/classApi/classApi";

const ClassManagement = () => {
  const [form] = Form.useForm();
  const [banner, setbanner] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

console.log("banner", banner);

 const handleBeforeUpload = (file) => {
  form.setFieldsValue({ class_banner: [file] });
  setbanner(file);
  setPreviewImage(URL.createObjectURL(file));
  return false; // Prevent auto upload
};


  const [craeteClass] = useCraeteClassMutation();
const onFinish = async (values) => {
  const data = {
    title: values.title,
    description: values.description,
    tokenNeedForBook: Number(values.tokenNeedForBook),
    classType: values.classType,
    isScheduled: values.isScheduled === 1,
    date: values.date,
    time: values.time,
    durationInMinutes: values.durationInMinutes,
    totalSeat: values.totalSeat,
  };

  try {
    if (!banner) {
      message.error("Please upload a class banner image.");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("class_banner", banner);

    await craeteClass(formData).unwrap();
    message.success("Class added successfully!");
    form.resetFields();
    setbanner(null);
    setPreviewImage(null);
  } catch (error) {
    console.log(error);
    message.error("Failed to create class.");
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
      <GoBackButton text={"Add class"} />
  

      <div className="mt-5">
        <Form
          name="add-product"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="isScheduled" label={<p className=" text-md"></p>}>
            <Radio.Group
              onChange={onChange}
              value={value}
              options={[
                { value: 1, label: "Scheduled" },
                { value: 2, label: "Non-Scheduled" },
              ]}
            />
          </Form.Item>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="class_banner"
                label={<p className=" text-md">Add Product image</p>}
              >
                <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                  <Upload
                    showUploadList={false}
                    maxCount={1}
                    beforeUpload={handleBeforeUpload}
                    onChange={handleProfilePicUpload}
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
                label={<p className=" text-md">Product Name</p>}
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
                name="tokenNeedForBook"
                label={<p className=" text-md">Token Need For Booking</p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="date"
                label={<p className=" text-md">Date</p>}
                style={{}}
              >
                <DatePicker
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
                name="time"
                label={<p className=" text-md">Time</p>}
                style={{}}
              >
                <TimePicker
                  required
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

export default ClassManagement;
