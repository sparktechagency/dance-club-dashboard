/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useCreatePrivacyMutation,
  useGetPrivacyQuery,
} from "../../../redux/api/features/settingsApi/settingsApi";
import { message, Spin } from "antd";

const PrivacyPolicy = () => {
  const [value, setValue] = useState("");
  const { data: privacyData, isLoading } = useGetPrivacyQuery();
  const [createPrivacy] = useCreatePrivacyMutation();
  //   console.log("privacyData", privacyData?.data?.description);

  useEffect(() => {
    if (privacyData?.data?.description) {
      setValue(privacyData.data.description);
    }
  }, [privacyData]);

  const handleSubmit = async () => {
    const data = { description: value };
    try {
      await createPrivacy(data).unwrap();
      setValue("");
      message.success("Privacy Policy Updated Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-2 mb-10">
      <div className="">
        {/* show about data */}
        <Spin spinning={isLoading}>
          <ReactQuill
            style={{ height: 600 }}
            theme="snow"
            value={value}
            onChange={setValue}
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-10 py-3 mt-20  md:my-16 rounded bg-primary text-white font-semiboldbold shadow-lg flex justify-center items-center"
            type="submit"
          >
            {isLoading ? "Updating..." : "Save"}
          </button>
        </Spin>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
