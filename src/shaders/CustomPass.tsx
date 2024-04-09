import { Vector2 } from "three";

// ../node_modules/three/examples/jsm/shaders/DotScreenShader.js

// custom pass shader class
const CustomPass = {
  name: "CustomPass",
  uniforms: {
    tDiffuse: { value: null },
    tSize: { value: new Vector2(256, 256) },
    center: { value: new Vector2(0.5, 0.5) },
    time: { value: 0 },
    progress: { value: 0 },
    angle: { value: 1.57 },
    scale: { value: 1 },
  },
  vertexShader:
    /* vertex */
    `
	
	varying vec2 vUv;
	
	void main() {
		
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		
	}`,
  fragmentShader:
    /* fragment */
    `
	// uniforms
	
	uniform float scale;
	uniform float time;
	uniform float progress;
	
		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		
		
		void main() {

			vec2 newUV = vUv;

			vec2 p =2.*vUv - vec2(1.);

			p += 0.1*cos(scale*3.*p.yx + time + vec2(11.2,3.4));
			p += 0.1*cos(scale*3.3*p.yx + 1.8*-time + vec2(11.2,3.4));
			p += 0.1*sin(scale*3.8*p.yx + 2.3*time + vec2(10.2,3.7));
			p += 0.1*sin(scale*3.8*p.yx + 2.3*time + vec2(10.2,3.7));
			p += 0.1*sin(scale*3.8*p.yx + 2.3*time + vec2(10.2,3.7));
			p += 0.1*sin(scale*3.8*p.yx + 2.3*time + vec2(10.2,3.7));
			p += 0.1*sin(scale*3.8*p.yx + 2.3*time + vec2(10.2,3.7));
			p += 0.1*tan(scale*3.2*p.yx + 1.5*time + vec2(5.2,2.4));
			p += 0.1*cos(scale*4.*p.yx + 3.3*time + vec2(10.2,2.4));

			newUV.x = mix(vUv.x,length(p) - 0.5, progress);
			newUV.y = mix(vUv.y,0.,progress);

			


			vec4 color = texture2D( tDiffuse, newUV);

			gl_FragColor = color;

			
		}`,
};
export { CustomPass };
