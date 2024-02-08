import React from "react";
import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  animate: boolean;
}

export default function Banner({ animate }: Props) {
  const [time, setTime] = useState<string | undefined>();

  useGSAP(() => {
    if (animate) {
      const tl = gsap.timeline();

      tl.to(".portfolio-004", {
        x: -10,
        opacity: 0,
        duration: 1,

        ease: "expo.inOut",
      });
      tl.to(
        ".time",
        {
          x: 10,
          opacity: 0,
          duration: 1,

          ease: "expo.inOut",
        },
        "<"
      );
      tl.to(".first", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
      });
      tl.to(
        ".second",
        {
          y: 100,
          opacity: 0,
          duration: 1,

          ease: "expo.inOut",
        },
        "<"
      );
      tl.to(
        "#al",
        {
          fontSize: "20px",
          // opacity: 0,
          duration: 1,

          ease: "expo.inOut",
        },
        "-=0.25"
      );
      tl.to(
        "#banner",
        {
          opacity: 0,
          duration: 1,

          ease: "expo.inOut",
        },
        "<"
      );
    }
  }, [animate]);

  useEffect(() => {
    const timeTimer = setTimeout(() => {
      const currTime = new Date();

      const hours: number = currTime.getHours();
      const minutes: number = currTime.getMinutes();
      const seconds: string = currTime
        .getSeconds()
        .toLocaleString("en-US", { minimumIntegerDigits: 2 });

      hours > 12
        ? setTime(`${+hours - 12}:${minutes}:${seconds}pm`)
        : setTime(`${hours}:${minutes}:${seconds}am`);
    }, 1000);

    return () => clearTimeout(timeTimer);
  }, [time]);

  const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="banner" id="banner">
      <h1 id="al">ALYOSHA</h1>
      <div className="horizontal-line-main first"></div>
      <div className="horizontal-line-main second"></div>
      {/* <h4 className="menu">MENU</h4> */}
      <h4 className="portfolio-004">PORTFOLIO 004</h4>
      <div className="time">
        {time} {timeZone}
      </div>
    </div>
  );
}
