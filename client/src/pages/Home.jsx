import React from "react";

import FrameComponent4 from "../homeComponents/FrameComponent4";
import FrameComponent3 from "../homeComponents/FrameComponent3";
import FrameComponent2 from "../homeComponents/FrameComponent2";
import FrameComponent1 from "../homeComponents/FrameComponent1";
import FrameComponent from "../homeComponents/FrameComponent";
import "./WelcomePage.css";

export default function Home() {
  return (
    <div className="welcome-page">
      <main className="frame-parent">
        <FrameComponent4 />
        <section className="frame-group">
          <FrameComponent3 />
          <div className="frame-container">
            <div className="new-file-parent">
              <div className="new-file">
                <img
                  className="macbook-pro-18"
                  alt=""
                  src="/macbook-pro-18@2x.png"
                />
                <img
                  className="decision-rule-actions-add"
                  alt=""
                  src="/decision--rule-actions--add-new-file-1@2x.png"
                />
              </div>
              <div className="new-file1">
                <img
                  className="macbook-pro-17"
                  alt=""
                  src="/macbook-pro-17@2x.png"
                />
                <img
                  className="decision-rule-actions-add1"
                  loading="lazy"
                  alt=""
                  src="/decision--rule-actions--add-new-file-2@2x.png"
                />
              </div>
              <div className="macbook-pro-16-parent">
                <img
                  className="macbook-pro-16"
                  alt=""
                  src="/macbook-pro-16@2x.png"
                />
                <img className="image-1-icon" alt="" src="/image-1@2x.png" />
              </div>
            </div>
            <div className="rectangle-parent">
              <div className="frame-child" />
              <div className="explore-our-amazing-features-wrapper">
                <h1 className="explore-our-amazing">
                  explore our amazing features
                </h1>
              </div>
              <div className="frame-div">
                <div className="process-feature-parent">
                  <div className="process-feature">
                    <div className="process-feature-child" />
                    <div className="money-feature">
                      <img
                        className="money-1-icon"
                        loading="lazy"
                        alt=""
                        src="/money-1@2x.png"
                      />
                      <div className="feature-1">feature 1</div>
                    </div>
                    <FrameComponent2 />
                  </div>
                  <div className="process-feature1">
                    <div className="process-feature-item" />
                    <img
                      className="process-1-icon"
                      loading="lazy"
                      alt=""
                      src="/process-1@2x.png"
                    />
                    <div className="feature-2-wrapper">
                      <div className="feature-2">feature 2</div>
                    </div>
                    <div className="process-feature-inner">
                      <FrameComponent2
                        propWidth="unset"
                        propGap="6px"
                        propFlex="1"
                      />
                    </div>
                  </div>
                </div>
                <div className="frame-parent1">
                  <div className="rectangle-group">
                    <div className="frame-item" />
                    <div className="profits-feature">
                      <div className="profits">
                        <img
                          className="profits-1-icon"
                          loading="lazy"
                          alt=""
                          src="/profits-1@2x.png"
                        />
                      </div>
                      <div className="feature-3">feature 3</div>
                    </div>
                    <div className="lorem-ipsum-is-simply-dummy-te-parent">
                      <div className="lorem-ipsum-is">
                        Lorem Ipsum is simply dummy text of ths of type and
                        scrambled iut also the leap into electronic typesetting,
                        remaining essentially unchanged. It was recen
                      </div>
                      <div className="frame-wrapper">
                        <div className="ellipse-parent">
                          <div className="frame-inner" />
                          <img
                            className="right-arrow-3-icon"
                            loading="lazy"
                            alt=""
                            src="/rightarrow-3@2x.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="frame-wrapper1">
                    <FrameComponent1
                      business1="/business-1@2x.png"
                      feature4="feature 4"
                    />
                  </div>
                  <FrameComponent1
                    business1="/uparrow-1@2x.png"
                    feature4="feature 5"
                    propAlignSelf="unset"
                    propFlex="0.8197"
                    propMinWidth="280px"
                    propGap="16px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <FrameComponent />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="social-links-wrapper">
            <div className="social-links">
              <div className="follow-us">follow us :</div>
              <div className="social-icons">
                <img
                  className="youtube-1-icon"
                  loading="lazy"
                  alt=""
                  src="/youtube-1@2x.png"
                />
              </div>
              <div className="social-icons1">
                <img
                  className="facebook-1-icon"
                  loading="lazy"
                  alt=""
                  src="/facebook-1@2x.png"
                />
              </div>
              <div className="social-icons2">
                <img
                  className="linkedin-1-icon"
                  loading="lazy"
                  alt=""
                  src="/linkedin-1@2x.png"
                />
              </div>
              <div className="social-icons3">
                <img
                  className="twitter-1-icon"
                  loading="lazy"
                  alt=""
                  src="/twitter-1@2x.png"
                />
              </div>
            </div>
          </div>
          <div className="all-right-resereved">{`@ 2024 all right resereved `}</div>
        </div>
      </footer>
    </div>
  );
}
