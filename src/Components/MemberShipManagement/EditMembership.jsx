import { Form, Input, InputNumber} from "antd";
import GoBackButton from "../Shared/GobackButton/GoBackButton";

const EditMembership = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const handleOk = () => {};
  return (
    <div>
      <GoBackButton text={"Edit Membership"} />
      <div className="mt-5">
        <Form
          name="add-membership"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Form.Item
              name="title"
              label={<p className=" text-md">Package Name</p>}
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
              name="title"
              label={<p className=" text-md">Total Token</p>}
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
              name="price"
              label={<p className=" text-md">Price</p>}
              style={{}}
            >
              <InputNumber
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name="expires_in"
              label={<p className=" text-md">Expires In</p>}
              style={{}}
            >
              <InputNumber
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder=""
              />
            </Form.Item>
          </div>

          <div className="flex justify-center ">
            <Form.Item>
              <button
                onClick={handleOk}
                className="px-10 py-3 bg-primary text-white font-semiboldbold md:text-xl  shadow-lg rounded-xl"
                type="submit"
              >
                Save
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditMembership;
