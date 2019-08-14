import GL from "gl-react";
import React from "react";
import PropTypes from "prop-types";

export default ({
  displayName,
  defaultProps,
  propTypes,
  frag,
  receiveValues
}) => {
  const shaders = GL.Shaders.create({
    shader: {
      frag
    }
  });

  return GL.createComponent(
    ({ children: t,width, height, ...compProps }) => {
      const innerProps = {};
		console.log('INSIDE REACT GL IMAGE')
      receiveValues.forEach(receive => {
        Object.keys(compProps).forEach(key => {
          if (receive === "resolution") {
            innerProps.resolution = [compProps.width, compProps.height];
          }

          if (receive === key) {
            innerProps[receive] = compProps[key];
          }
        });
      });

      return (
        <GL.Node
		  shader={shaders.shader}
		  width={width}
		  height={height}
          uniforms={{ 
			  t, ...innerProps,
			  resolution: [width, height],
			 }}
        />
      );
    },
    {
      displayName,
      defaultProps,
      propTypes: {
        children: PropTypes.any.isRequired,
        ...propTypes
      }
    }
  );
};
