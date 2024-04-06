import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { CustomPass } from "../shaders/CustomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import gsap from "gsap";

// props
interface Props {
  isAnim: boolean;
}

const Background = ({ isAnim }: Props) => {
  // renderer container
  const rendererContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 3d scene
    const scene = new THREE.Scene();
    // camera init
    const camera = new THREE.PerspectiveCamera(
      // perspective
      2 *
        Math.atan(
          window.innerWidth /
            (window.innerWidth / window.innerHeight) /
            (2 * 450)
        ) *
        (180 / Math.PI),
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // renderer init
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // add renderer to ref
    if (rendererContainer.current) {
      rendererContainer.current.appendChild(renderer.domElement);
    }
    // camera position
    camera.position.z = 450;
    // image added as texture
    const imagePath = "/images/clouds-1.webp";
    const textureLoader = new THREE.TextureLoader();
    const imageTexture = textureLoader.load(imagePath);
    // shader material using image as texture
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        imageTexture: { value: imageTexture },
        time: { value: 0 },
      },
      // vertex init
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      // frag init
      fragmentShader: `
        uniform sampler2D imageTexture;
        varying vec2 vUv;
        void main() {
          vec4 imageColor = texture2D(imageTexture, vUv);
          gl_FragColor = imageColor;
        }
      `,
    });
    // composers added on top of scene
    const composer = new EffectComposer(renderer);
    // init scene
    composer.addPass(new RenderPass(scene, camera));
    // custom pass init
    const effect1 = new ShaderPass(CustomPass);
    effect1.uniforms["scale"].value = 1.8;
    effect1.uniforms["progress"].value = 0;

    composer.addPass(effect1);
    // out pass init
    const effect3 = new OutputPass();
    composer.addPass(effect3);
    // clock
    const clock = new THREE.Clock();
    // 2d geometry for scene
    const geometry = new THREE.PlaneGeometry(16, 6); // Aspect ratio 16:9
    // adding 2d geometry and shader to mesh
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    // adding mesh to scene
    scene.add(plane);
    // animation function
    function Animate() {
      requestAnimationFrame(Animate);
      // passes time value as uniform to custom shader

      effect1.uniforms["time"].value = clock.getElapsedTime() / 20;
      // rerender with changes to uniforms
      composer.render();
    }
    // animation changes using gsap
    const handleAnimation = (isAnim: boolean) => {
      // progress uniform from custom shader out
      if (!isAnim) {
        gsap.to(effect1.uniforms["progress"], {
          value: 0,
          ease: "expo.inOut",
          duration: 2,
        });
      } else {
        // progress uniform from custom shader in

        gsap.to(effect1.uniforms["progress"], {
          value: 0.6,
          ease: "expo.inOut",
          duration: 4,
        });
      }
    };
    // fire animation
    handleAnimation(isAnim);
    // resize function
    function handleResize() {
      // find height and width
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      // preserve aspect on screen resize
      camera.fov =
        2 *
        Math.atan(
          window.innerWidth /
            (window.innerWidth / window.innerHeight) /
            (2 * 450)
        ) *
        (180 / Math.PI);
      // aspect re init
      camera.aspect = newWidth / newHeight;
      // update camera
      camera.updateProjectionMatrix();
      // re setting render size
      renderer.setSize(newWidth, newHeight);
      // reshaping geometry of scene
      const newGeometry = new THREE.PlaneGeometry(newWidth, newHeight);
      plane.geometry.dispose();
      plane.geometry = newGeometry;
    }
    // resize init
    handleResize();
    // even listener
    window.addEventListener("resize", handleResize);
    // animate init
    Animate();

    return () => {
      // clean up function
      if (rendererContainer.current) {
        window.removeEventListener("resize", handleResize);
        rendererContainer.current.removeChild(renderer.domElement);
      }
    };
    // isAnim dependecy
  }, [isAnim]);
  // ref added to dom
  return <div ref={rendererContainer} />;
};

export default Background;
