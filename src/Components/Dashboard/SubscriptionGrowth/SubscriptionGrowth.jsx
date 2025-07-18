import { DatePicker } from "antd";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetUserChartDataQuery } from "../../../redux/api/features/dashboard/dashboardApi";

const SubscriptionGrowth = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  // console.log("selectedYear", selectedYear);
  const { data: userStatisticsData } = useGetUserChartDataQuery(selectedYear);

  const mockData = userStatisticsData?.data?.chartData;

  const onChange = (date) => {
    if (date) {
      setSelectedYear(dayjs(date).year());
    }
  };

  return (
    <div className="mt-4 p-4">
      <div className="bg-gray-50 rounded-lg shadow px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium">Membership Growth</h1>
          <DatePicker
            onChange={onChange}
            defaultValue={dayjs()}
            format={"YYYY"}
            picker="year"
            className="w-full md:w-auto"
          />
        </div>

        {/* Chart Section */}
        <div className="mt-6" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
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
              <Tooltip />
              <Area
                type="monotone"
                dataKey="totalUser"
                stroke="#f4660e"
                fillOpacity={1}
                fill="#f4660e"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionGrowth;
