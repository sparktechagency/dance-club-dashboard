import { AllImages } from "../../assets/image/AllImages";
import GoBackButton from "../../Components/Shared/GobackButton/GoBackButton";

const ManageBanner = () => {
  return (
    <div>
      <GoBackButton text={"Banner Managements"} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-neutral-200 p-5 rounded-xl flex flex-col gap-5">
          <div className="bg-[#37474f] text-white  rounded-xl">
            <div className="flex  justify-between items-center gap-5 ">
              <div className="p-3">
                <h1 className="text-xl font-bold text-center">
                  BMX Racing Tracks
                </h1>
                <p className=" text-center">
                  Rock Hill BMX Supercross Track (USA)
                </p>
                <p className=" text-center">Papendal BMX Track (Netherlands)</p>
              </div>
              <img src={AllImages.banner2} alt="" className="w-52 h-40 " />
            </div>
          </div>
        <button className="text-xl font-bold px-4 py-1 rounded-md">Edit</button>
        </div>
        <div className="bg-neutral-200 p-5 rounded-xl flex flex-col gap-5">
          <div className="bg-[#f2e2cd] text-neutral-500  rounded-xl">
            <div className="flex  justify-between items-center gap-5 ">
              <div className="p-3">
                <h1 className="text-xl font-bold text-center">
                  BMX Racing Tracks
                </h1>
                <p className=" text-center">
                  Rock Hill BMX Supercross Track (USA)
                </p>
                <p className=" text-center">Papendal BMX Track (Netherlands)</p>
              </div>
              <img src={AllImages.banner} alt="" className="w-52 h-40 p-3" />
            </div>
          </div>
        <button className="text-xl font-bold px-4 py-1 rounded-md">Edit</button>
        </div>
        <div className="bg-neutral-200 p-5 rounded-xl flex flex-col gap-5">
          <div className="bg-[#968a33] text-white  rounded-xl">
            <div className="flex  justify-between items-center gap-5 ">
              <div className="p-3">
                <h1 className="text-xl font-bold text-center">
                  BMX Racing Tracks
                </h1>
                <p className=" text-center">
                  Rock Hill BMX Supercross Track (USA)
                </p>
                <p className=" text-center">Papendal BMX Track (Netherlands)</p>
              </div>
              <img src={AllImages.banner2} alt="" className="w-52 h-40" />
            </div>
          </div>
        <button className="text-xl font-bold px-4 py-1 rounded-md">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ManageBanner;
