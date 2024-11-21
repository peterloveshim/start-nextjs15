// https://codepen.io/imranit/pen/pojeZrG

import "./style.css";

export const SplashScreen = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div id="preload">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    </div>
  );
};
