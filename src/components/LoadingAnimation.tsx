import React from "react";
import "../styles/LoadingAnimation.css";

function LoadingAnimation() {
  return (
    <div className="LoadingAnimation">
      <div className="loading-dot-one" id="loading-dot-one-id"></div>
      <div className="loading-dot-two" id="loading-dot-two-id"></div>
      <div className="loading-dot-three" id="loading-dot-three-id"></div>
    </div>
  );
}

export default LoadingAnimation;
