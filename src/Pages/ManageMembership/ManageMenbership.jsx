import { FaPlus } from "react-icons/fa";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";
import { useNavigate } from "react-router-dom";

const ManageMenbership = () => {

  const navigate = useNavigate();
  const handleAddNewMembership = () => {
    navigate("/add-new-membership");
  };

  const handleEditMembership = () => {
    navigate('/edit-membership');
  };

  return (
    <div>
      <GoBackButton text={"Manage Membership"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-xl">
          <h1 className="text-xl font-bold text-center">Entry Package</h1>
          <div className="flex justify-between items-center">
            <div className="">
              <p>Single</p>
              <p className="font-semibold">$50</p>
            </div>
            <p>Expiry</p>
            <button
              onClick={handleEditMembership}
              className="bg-primary text-white px-4 py-1 rounded-md"
            >
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <p>Single</p>
              <p className="font-semibold">$50</p>
            </div>
            <p>6 Weeks</p>
            <button     onClick={handleEditMembership} className="bg-primary text-white px-4 py-1 rounded-md">
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <p>Single</p>
              <p className="font-semibold">$50</p>
            </div>
            <p>15 Weeks</p>
            <button     onClick={handleEditMembership} className="bg-primary text-white px-4 py-1 rounded-md">
              Edit
            </button>
          </div>
        </div>



        
        <div className="bg-white p-5 rounded-xl">
          <h1 className="text-xl font-bold text-center">
            Serious Learner Package
          </h1>
          <div className="flex justify-between items-center">
            <div className="">
              <p>Single</p>
              <p className="font-semibold">$50</p>
            </div>
            <p>Expiry</p>
            <button     onClick={handleEditMembership} className="bg-primary text-white px-4 py-1 rounded-md">
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <p>Single</p>
              <p className="font-semibold">$50</p>
            </div>
            <p>6 Weeks</p>
            <button     onClick={handleEditMembership} className="bg-primary text-white px-4 py-1 rounded-md">
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <p>Single</p>
              <p className="font-semibold">$50</p>
            </div>
            <p>15 Weeks</p>
            <button     onClick={handleEditMembership} className="bg-primary text-white px-4 py-1 rounded-md">
              Edit
            </button>
          </div>
        </div>
        <div
          onClick={handleAddNewMembership}
          className="bg-white border-2 border-dashed border-neutral-500 p-5 rounded-xl h-40 flex flex-col justify-center items-center cursor-pointer"
        >
          <FaPlus className="text-neutral-400"></FaPlus>
          <h1 className="text-xl font-bold text-center text-neutral-400">
            Add New Membership{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ManageMenbership;
