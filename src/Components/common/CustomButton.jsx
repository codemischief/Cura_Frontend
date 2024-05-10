import PropTypes from "prop-types";
import { Add } from "@mui/icons-material";

const AddButton = ({ onClick = () => {}, title = "Add new", icon }) => {
  return (
    <button
      className={`bg-[#004DD7] text-white text-sm font-semibold leading-[135%] h-[36px] w-[279px] rounded-lg flex gap-4 justify-center items-center`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-4">{title}</div>
      {!icon ? <Add sx={{ height: "18px", width: "18px" }} /> : icon}
    </button>
  );
};

export default AddButton;

AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.element,
};


