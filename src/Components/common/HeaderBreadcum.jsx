import PropTypes from "prop-types";
import { ArrowBack } from "@mui/icons-material";

const HeaderBreadcrum = ({ heading, path }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center ">
        <ArrowBack />
      </div>

      <div className="flex-col">
        <h1 className="text-[18px]">{heading}</h1>
        <p className="text-[14px]">
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
