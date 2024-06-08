import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <div className="h-[calc(100vh-6.3rem)] flex w-screen">
      <div className="px-[1.25rem] pt-[0.5rem] w-full">{children}</div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
