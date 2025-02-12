import React, { useEffect } from "react";
import homeImg from "../../images/home-img.png";
import parallax from "../../images/home-parallax-img.png";
import "./Parallax.scss";

export default function Parallax() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 90;
      const y = (window.innerHeight - e.pageY * 2) / 90;
      document.querySelector(
        ".home-parallax-img"
      ).style.transform = `translateX(${y}px) translateY(${x}px)`;
    };

    const handleMouseLeave = () => {
      document.querySelector(".home-parallax-img").style.transform =
        "translateX(0px) translateY(0px)";
    };

    const homeElement = document.querySelector(".home");
    homeElement.addEventListener("mousemove", handleMouseMove);
    homeElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      homeElement.removeEventListener("mousemove", handleMouseMove);
      homeElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div style={{ transform: "scale(0.85)" }}>
      <section className="home" id="home">
        <div className="content">
          <span className="font-weight-bold">Welcome To Dine Me</span>
          <h3>
            Voice Your Palate: Elevate Your Dining Experience Through Feedback
            🌟
          </h3>
          <p>
            Discover culinary excellence with our carefully curated dishes,
            where every flavor is a delight and every bite a revelation.
          </p>
        </div>
        <div className="image">
          <img
            src={homeImg}
            alt="homeImg"
            className="text-decoration-none home-img"
          />
          <img src={parallax} className="home-parallax-img" />
        </div>
      </section>
    </div>
  );
}
