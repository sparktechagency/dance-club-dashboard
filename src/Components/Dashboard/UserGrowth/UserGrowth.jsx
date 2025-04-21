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

const UserGrowth = () => {
  const [selectedYear, setselectedYear] = useState(dayjs().year());
  const [selectedMonth, setselectedMonth] = useState(dayjs().month() + 1);

  // Mock data
  const mockData = [
    { name: "Jan", Merchandise: 100 },
    { name: "Feb", Merchandise: 45 },
    { name: "Mar", Merchandise: 35 },
    { name: "Apr", Merchandise: 100 },
    { name: "May", Merchandise: 20 },
    { name: "Jun", Merchandise: 80 },
    { name: "Jul", Merchandise: 70 },
    { name: "Aug", Merchandise: 40 },
    { name: "Sep", Merchandise: 60 },
    { name: "Oct", Merchandise: 50 },
    { name: "Nov", Merchandise: 30 },
    { name: "Dec", Merchandise: 10 },
  ];

  const maxValue = Math.max(...mockData.map((item) => item.Merchandise));
  const normalizeData = mockData.map((item) => ({
    ...item,
    Merchandise: (item.Merchandise / maxValue) * 100,
  }));

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setselectedYear(dateString.split("-")[0]);
    setselectedMonth(dateString.split("-")[1]);
  };

  return (
    <div className="mt-4 p-4">
      <div className="bg-gray-50 rounded-lg shadow px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium">Merchandise Growth</h1>
          <DatePicker
            onChange={onChange}
            defaultValue={dayjs(dayjs(), "YYYY-MM")}
            format={"YYYY-MM"}
            picker="month"
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
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}`} />
              <Tooltip formatter={(value) => `${value.toFixed(2)}`} />
              <Legend />
              <Bar
                dataKey="Merchandise"
                fill="#f4660e"
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
