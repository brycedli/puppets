// our vertex data (set by p5)
// this will be in the World Coordinate space
attribute vec3 aPosition;

// our texture coorinates (set by p5)
// These will go from 0 to 1
attribute vec2 aTexCoord;

// The varying qualifier identifies this as something that will
// be passed down the pipeline to the fragment shader
//
// It's useful to have the texture coordinates from 0-1 so we
// copy them into this varying field
varying vec2 vTexCoord;

void main() {

  // copy the texture coordinates
  vTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  
  // Our scale is from 0-1, but we want to make it look like it's
  // from -1 to 1 since that's going to look the same as the p5
  // layout
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
