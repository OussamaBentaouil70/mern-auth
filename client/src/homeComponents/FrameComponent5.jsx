import { Button } from "@mui/material";
import "./FrameComponent5.css";

const FrameComponent5 = () => {
  return (
    <header className="frame-header">
      <div className="untitled-1-parent">
        <img
          className="untitled-1-icon"
          loading="lazy"
          alt=""
          src="/untitled-1@2x.png"
        />
        <div className="frame-wrapper2">
          <div className="frame-parent2">
            <nav className="frame-nav">
              <nav className="frame-parent3">
                <div className="features-wrapper">
                  <div className="features">features</div>
                </div>
                <div className="pricing-wrapper">
                  <div className="pricing">{`Pricing `}</div>
                </div>
                <div className="recources-wrapper">
                  <div className="recources">Recources</div>
                </div>
                <div className="about">about</div>
              </nav>
            </nav>
            <div className="frame-parent4">
              <div className="login-wrapper">
                <div className="login">Login</div>
              </div>
              <Button
                className="frame-button"
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
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FrameComponent5;
