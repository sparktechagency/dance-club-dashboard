/* eslint-disable no-unused-vars */
import { Form, Input, InputNumber, Select, Upload, Space, message } from "antd";
import GoBackButton from "../Shared/GobackButton/GoBackButton";
import { FaImage } from "react-icons/fa";
import { useCreateProductMutation } from "../../redux/api/features/productApi/productApi";
import { useGetCategoryForProductQuery } from "../../redux/api/features/categoryApi/categoryApi";
import { useState } from "react";

const AddProduct = () => {
  const [form] = Form.useForm();
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [createProduct] = useCreateProductMutation();
  const { data: getAllCategory } = useGetCategoryForProductQuery();
  console.log(getAllCategory?.data?.result);
  const options = [
    {
      label: "XS",
      value: "XS",
      desc: "XS (Xtra Small)",
    },
    {
      label: "S",
      value: "S",
      desc: "S (Small)",
    },
    {
      label: "M",
      value: "M",
      desc: "M (Medium)",
    },
    {
      label: "L",
      value: "L",
      desc: "L (Large)",
    },
    {
      label: "XL",
      value: "XL",
      desc: "XL (Xtra Large)",
    },
    {
      label: "XXL",
      value: "XXL",
      desc: "XXL (Xtra Xtra Large)",
    },
  ];

  const formData = new FormData();

  const onFinish = async (values) => {
  try {
    const data = {
      name: values.title,
      price: values.price,
      category: values.category,
      stock: values.stock,
      description: values.description,
      size: values.size,
      color: values.color ? values.color.split(",").map(c => c.trim()) : [],
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    fileList.forEach((file) => {
      formData.append("product_image", file); // If backend expects multiple images under same field
    });

    await createProduct(formData).unwrap();
    message.success("Product added successfully!");
    form.resetFields();
    setFileList([]);
  } catch (error) {
    message.error("Failed to add product.");
  }
};



  
  const categoryOptions = getAllCategory?.data?.result.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const handleBeforeUpload = (file) => {
    form.setFieldValue("images", file);
    setProfilePic(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };

  const handleOk = () => {};
  const handleProfilePicUpload = () => {};
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <GoBackButton text={"Add Product"} />
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
                name="product_image"
                label={<p className=" text-md">Add Product image</p>}
              >
                <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40">
                  <Upload
                    showUploadList={false}
                    onChange={handleProfilePicUpload}
                    beforeUpload={handleBeforeUpload}
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
              <Form.Item
                name="category"
                label={<p className=" text-md">Product Category</p>}
                style={{}}
              >
                <Select options={categoryOptions}></Select>
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="size"
                label={<p className=" text-md">size</p>}
                style={{}}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select one country"
                  defaultValue={["china"]}
                  onChange={handleChange}
                  options={options}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.label}>
                        {option.data.emoji}
                      </span>
                      {option.data.desc}
                    </Space>
                  )}
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="color"
                label={<p className=" text-md">Colors</p>}
                style={{}}
              >
                <Input placeholder="Add Colors"></Input>
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="stock"
                label={<p className=" text-md">Quantity</p>}
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
            <div className="w-full md:w-[50%]">
              <Form.Item name="price" label={<p className=" text-md">Price</p>}>
                <InputNumber
                  required
                  style={{ padding: "3px", width: "100%" }}
                  className=" text-md"
                  placeholder=""
                />
              </Form.Item>
            </div>
          </div>
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
                Submit
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
