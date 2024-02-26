// Potential future change to scroll behaviour

// import { ReactLenis } from "@studio-freight/react-lenis";

// // smooth scrolling hook
// function SmoothScrolling({ children }: { children: React.ReactNode }) {
//   // options
//   const lenisOptions = {
//     duration: 2.1,
//     smoothTouch: true, //smooth scroll for touch devices
//     smooth: true,
//     easing: function (t) {
//       return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
//     },
//     direction: "vertical",
//     gestureDirection: "vertical",
//   };
//   function raf(time) {
//     lenisOptions.raf(time);
//     requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);

//   return (
//     <ReactLenis root options={lenisOptions}>
//       {children}
//     </ReactLenis>
//   );
// }
// export default SmoothScrolling;
