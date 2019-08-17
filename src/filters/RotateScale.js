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
