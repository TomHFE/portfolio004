import React from "react";
import { useState, useEffect } from "react";
import { AnyJson } from "three/examples/jsm/nodes/Nodes.js";

export default function Banner() {
  const [time, setTime] = useState<string | undefined>();

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
    <div className="banner">
      <h1>ALYOSHA</h1>
      <div className="horizontal-line first"></div>
      <div className="horizontal-line second"></div>
      <h4 className="menu">MENU</h4>
      <h4 className="portfolio-004">PORTFOLIO 004</h4>
      <div className="time">
        {time} {timeZone}
      </div>
    </div>
  );
}
