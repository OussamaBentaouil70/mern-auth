import { useMemo } from "react";
import "./FrameComponent1.css";

const FrameComponent1 = ({
  business1,
  feature4,
  propAlignSelf,
  propFlex,
  propMinWidth,
  propGap,
}) => {
  const frameDiv1Style = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propFlex, propMinWidth]);

  const frameDiv2Style = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  return (
    <div className="rectangle-parent1" style={frameDiv1Style}>
      <div className="frame-child4" />
      <img className="business-1-icon" loading="lazy" alt="" src={business1} />
      <div className="feature-4-wrapper">
        <div className="feature-4">{feature4}</div>
      </div>
      <div className="frame-wrapper8">
        <div
          className="lorem-ipsum-is-simply-dummy-te-container"
          style={frameDiv2Style}
        >
          <div className="lorem-ipsum-is2">
            Lorem Ipsum is simply dummy text of ths of type and scrambled iut
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was recen
          </div>
          <div className="frame-wrapper9">
            <div className="ellipse-container">
              <div className="frame-child5" />
              <img
                className="right-arrow-4-icon"
                loading="lazy"
                alt=""
                src="/rightarrow-3@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
