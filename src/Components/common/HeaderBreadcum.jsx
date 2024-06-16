import PropTypes from "prop-types";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const HeaderBreadcrum = ({ heading, path , handleBack = () => {} }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-3 mt-1">
      <button onClick={() => navigate(-1)}>
        <div className="rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center ">

          <ArrowBack />
        </div>
      </button>

      <div className="flex flex-col gap-1">
        <h1 className="text-[1.3125rem] text-[#282828] leading-[1.125rem] font-sans">{heading}</h1>
        <p className="text-[0.875rem] leading-[1.3125rem] text-[#282828] font-sans">
          {path?.map((data, index) => (
            <>
              {data}
              {index !== path.length - 1 && " > "}
            </>
          ))}
        </p>
      </div>
    </div>
  );
};

export default HeaderBreadcrum;

HeaderBreadcrum.propTypes = {
  heading: PropTypes.string.isRequired,
  path: PropTypes.arrayOf(PropTypes.string).isRequired,
};
