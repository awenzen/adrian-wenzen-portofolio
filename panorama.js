// A slowly rotating cubemap, using the same six landscape faces as the reference.
export function startPanorama(canvas, reduced) {
  const gl = canvas.getContext('webgl', {alpha:false,antialias:false,powerPreference:'low-power'});
  if (!gl) return () => {};
  const vert = 'attribute vec2 position; varying vec2 uv; void main(){uv=position;gl_Position=vec4(position,0.,1.);}';
  const frag = `precision mediump float; varying vec2 uv; uniform samplerCube sky; uniform float angle; uniform float aspect;
    void main(){vec3 d=normalize(vec3(uv.x*aspect,uv.y-.08,-1.3)); float c=cos(angle),s=sin(angle);d=vec3(d.x*c-d.z*s,d.y,d.x*s+d.z*c);gl_FragColor=textureCube(sky,d);}`;
  const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);return s;};
  const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,vert));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,frag));gl.linkProgram(program);
  if (!gl.getProgramParameter(program,gl.LINK_STATUS)) return () => {};
  gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const location=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,2,gl.FLOAT,false,0,0);
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_CUBE_MAP,texture);
  const faces=[[gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,0],[gl.TEXTURE_CUBE_MAP_POSITIVE_X,1],[gl.TEXTURE_CUBE_MAP_POSITIVE_Z,2],[gl.TEXTURE_CUBE_MAP_NEGATIVE_X,3],[gl.TEXTURE_CUBE_MAP_POSITIVE_Y,4],[gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,5]];
  let loaded=0;
  for(const [face,index] of faces){
    gl.texImage2D(face,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([90,110,140,255]));
    const img=new Image();img.onload=()=>{gl.bindTexture(gl.TEXTURE_CUBE_MAP,texture);gl.texImage2D(face,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);if(++loaded===6) canvas.classList.add('ready');};img.src=`/panorama/${index}.jpg`;
  }
  gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  const angle=gl.getUniformLocation(program,'angle'),aspect=gl.getUniformLocation(program,'aspect');
  let rotation=.55,last=0,frame;
  function render(time){
    const width=Math.round(innerWidth*.65),height=Math.round(innerHeight*.65);
    if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;gl.viewport(0,0,width,height);}
    if(last&&!reduced()&&!document.hidden)rotation+=Math.min(time-last,100)*.000025;
    last=time;gl.uniform1f(angle,rotation);gl.uniform1f(aspect,width/height);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);frame=requestAnimationFrame(render);
  }
  frame=requestAnimationFrame(render);return ()=>cancelAnimationFrame(frame);
}
