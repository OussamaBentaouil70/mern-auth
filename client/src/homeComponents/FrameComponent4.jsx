import { Button } from "@mui/material";
import "./FrameComponent4.css";

const FrameComponent4 = () => {
  return (
    <section className="frame-section">
      <div className="frame-parent5">
        <div className="frame-wrapper3">
          <div className="rectangle-container">
            <div className="rectangle-div" />
            <div className="frame-parent6">
              <Button
                className="frame-child1"
                disableElevation={true}
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#000",
                  fontSize: "15",
                  background: "#e1f7dd",
                  borderRadius: "30px",
                  "&:hover": { background: "#e1f7dd" },
                  width: 135,
                  height: 51,
                }}
              >
                updated
              </Button>
              <div className="cloudlink-odm-beta-version-10-wrapper">
                <div className="cloudlink-odm-beta">{`cloudlink odm beta version 1.00  `}</div>
              </div>
            </div>
            <div className="help-images-wrapper">
              <img
                className="help-images-icon"
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
        </div>
        <div className="effect1-1-parent">
          <img
            className="effect1-1-icon"
            loading="lazy"
            alt=""
            src="/effect1-1@2x.png"
          />
          <div className="sass-platform-for-ibm-operatio-wrapper">
            <h1 className="sass-platform-for-container">
              <p className="sass-platform-for">{`sass platform for IBM Operational `}</p>
              <p className="decision-manager-odm"> Decision Manager (ODM)</p>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent4;
