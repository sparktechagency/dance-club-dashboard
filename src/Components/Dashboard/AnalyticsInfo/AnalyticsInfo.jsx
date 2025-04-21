import { Col } from "antd";


const AnalyticsInfo = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/*User*/}
        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">18.6K</p>
            <p className="text-base md:text-lg ">Total User</p>
          </div>
        </Col>
        {/* user  */}
        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">18.6K</p>
            <p className="text-base md:text-lg ">
              Total Membership User
            </p>
          </div>
        </Col>
        {/* patient */}
        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">18.6K</p>
            <p className="text-base md:text-lg ">Total Products</p>
          </div>
        </Col>
        {/* doctor */}
        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">18.6K</p>
            <p className="text-base md:text-lg ">Total Class</p>
          </div>
        </Col>
        {/* blocked      */}
        <Col>
          <div className="flex flex-col  border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <p className=" text-xl font-bold">18.6K</p>
            <p className="text-base md:text-lg ">Total Earning</p>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default AnalyticsInfo;
