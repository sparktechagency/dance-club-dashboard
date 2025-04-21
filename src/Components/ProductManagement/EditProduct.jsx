import { Form, Input, InputNumber, Upload } from "antd";
import GoBackButton from "../Shared/GobackButton/GoBackButton";
import {  FaImage } from "react-icons/fa";

const EditProduct = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const handleOk = () => {};
  const handleProfilePicUpload = () => {};
  return (
    <div>
      <GoBackButton text={"Edit Product"} />
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
                name="title"
                label={<p className=" text-md">Edit Product image</p>}
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
            <div className="w-full md:w-[50%] flex flex-col">
              <Form.Item
                name="title"
                label={<p className=" text-md">Product Name</p>}
                style={{}}
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item name="price" label={<p className=" text-md">Price</p>}>
                <InputNumber
                  required
                  style={{ padding: "6px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="size"
            label={<p className=" text-md">size</p>}
            style={{}}
          >
            <InputNumber
              required
              style={{ padding: "6px", width: "100%" }}
              className=" text-md"
              placeholder="tittle here..."
            />
          </Form.Item>
          <Form.Item
            name="coupon"
            label={<p className=" text-md">Coupon Code</p>}
            style={{}}
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
            style={{}}
          >
            <Input.TextArea
              rows={4}
              required
              style={{ padding: "6px" }}
              className=" text-md"
              placeholder=""
            />
          </Form.Item>
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

export default EditProduct;
