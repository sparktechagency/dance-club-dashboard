/* eslint-disable no-unused-vars */
import { Form, Input, InputNumber, Select, Upload, Space, message } from "antd";
import GoBackButton from "../Shared/GobackButton/GoBackButton";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useCreateProductMutation } from "../../redux/api/features/productApi/productApi";
import { useGetCategoryForProductQuery } from "../../redux/api/features/categoryApi/categoryApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [createProduct] = useCreateProductMutation();
  const { data: getAllCategory } = useGetCategoryForProductQuery();
  const navigate = useNavigate();
  const options = [
    { label: "XS", value: "XS", desc: "XS (Xtra Small)" },
    { label: "S", value: "S", desc: "S (Small)" },
    { label: "M", value: "M", desc: "M (Medium)" },
    { label: "L", value: "L", desc: "L (Large)" },
    { label: "XL", value: "XL", desc: "XL (Xtra Large)" },
    { label: "XXL", value: "XXL", desc: "XXL (Xtra Xtra Large)" },
  ];

  const categoryOptions = getAllCategory?.data?.result.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const onFinish = async (values) => {
    try {
      const data = {
        name: values.title,
        price: values.price,
        category: values.category,
        stock: values.stock,
        description: values.description,
        size: values.size,
        color: values.color ? values.color.split(",").map((c) => c.trim()) : [],
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      fileList.forEach((file) => {
        formData.append("product_image", file);
      });

      await createProduct(formData).unwrap();
      message.success("Product added successfully!");
      form.resetFields();
      setFileList([]);
      navigate("/manage-product");
    } catch (error) {
      message.error("Failed to add product.");
    }
  };

  const handleBeforeUpload = (file) => {
    setFileList((prevList) => [...prevList, file]);
    return false; // prevent automatic upload
  };

  const removeImage = (fileToRemove) => {
    setFileList((prevList) =>
      prevList.filter((file) => file.uid !== fileToRemove.uid)
    );
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <GoBackButton text={"Add Product"} />
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
                name="product_image"
                label={<p className="text-md">Add Product Images</p>}
                required
              >
                <div className="border border-dashed border-secondary p-3">
                  <div className="flex gap-3 flex-wrap">
                    {fileList.map((file) => (
                      <div
                        key={file.uid}
                        className="relative w-24 h-24 border rounded overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(file)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs"
                        >
                          <FaTimes className="text-red-600" />
                        </button>
                      </div>
                    ))}

                    <Upload
                      multiple
                      showUploadList={false}
                      beforeUpload={handleBeforeUpload}
                    >
                      <div className="w-24 h-24 border border-dashed flex items-center justify-center rounded cursor-pointer hover:bg-gray-100">
                        <FaPlus className="text-xl text-gray-500" />
                      </div>
                    </Upload>
                  </div>
                </div>
              </Form.Item>
            </div>

            <div className="w-full md:w-[50%] flex flex-col">
              <Form.Item
                name="title"
                label={<p className="text-md">Product Name</p>}
                required
              >
                <Input required placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                name="category"
                label={<p className="text-md">Product Category</p>}
                required
              >
                <Select options={categoryOptions} />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="size"
                label={<p className="text-md">Size</p>}
                required
              >
                <Select
                  mode="multiple"
                  placeholder="Select sizes"
                  onChange={handleChange}
                  options={options}
                  optionRender={(option) => <Space>{option.data.desc}</Space>}
                />
              </Form.Item>
            </div>

            <div className="w-full md:w-[50%]">
              <Form.Item
                name="color"
                label={<p className="text-md">Colors</p>}
                required
              >
                <Input placeholder="e.g. Red, Blue" />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-full md:w-[50%]">
              <Form.Item
                name="stock"
                label={<p className="text-md">Quantity</p>}
                rules={[
                  {
                    required: true,
                    message: "Quantity must be at least 1.",
                    type: "number",
                    min: 1,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter stock quantity"
                />
              </Form.Item>
            </div>

            <div className="w-full md:w-[50%]">
              <Form.Item
                name="price"
                label={<p className="text-md">Price</p>}
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
                  style={{ width: "100%" }}
                  placeholder="Enter price"
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="description"
            label={<p className="text-md">Description</p>}
            required
          >
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <div className="flex justify-center">
            <Form.Item>
              <button
                className="px-10 py-3 bg-primary text-white font-semibold md:text-xl shadow-lg rounded-xl"
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
