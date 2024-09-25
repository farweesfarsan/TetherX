import PropTypes from "prop-types";

const FrameIcon = ({ className = "", frame4 }) => {
  return (
    <img
      className={`w-[9.875rem] h-[3rem] relative object-contain ${className}`}
      loading="lazy"
      alt=""
      src={frame4}
    />
  );
};

FrameIcon.propTypes = {
  className: PropTypes.string,
  frame4: PropTypes.string,
};

export default FrameIcon;
