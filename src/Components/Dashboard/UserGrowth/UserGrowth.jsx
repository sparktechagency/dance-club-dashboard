/* eslint-disable no-unused-vars */
import { DatePicker } from "antd";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetErnaningsQuery } from "../../../redux/api/features/dashboard/dashboardApi";

const UserGrowth = () => {
  const [selectedYear, setselectedYear] = useState(dayjs().year());
  const [selectedMonth, setselectedMonth] = useState(dayjs().month() + 1);

  const { data: EarningData } = useGetErnaningsQuery(selectedYear);
  // console.log("EarningData", EarningData?.data?.chartData);
  // Mock data
  const mockData = EarningData?.data?.chartData;

  // const maxValue = Math.max(...mockData.map((item) => item.Merchandise));
  // const normalizeData = mockData.map((item) => ({
  //   ...item,
  //   Merchandise: (item.Merchandise / maxValue) * 100,
  // }));

  const onChange = (date) => {
    if (date) {
      setselectedYear(dayjs(date));
    }
  };

  return (
    <div className="mt-4 p-4">
      <div className="bg-gray-50 rounded-lg shadow px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium">Merchandise Growth</h1>
          <DatePicker
            onChange={onChange}
            defaultValue={dayjs(dayjs())}
            format={"YYYY"}
            picker="year"
            className="w-full md:w-auto"
          />
        </div>

        {/* Chart Section */}
        <div className="mt-6" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}`} />
              <Tooltip formatter={(value) => `${value.toFixed(2)}`} />
              <Legend />
              <Bar
                dataKey="totalProductEarning"
                fill="#f4660e"
                barSize={10}
                radius={[5, 5, 0, 0]}
              />
              <Bar
                dataKey="totalTokenEarning"
                fill="#000000"
                barSize={10}
                radius={[5, 5, 0, 0]}
              />
              <Bar
                dataKey="totalCourseEarning"
                fill="#325bdf"
                barSize={10}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserGrowth;
