import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// interface for props
interface Props {
  animate: boolean;
}

export default function Banner({ animate }: Props) {

  // time hook for updating time
  const [time, setTime] = useState<string | undefined>();
// animations for banner
  useGSAP(() => {
    if (animate) {
      // timeline init
      const tl = gsap.timeline();
// header
      tl.to(".portfolio-004", {
        x: -10,
        opacity: 0,
        duration: 1,

        ease: "expo.inOut",
      });
      // time
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
      // first line
      tl.to(".first", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
      });
      // second line
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
      // title
      tl.to(

        "#al",
        {
          fontSize: "20px",
          duration: 1.5,

          ease: "expo.inOut",
        },
        "-=0.25"
      );
      // banner
      tl.to(
        "#banner",
        {
          opacity: 0,
          duration: 1.5,

          ease: "expo.inOut",
        },
        "<"
      );
    }
    // dependency hook
  }, [animate]);

  useEffect(() => {
    // clock function updates on state change every second
    const timeTimer = setTimeout(() => {
      // new date instance
      const currTime = new Date();
// hours
      const hours: number = currTime.getHours();
      // minutes
      const minutes: number = currTime.getMinutes();
      // seconds 
      const seconds: string = currTime
        .getSeconds()
        .toLocaleString("en-US", { minimumIntegerDigits: 2 });
// function for finding am and pm
      hours > 12
        ? setTime(`${+hours - 12}:${minutes}:${seconds}pm`)
        : setTime(`${hours}:${minutes}:${seconds}am`);
    }, 1000);
// clean up function
    return () => clearTimeout(timeTimer);
  }, [time]);
// sets it to timezone and displayes city and continent
  const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
// dom
  return (
    <div className="banner" id="banner">
      <h1 id="al">ALYOSHA</h1>
      <div className="horizontal-line-main first"></div>
      <div className="horizontal-line-main second"></div>
      <h4 className="portfolio-004">PORTFOLIO 004</h4>
      <div className="time">
        {time} {timeZone}
      </div>
    </div>
  );
}
