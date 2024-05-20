import { useMemo } from "react";
import "./FrameComponent2.css";

const FrameComponent2 = ({ propWidth, propGap, propFlex }) => {
  const frameDivStyle = useMemo(() => {
    return {
      width: propWidth,
      gap: propGap,
      flex: propFlex,
    };
  }, [propWidth, propGap, propFlex]);

  return (
    <div className="lorem-ipsum-is-simply-dummy-te-group" style={frameDivStyle}>
      <div className="lorem-ipsum-is1">
        Lorem Ipsum is simply dummy text of ths of type and scrambled iut also
        the leap into electronic typesetting, remaining essentially unchanged.
        It was recently with desktop publishing
      </div>
      <div className="frame-wrapper6">
        <button className="frame-wrapper7">
          <div className="ellipse-group">
            <div className="ellipse-div" />
            <img
              className="right-arrow-1-icon"
              alt=""
              src="/rightarrow-1@2x.png"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default FrameComponent2;
