/* eslint-disable react/prop-types */
import { FaArrowLeft } from "react-icons/fa";

const GoBackButton = ({text}) => {
    const habdleBack = () => {
        window.history.back();
    }
    return (
        <div>
            <button onClick={habdleBack} className="text-xl text-secondary flex justify-start items-center gap-2 mx-2 md:mx-0 py-7">
                <FaArrowLeft />
                {text}
            </button>
        </div>
    );
};

export default GoBackButton;