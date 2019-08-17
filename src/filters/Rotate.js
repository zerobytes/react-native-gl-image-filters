import GL from "gl-react";
import React from "react";
import PropTypes from "prop-types";

import createGLComponent from "../utils/createGLComponent";



export default createGLComponent({
	displayName: "Rotate",
	defaultProps: {
		angle: 0,
		scale: 1,
		leftRight: 1,
		topBottom: 1,
	},
	propTypes: {
		angle: PropTypes.number,
		scale: PropTypes.number,
		leftRight: PropTypes.number,
		topBottom: PropTypes.number,
	},
	frag: `
	precision highp float;
	varying vec2 uv;
	uniform float angle, scale, leftRight, topBottom;
	uniform sampler2D t;
	uniform vec2 resolution;
	
	mat2 scale2d(vec2 _scale){
		return mat2(_scale.x,0.0,
					0.0,_scale.y);
	}
	mat2 rotate2d(float _angle){
		return mat2(cos(_angle),-sin(_angle),
					sin(_angle),cos(_angle));
	}
	void main() {
				
		mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
		vec2 p = (uv - vec2(0.5)) * rotation / scale + vec2(0.5);
		
		vec2 st = uv.xy/resolution.xy;
		
		vec2 mid = vec2(topBottom, leftRight);
		vec2 pp = vec2(p.x+mid.x, p.y+mid.y);

		gl_FragColor = texture2D(t, pp);
	}
	`,
	receiveValues: ["angle", "scale", "leftRight", "topBottom", "resolution"]
});



//-----------------------------------
//precision highp float;
//		varying vec2 uv;
//		uniform float angle, scale, leftRight, topBottom;
//		uniform sampler2D t;
//
//
//void main() {
//		
// mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
// vec2 p = (uv - vec2(0.5)) * rotation / scale + vec2(0.5);
// //LEFT=0 RIGHT=1 // BOTTOM=0 TOP=1
// //0.0, 0.0 = bottom left
// //1.0, 0.0 = bottom right
// //1.0, 1.0 = top right
// //0.0, 1.0 = top left


// vec2 mid = vec2(topBottom, leftRight);

// vec2 pp;
// if(angle > 0.0)
// 	pp = vec2(
// 		cos(angle) * (uv.x - mid.x) + sin(angle) * (uv.y - mid.y) + mid.x,
// 		cos(angle) * (uv.y - mid.y) - sin(angle) * (uv.x - mid.x) + mid.y
// 	);
// else
// 	pp = vec2(
// 		(uv.x - mid.x) + (uv.y - mid.y) + mid.x,
// 		(uv.y - mid.y) - (uv.x - mid.x) + mid.y
// 	);

// mat2 r3 = mat2(cos(0.0), -sin(0.0), sin(0.0), cos(0.0));
// vec2 ppp = (pp - vec2(0.5)) * r3 / scale + vec2(0.5);

// gl_FragColor = texture2D(t, ppp);
//}
// ---------------------------
// varying vec2 v_texcoord;
// uniform sampler2D t;
// uniform float u_angle;

// void main()
// {
// 	vec2 coord = v_texcoord;
// 	float sin_factor = sin(angle);
// 	float cos_factor = cos(angle);
// 	coord = vec2((coord.x - 0.5) * (Resolution.x / Resolution.y), coord.y - 0.5) * mat2(cos_factor, sin_factor, -sin_factor, cos_factor);
// 	coord += 0.5;

// 	gl_FragColor = texture2D(t, coord);
// }
