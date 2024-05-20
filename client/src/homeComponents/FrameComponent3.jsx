import { Button } from "@mui/material";
import "./FrameComponent3.css";

const FrameComponent3 = () => {
  return (
    <div className="frame-wrapper4">
      <div className="frame-parent7">
        <Button
          className="frame-child2"
          disableElevation={true}
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#fff",
            fontSize: "20",
            background: "#0079ff",
            borderRadius: "30px",
            "&:hover": { background: "#0079ff" },
            height: 61,
          }}
        >
          start free trail
        </Button>
        <div className="frame-wrapper5">
          <Button
            className="frame-child3"
            disableElevation={true}
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#000",
              fontSize: "15",
              background: "#fff",
              border: "#000 solid 1px",
              borderRadius: "30px",
              "&:hover": { background: "#fff" },
              height: 61,
            }}
          >
            contatct sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent3;
