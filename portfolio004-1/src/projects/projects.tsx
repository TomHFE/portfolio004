import React, { useEffect, useLayoutEffect, useState } from "react";
import "./projects.scss";
import projectData from "./project-data.tsx";
import { useRef } from "react";
import gsap from "gsap";
import hoverEffect from "hover-effect";

// import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface ProjectData {
  id: number;
  title: string;
  number: string;
  name: string;
  info: string;
  img: string[];
  specs: string[];
  link: string;
}

export default function Projects() {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const imageRef = useRef(null);
  const [timer, setTimer] = useState<boolean>(false);

  const sections = gsap.utils.toArray(".prj");

  useEffect(() => {
    // Set up the timer when the component mounts
    const timerId = setTimeout(() => {
      // Code to be executed after one second
      setTimer(true);
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timerId);
  }, []);

  const cycledData: ProjectData[] = projectData.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }

    if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  const xValue = cycledData[0].id * 100;

  useLayoutEffect(() => {
    if (timer) {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: `-${xValue}vw`,
          ease: "none",
          // duration: 10,

          scrollTrigger: {
            trigger: sectionRef.current,
            // start: "top top ",
            // end: `bottom top`,
            // markers: true,
            scrub: 0.1,
            pin: true,
            anticipatePin: 3,
            end: "+=" + xValue * 15, //speed of scroll
            // end: () =>
            //   "+=" + document.querySelector("#scroll-section-inner")?.offsetWidth,
          },
        }
      );
      sections.forEach((section) => {
        // grab the scoped text
        const body = section.querySelectorAll<HTMLElement>(".body");
        const anim1 = section.querySelectorAll<HTMLElement>(".anim-1 ");
        const anim2 = section.querySelectorAll<HTMLElement>(".anim-2 ");

        // const border =
        //   section.querySelectorAll<HTMLElement>(".prj-main-border");

        // bump out if there's no items to animate
        if (body.length === 0) return;

        gsap.from(body, {
          x: 130,
          opacity: 0,
          duration: 0.5,
          ease: "linear",
          // stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            containerAnimation: pin,
            start: "left center",
            markers: true,
          },
        });

        // do a little stagger
        gsap.from(anim1, {
          x: 30,
          opacity: 0,
          duration: 1,
          ease: "ease",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            containerAnimation: pin,
            start: "left center",
            markers: true,
          },
        });

        gsap.from(anim2, {
          x: 30,
          opacity: 0,
          duration: 2,
          ease: "ease",
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            containerAnimation: pin,
            start: "left center",
            markers: true,
          },
        });
      });

      return () => {
        pin.kill();
      };
    }
  }, [timer]);

  console.log(cycledData[0].img[0]);

  useEffect(() => {
    new hoverEffect({
      parent: document.querySelector(".image-section"),
      intensity: 0.3,
      hover: true,
      image1: cycledData[0].img[0],
      image2: cycledData[0].img[1],
      displacementImage: "/images/paper-theme.png",
    });
  }, [cycledData[0].img[0], cycledData[0].img[1], "/images/paper-theme.png"]);

  return (
    <div id="scroll-section-outer">
      <div className="project-section">
        <div>
          <div
            ref={sectionRef}
            id="scroll-section-inner"
            style={{ width: `${+cycledData[0].id * 100 + 100}vw` }}
          >
            <div id="project-start"></div>
            {cycledData.map((project) => (
              <section className="prj" key={project.number} ref={triggerRef}>
                <div className="prj-main-body body" />
                <img
                  className="prj-main-border body"
                  src="/images/border.png"
                ></img>
                <p className="info anim-1">{project.info}</p>

                <h3 className="prj-view-title anim-1">view site</h3>
                <h3 className="menu anim-1">
                  <span>
                    <img
                      src="/images/menu-cross.png"
                      className="cross anim-1"
                      alt="cross"
                    />
                  </span>
                  menu
                </h3>
                <h3 className="start anim-1">start over</h3>
                <h1 className="title anim-1">{project.name}</h1>
                <div className="horizontal-line title-line body"></div>
                <div
                  ref={imageRef.current}
                  className="image-section body"
                ></div>
                <div className="proj-specs">
                  {project.specs.map((spec, i) => (
                    <span key={i} id="spec" className="anim-2">
                      {spec}{" "}
                    </span>
                  ))}
                </div>
                <div id="spec-title" className="anim-2">
                  Specs
                </div>
                <div className="horizontal-line body " id="spec-line"></div>
                <div className="number anim-1">
                  {project.id}/{cycledData[0].id}
                </div>
              </section>
              // </div>
            ))}
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
