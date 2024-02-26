import { ClassAttributes, useEffect, useState } from "react";
import "./projects.scss";
import projectData from "./project-data.tsx";
import { useRef } from "react";
import gsap from "gsap";
import Homepage from "../homepage/homepage.tsx";
import { useNavigate } from "react-router-dom";
import { Observer } from "gsap/dist/Observer";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// project data props
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
// state prop
interface Props {
  isAnim: boolean;
  handleIsAnim: () => void;
}

export default function Projects({ handleIsAnim }: Props) {
  // plugins
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Observer);
  // refs
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const imageRef = useRef(null);
  const bodyRef = useRef(null);
  // state hooks
  const [clicked, setClicked] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const [trans, setTrans] = useState<boolean>(false);
  const [timer, setTimer] = useState<boolean>(false);
  // navigate next page hook

  const navigate = useNavigate();
  // projects class array
  const sections = gsap.utils.toArray(".prj");
  // handle click
  const handleClick = () => {
    setClicked(true);
  };
  // handle navigation change
  const handleView = () => {
    navigate("/about");
  };
  // animation for homepage button
  useEffect(() => {
    if (clicked) {
      // state changes on timers
      setAnimate(true);
      const timerIdFirst = setTimeout(() => {
        setTrans(true);
      }, 4050);
      const timerIdLast = setTimeout(() => {
        handleIsAnim();
        setTimer(true);
      }, 2600);

      // Clean up for timeout function
      return () => {
        clearTimeout(timerIdFirst), clearTimeout(timerIdLast);
      };
    }
    // dependencies
  }, [clicked]);
  // Data sorted in reverse order/ newest first
  const cycledData: ProjectData[] = projectData.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }

    if (a.id > b.id) {
      return -1;
    }

    return 0;
  });
  // x value for scroll length
  const xValue = cycledData.length * 100;

  useGSAP(() => {
    // animation for clicking start
    if (animate) {
      // start button
      gsap.to("#press-start", {
        opacity: 0,
        duration: 2,
        ease: "expo.inOut",
      });
    }
    if (trans) {
      // home button
      gsap.to("#home", {
        display: "none",
        duration: 2,
        ease: "expo.inOut",
      });
    }
    // outer scroll section
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
    // dependecies
  }, [animate, trans, timer]);
  // gsap animation
  useGSAP(() => {
    if (timer && sectionRef.current) {
      //outer section container
      const pin = gsap.fromTo(
        // horizontal scrolling for section
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
            end: "+=" + xValue * 15,
          },
        }
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sections.forEach((section: ClassAttributes) => {
        // query selectors for animations

        const body = section.querySelectorAll<HTMLElement>(".body");

        const anim1 = section.querySelectorAll<HTMLElement>(".anim-1 ");

        const anim2 = section.querySelectorAll<HTMLElement>(".anim-2 ");

        // bump out if there's no items to animate
        if (body.length === 0) return;

        // body animation
        gsap.from(body, {
          x: 130,
          opacity: 0,
          duration: 0.5,
          ease: "linear",
          scrollTrigger: {
            trigger: section,
            containerAnimation: pin,
            start: "left center",
          },
        });

        // anim1

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
        // anim2

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
      // clean up
      return () => {
        pin.kill();
      };
    }
    // dependecies
  }, [timer]);

  // dom
  return (
    <div>
      <div id="home">
        {/* start button */}
        <div id="press-start-container" onClick={handleClick}>
          <div id="press-start"> Start</div>
        </div>
        <Homepage animate={animate} />
      </div>
      {/* projects */}
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
                <section id="section-start">SCROLL TO SEE MY PROJECTS</section>
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

                  <a
                    className="prj-view-title anim-1"
                    id="view-site"
                    href={project.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>
                      <img
                        src="/images/menu-cross.png"
                        className="cross anim-1"
                        alt="cross"
                      />
                      view site
                    </span>
                  </a>

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
              ))}
              <div id="project-last">
                {" "}
                <h4 id="next" onClick={handleView}>
                  {" "}
                  next &#8652;
                </h4>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
