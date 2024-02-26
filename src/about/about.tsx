import React from "react";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./about.scss";
import SplitType from "split-type";
import { useNavigate } from "react-router-dom";

const About: React.FC = () => {
  // refs
  const pictureRef = useRef(null);
  const bioRef = useRef(null);
  const lockRef = useRef(null);
  // navigate hook
  const navigate = useNavigate();

// inview ref

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // navigation button
  const handleView = () => {
    navigate("/");
  };

// animation on show
  useGSAP(() => {
    if (bioRef.current && pictureRef.current) {
      const split = new SplitType(bioRef.current);
      if (split.lines) {
        if (inView) {
          // body
          gsap.to(".about-body", {
            opacity: 1,
            overflow: "scroll",
            duration: 0.2,
            ease: "ease",
          });
          // picture
          gsap.to(pictureRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "ease",
          });
          // line
          gsap.to(".line", {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "ease",
            stagger: 0.15,
          });
        } else {
          // when not in view
          // picture
          gsap.to(pictureRef.current, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "ease",
          });
          // line
          gsap.to(".line", {
            opacity: 0,
            y: -2,
            duration: 2,
            ease: "ease",
            stagger: 0.15,
          });
        }
      }
    }
  }, [inView]);

  return (
    <div className="test" ref={ref}>
      <div className="about-body" ref={lockRef}>
        <h3 className="scroll" onClick={handleView}>
          Start <span id="arrow">&#8657;</span>
        </h3>
        <h1 id="title">About</h1>
        <img
          src="/images/profile-p-large.jpeg"
          alt="about photo"
          id="about-photo"
          ref={pictureRef}
        ></img>
        <p className="about-bio" ref={bioRef}>
          Hardworking and enthusiastic about all things programming, with over 3
          years experience in web development with a Front End focus. Feel free
          to add me in the contact section below or alternatively send me an
          email and i will get back to you ☺
        </p>
      </div>
    </div>
  );
};

export default About;
