import { Button } from "@mui/material";
import PropTypes from "prop-types";

const Butoon = ({ className = "" ,type}) => {
  return (
    <Button
      className={`self-stretch h-[2.625rem] ${className}`}
      disableElevation
      variant="contained"
      sx={{
        color: "#fff",
        fontSize: "14",
        background: "linear-gradient(90deg, #2d469a, #1e9e8c)",
        borderRadius: "4px",
        "&:hover": { background: "linear-gradient(90deg, #2d469a, #1e9e8c)" },
        height: 42,
      }}
      type={type}
    >
      Sign In
      
    </Button>
  );
};

Butoon.propTypes = {
  className: PropTypes.string,
};

export default Butoon;
