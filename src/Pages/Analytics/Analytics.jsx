import AnalyticsInfo from "../../Components/Dashboard/AnalyticsInfo/AnalyticsInfo";
import AnalyticsTable from "../../Components/Dashboard/AnalyticsTable/AnalyticsTable";
import SubscriptionGrowth from "../../Components/Dashboard/SubscriptionGrowth/SubscriptionGrowth";
import UserGrowth from "../../Components/Dashboard/UserGrowth/UserGrowth";

const Analytics = () => {
  return (
    <div>
      <AnalyticsInfo />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SubscriptionGrowth />
        <UserGrowth />
      </div>
      <AnalyticsTable />
    </div>
  );
};

export default Analytics;
