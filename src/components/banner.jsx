import React, { Component } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

class Banner extends Component {
  render() {
    const images = [
      {
        url: "/illus1.png",
        caption3: "SEND EMAIL TO FRIENDS AND FAMILY",
      },
      {
        url: "/illus2.png",
        caption3: "ENJOY EMAIL COMMUNICATION",
      },
    ];
    return (
      <Slide autoplay={true} arrows={false} indicators={true} infinite={true}>
        {images.map((slideImage, index) => (
          <div
            className="each-slide w3-display-container"
            key={index}
            style={{ minHeight: "100vh" }}
          >
            <div className="text-center">
              <div className="each-slide-child w3-display-topleft">
                <div className="Slidedetails pt-5">{slideImage.caption3}</div>
              </div>

              <img
                src={`${slideImage.url}`}
                alt="img"
                style={{ height: "80vh", marginTop: "10vh" }}
              />
            </div>
          </div>
        ))}
      </Slide>
    );
  }
}

export default Banner;
