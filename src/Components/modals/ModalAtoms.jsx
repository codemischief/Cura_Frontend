import PropTypes from "prop-types";
import { CrossIcon } from "../Svg/CrossIcon";

export const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg cursor-auto">
      <div className="mx-auto">
        <div className="text-[16px]">{title}</div>
      </div>
      <CrossIcon onClick={onClose} />
    </div>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
