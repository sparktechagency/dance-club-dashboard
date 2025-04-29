import { useState } from "react";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { FaPen } from "react-icons/fa";
import { DatePicker, Form, Input, Modal, Table } from "antd";

const ManagePackage = () => {
  const Data = [
    {
      token_number: "1",
      price: "$1000",
      duration: "1 Month",
    },
    {
      token_number: "2",
      price: "$2000",
      duration: "2 Month",
    },
    {
      token_number: "3",
      price: "$3000",
      duration: "3 Month",
    },
  ];
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddPackage = () => {
    setIsAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };
  const handleOk = () => {
    setIsAddModalOpen(false);
  };
  const handleEDitPackage = () => {
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handlEditeOk = () => {
    setIsEditModalOpen(false);
  };

  const onFinish = () => {};
  const onEditFInish = () => {};

  const columns = [
    {
      title: "Token No",
      dataIndex: "token_number",
      key: "token_number",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (_, record) => (
        <span className="bg-primary text-black px-4 py-2 rounded-lg font-bold">
          ${record.price}
        </span>
      ),
    },
    {
      title: "Expiry",
      dataIndex: "duration",
      render: (_, record) => (
        <span className="bg-secondary text-white px-4 py-2 rounded-lg font-bold">
          {record.duration}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <div className="flex gap-2">
          <button onClick={handleEDitPackage} className="text-primary">
            <FaPen />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <GoBackButton text={"Package Management"} />
        <button
          onClick={handleAddPackage}
          className="px-4 py-2 rounded-md bg-primary text-white"
        >
          Add New Token
        </button>
      </div>
      <div className="mt-10 max-w-screen-xl mx-auto">
        <Table
          columns={columns}
          dataSource={Data || []}
          pagination={false}
          rowKey="id"
        />
      </div>

      <Modal
        title="Add New Token"
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
          <Form.Item
            name="token_number"
            label={<p className=" text-md">Token Number</p>}
          >
            <Input className=" text-md" placeholder="Type Token Number"></Input>
          </Form.Item>
          <Form.Item
            name="price"
            label={<p className=" text-md">Token Price</p>}
          >
            <Input className=" text-md" placeholder="Type Token Price"></Input>
          </Form.Item>
          <Form.Item
            name="expiry"
            label={<p className=" text-md">Token Expiry Date</p>}
          >
            <DatePicker style={{ width: "100%" }}></DatePicker>
          </Form.Item>
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
      {/* Edit Modal */}
      <Modal
        title="Edit Token"
        open={isEditModalOpen}
        onOk={handlEditeOk}
        onCancel={handleEditModalClose}
        footer={false}
      >
        <Form
          name="add-token"
          initialValues={{ remember: false }}
          layout="vertical"
          onFinish={onEditFInish}
        >
          <Form.Item
            name="token_number"
            label={<p className=" text-md">Token Number</p>}
          >
            <Input className=" text-md" placeholder="Type Token Number"></Input>
          </Form.Item>
          <Form.Item
            name="price"
            label={<p className=" text-md">Token Price</p>}
          >
            <Input className=" text-md" placeholder="Type Token Price"></Input>
          </Form.Item>
          <Form.Item
            name="expiry"
            label={<p className=" text-md">Token Expiry Date</p>}
          >
            <DatePicker style={{ width: "100%" }}></DatePicker>
          </Form.Item>
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

export default ManagePackage;
