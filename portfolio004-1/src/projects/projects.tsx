import React, { useEffect, useState } from "react";
import "./projects.scss";
import projectData from "./project-data.tsx";
import { useRef } from "react";
import gsap from "gsap";
// import hoverEffect from "hover-effect";
// import { ProjectShader } from "./project-shader.tsx";
import Homepage from "../homepage/homepage";

// import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
interface Props {
  isAnim: boolean;
  handleIsAnim: () => void;
}

export default function Projects({ isAnim, handleIsAnim }: Props) {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const imageRef = useRef(null);
  const bodyRef = useRef(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const [trans, setTrans] = useState<boolean>(false);
  const [timer, setTimer] = useState<boolean>(false);

  const sections = gsap.utils.toArray(".prj");

  const handleClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      setAnimate(true);
      // Set up the timer when the component mounts
      const timerIdFirst = setTimeout(() => {
        // Code to be executed after one second
        setTrans(true);
      }, 4050);
      // Set up the timer when the component mounts
      const timerIdLast = setTimeout(() => {
        // Code to be executed after one second
        handleIsAnim();
        console.log(isAnim);
        setTimer(true);
      }, 3000);

      // Clean up the timer when the component unmounts
      return () => {
        clearTimeout(timerIdFirst), clearTimeout(timerIdLast);
      };
    }
  }, [clicked]);

  const cycledData: ProjectData[] = projectData.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }

    if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  const xValue = cycledData.length * 100;
  useGSAP(() => {
    if (animate) {
      gsap.to("#press-start", {
        opacity: 0,
        duration: 2,
        ease: "expo.inOut",
      });
    }
    if (trans) {
      gsap.to("#home", {
        display: "none",
        duration: 1,
        ease: "expo.inOut",
      });
    }
    if (timer) {
      gsap.to("#scroll-section-outer", {
        display: "block",
      });
      gsap.to("#section-start", {
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
      });
    }
  }, [animate, trans, timer]);

  useGSAP(() => {
    if (timer && sectionRef.current) {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: `-${xValue}vw`,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 0.1,
            pin: true,
            anticipatePin: 3,
            end: "+=" + xValue * 15, //speed of scroll
          },
        }
      );
      sections.forEach((section) => {
        // grab the scoped text
        const body = section.querySelectorAll<HTMLElement>(".body");
        const anim1 = section.querySelectorAll<HTMLElement>(".anim-1 ");
        const anim2 = section.querySelectorAll<HTMLElement>(".anim-2 ");

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
          },
        });
      });
      Observer.create({
        target: "#project-last", // can be any element (selector text is fine)
        type: "wheel,touch", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
        onUp: () => previous(),
        onDown: () => next(),
      });

      // gsap.fromTo(
      //   "#project-start",
      //   {
      //     x: 700,
      //   },
      //   {
      //     x: 0,
      //     duration: 1.5,
      //     ease: "ease",

      //     scrollTrigger: {
      //       trigger: "#project-start",
      //       containerAnimation: pin,
      //       start: "left center",
      //       // markers: true,
      //     },
      //   }
      // );

      return () => {
        pin.kill();
      };
    }
  }, [timer]);

  return (
    <div>
      <div id="home">
        <div onClick={handleClick}>
          <div id="press-start">Press to Start</div>
        </div>
        <Homepage animate={animate} />
      </div>
      <div id="scroll-section-outer" ref={bodyRef}>
        <div className="project-section">
          <div>
            <div
              ref={sectionRef}
              id="scroll-section-inner"
              style={{ width: `${xValue + 100}vw` }}
            >
              <div id="project-start">
                {" "}
                <section id="section-start">
                  SCROLL TO SEE MY PROJECTS
                  {/* <br />
                  &#10145; */}
                </section>
              </div>
              {cycledData.map((project) => (
                <section
                  id={`${project.id}`}
                  className="prj"
                  key={project.number}
                  ref={triggerRef}
                >
                  <div className="prj-main-body body" />
                  <img
                    className="prj-main-border body"
                    src="/images/border.png"
                  ></img>
                  <p className="info anim-1">{project.info}</p>

                  <h3 className="prj-view-title anim-1">
                    <span>
                      <img
                        src="/images/menu-cross.png"
                        className="cross anim-1"
                        alt="cross"
                      />
                      view site
                    </span>
                  </h3>
                  <h3 className="start anim-1">start over</h3>
                  <h1 className="title anim-1" id="stroke">
                    {project.name}
                  </h1>
                  <div
                    id="stroke"
                    className="horizontal-line title-line body"
                  ></div>
                  <img
                    ref={imageRef.current}
                    className="image-section body"
                    src={project.img[0]}
                  ></img>
                  <div className="proj-specs">
                    {project.specs.map((spec, i) => (
                      <span
                        key={i}
                        id="spec"
                        className="anim-2"
                        style={{ zIndex: "5" }}
                      >
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
              {/* {/* <div id="project-start"></div> */}
              <div id="project-last"></div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
