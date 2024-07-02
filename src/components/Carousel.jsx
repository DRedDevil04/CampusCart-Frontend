import React from "react";
import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

// TODO: add cursor pointer, and other minor style improvements

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        content: "❮",
        fontSize: "1.5rem",
        width: "50px",
        height: "50px",
        backgroundColor: "#3f72af",
        color: "green",
        display: "flex",
        right: "10px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        content: "❮",
        fontSize: "1.5rem",
        width: "50px",
        height: "50px",
        backgroundColor: "#3f72af",
        color: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
        cursor: "pointer",
        transition: "all 0.2s",
        left: "10px",
        zIndex: "1",
      }}
      onClick={onClick}
    />
  );
}

export default function Carousel(props) {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider {...settings}>
      {props.srcs.map((src, index) => {
        return (
          <div className="img-car" key={index}>
            <img
              key={index}
              src={src}
              alt="this"
              draggable="false"
              style={{ display: "inline-block" }}
            />
          </div>
        );
      })}
    </Slider>
  );
}

// function Carousel(props) {
//   if (props.isInfinite) {
//     setTimeout(() => {
//       props.setCurrentImg((props.currentImg + 1) % props.srcs.length);
//     }, props.nextTime);
//   }
//   return (
//     <>
//       <div className="img-cont-car">
//         <div className="img-car">
//           {props.srcs.map((src, index) => {
//             if (props.currentImg === index)
//               return (
//                 <img
//                   key={index}
//                   src={src}
//                   alt="this"
//                   draggable="false"
//                   style={{ display: "inline-block" }}
//                 />
//               );
//             return <img key={index} src={src} alt="this" draggable="false" />;
//           })}
//         </div>
//         <div className="left-arrow-car" onClick={props.prevImg}>
//           ❮
//         </div>
//         <div className="right-arrow-car" onClick={props.nextImg}>
//           ❯
//         </div>
//       </div>
//     </>
//   );
// }

// export default Carousel;
