import React from "react"
import frontPagePicture from "./images/frontpage-picture.jpg";


function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <img src={frontPagePicture} alt="Front Page" />
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
      </div>
    </div>
  );
}

export default MainPage;
