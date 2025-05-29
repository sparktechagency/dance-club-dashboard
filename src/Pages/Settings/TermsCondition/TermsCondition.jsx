/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useCreateTermsCOnditionMutation,
  useGetTremConditionQuery,
} from "../../../redux/api/features/settingsApi/settingsApi";
import { message, Spin } from "antd";

const TermsCondition = () => {
  const [value, setValue] = useState("");
  const { data: termsData, isLoading } = useGetTremConditionQuery();
  const [createTermsCOndition] = useCreateTermsCOnditionMutation();
  useEffect(() => {
    if (termsData?.data?.description) {
      setValue(termsData.data.description);
    }
  }, [termsData]);
  const handleSubmit = async (values) => {
    const data = { description: value };
    try {
      await createTermsCOndition(data).unwrap();
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
            Save
          </button>
        </Spin>
      </div>
    </div>
  );
};

export default TermsCondition;
