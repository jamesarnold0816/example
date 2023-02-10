!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).marcher={})}(this,(function(e){"use strict";const t="114514.",s=e=>e.filter((e=>e)),a=e=>[...e].reverse(),r=e=>e*Math.PI/180,i=e=>Number(e).toFixed(1),o=e=>Number(e).toFixed(2),n=(e,t,s)=>(1-s)*e+s*t,h=e=>e.join("\n");class c{antialias;constructor(){this.antialias=!1}setAntialias(e=!0){return this.antialias=e,this}get shader(){return`\n      void mainImage(out vec4 fragColor,in vec2 fragCoord){\n        vec3 tot=vec3(0.);\n        \n        float AA_size=${this.antialias?"2.":"1."};\n        float count=0.;\n        for(float aaY=0.;aaY<AA_size;aaY++)\n        {\n            for(float aaX=0.;aaX<AA_size;aaX++)\n            {\n                tot+=getSceneColor(fragCoord+vec2(aaX,aaY)/AA_size);\n                count+=1.;\n            }\n        }\n        tot/=count;\n        \n        fragColor=vec4(tot,1.);\n    }\n      `}}class l{skybox;constructor(){this.skybox="vec3(10.,10.,10.)/255."}setSkyBox(e){return this.skybox=e,this}get shader(){return`\n      vec3 render(in vec3 ro,in vec3 rd){\n        vec3 col=${this.skybox};\n        \n        vec2 res=raycast(ro,rd);\n        float t=res.x;\n        float m=res.y;\n        \n        if(m>-.5){\n            vec3 pos=ro+t*rd;\n            \n            vec3 nor=(m<1.5)?vec3(0.,1.,0.):calcNormal(pos);\n            \n            col=material(col,pos,m,nor);\n            \n            col=lighting(col,pos,rd,nor);\n        }\n        \n        return col;\n    }\n      `}}class p{sdfVarName;materialId;isVisible;translateXValue;translateYValue;translateZValue;rotateXValue;rotateYValue;rotateZValue;scaleXValue;scaleYValue;scaleZValue;operationsBefore;operationsAfter;operationsHalf;operationsSym;constructor(e={}){const{sdfVarName:s="dt",materialId:a=t}=e;this.sdfVarName=s,this.materialId=a,this.isVisible=!0,this.translateXValue=0,this.translateYValue=0,this.translateZValue=0,this.rotateXValue=0,this.rotateYValue=0,this.rotateZValue=0,this.scaleXValue=1,this.scaleYValue=1,this.scaleZValue=1,this.operationsBefore=[],this.operationsAfter=[],this.operationsHalf=[],this.operationsSym=[]}get pointVarName(){return`${this.sdfVarName}p`}get pointShader(){return`vec3 ${this.pointVarName}=pos;`}get shader(){return""}get addExisting(){return`res=opUnion(res,vec2(${this.sdfVarName},${this.materialId}));`}get totalShader(){return h(s([this.pointShader,this.positionShader,this.operationsSymShader,this.rotationShader,this.operationsBeforeShader,this.shader,this.operationsAfterShader,this.operationsHalfShader,this.isVisible?this.addExisting:""]))}get scaleVector(){return`vec3(${o(this.scaleXValue)},${o(this.scaleYValue)},${o(this.scaleZValue)})`}get scaleValue(){return Math.min(this.scaleXValue,Math.min(this.scaleYValue,this.scaleZValue))}show(){return this.isVisible=!0,this}hide(){return this.isVisible=!1,this}get positionVector(){return`vec3(${o(this.translateXValue)},${o(this.translateYValue)},${o(this.translateZValue)})`}get positionShader(){return`${this.pointVarName}=opPosition(${this.pointVarName},-${this.positionVector});`}translate(e=0,t=0,s=0){return this.translateXValue=e,this.translateYValue=t,this.translateZValue=s,this}translateX(e=0){return this.translate(e,this.translateYValue,this.translateZValue),this}translateY(e=0){return this.translate(this.translateXValue,e,this.translateZValue),this}translateZ(e=0){return this.translate(this.translateXValue,this.translateYValue,e),this}get rotationVector(){return`vec3(${o(this.rotateXValue)},${o(this.rotateYValue)},${o(this.rotateZValue)})`}get rotationShader(){return h([`${this.pointVarName}=rotateX(${this.pointVarName},${o(this.rotateXValue)});`,`${this.pointVarName}=rotateY(${this.pointVarName},${o(this.rotateYValue)});`,`${this.pointVarName}=rotateZ(${this.pointVarName},${o(this.rotateZValue)});`])}rotate(e=0,t=0,s=0,a=!0){return a?(this.rotateXValue=r(e),this.rotateYValue=r(t),this.rotateZValue=r(s)):(this.rotateXValue=e,this.rotateYValue=t,this.rotateZValue=s),this}rotateX(e=0){return this.rotate(e,this.rotateYValue,this.rotateZValue),this}rotateY(e=0){return this.rotate(this.rotateXValue,e,this.rotateZValue),this}rotateZ(e=0){return this.rotate(this.rotateXValue,this.rotateYValue,e),this}scale(e=1,t=1,s=1){return this.scaleXValue=e,this.scaleYValue=t,this.scaleZValue=s,this}scaleX(e=1){return this.scale(e,this.scaleYValue,this.scaleZValue),this}scaleY(e=1){return this.scale(this.scaleXValue,e,this.scaleZValue),this}scaleZ(e=1){return this.scale(this.scaleXValue,this.scaleYValue,e),this}get operationsBeforeShader(){return h(this.operationsBefore)}get operationsAfterShader(){return h(this.operationsAfter)}get operationsHalfShader(){return h(this.operationsHalf)}get operationsSymShader(){return h(this.operationsSym)}removeOperation(e){this.operationsBefore=this.operationsBefore.filter((t=>!t.includes(e))),this.operationsAfter=this.operationsAfter.filter((t=>!t.includes(e))),this.operationsHalf=this.operationsHalf.filter((t=>!t.includes(e))),this.operationsSym=this.operationsSym.filter((t=>!t.includes(e)))}elongate(e=.1,t=.1,s=.1){return this.operationsBefore.push(`${this.pointVarName}=opElongate(${this.pointVarName},vec3(${o(e)},${o(t)},${o(s)})).xyz;`),this}elongateX(e=.1){return this.elongate(e,0,0),this}elongateY(e=.1){return this.elongate(0,e,0),this}elongateZ(e=.1){return this.elongate(0,0,e),this}round(e=.1){return this.operationsAfter.push(`${this.sdfVarName}=opRound(${this.sdfVarName},${o(e)});`),this}onion(e=.03){return this.operationsAfter.push(`${this.sdfVarName}=opOnion(${this.sdfVarName},${o(e)});`),this}shell(e=.03){return this.operationsAfter.push(`${this.sdfVarName}=opShell(${this.sdfVarName},${o(e)});`),this}union(e){return this.operationsAfter.push(`${this.sdfVarName}=opUnion(${e.sdfVarName},${this.sdfVarName});`),e.hide(),this}intersect(e){return this.operationsAfter.push(`${this.sdfVarName}=opIntersection(${e.sdfVarName},${this.sdfVarName});`),e.hide(),this}subtract(e){return this.operationsAfter.push(`${this.sdfVarName}=opSubtraction(${e.sdfVarName},${this.sdfVarName});`),e.hide(),this}smoothUnion(e,t=.1){return this.operationsAfter.push(`${this.sdfVarName}=opSmoothUnion(${e.sdfVarName},${this.sdfVarName},${o(t)});`),e.hide(),this}smoothIntersect(e,t=.1){return this.operationsAfter.push(`${this.sdfVarName}=opSmoothIntersection(${e.sdfVarName},${this.sdfVarName},${o(t)});`),e.hide(),this}smoothSubtract(e,t=.1){return this.operationsAfter.push(`${this.sdfVarName}=opSmoothSubtraction(${e.sdfVarName},${this.sdfVarName},${o(t)});`),e.hide(),this}sym(e="x"){return this.operationsSym.push(`${this.pointVarName}=opSym${e.toUpperCase()}(${this.pointVarName});`),this}symX(){return this.sym("x"),this}symY(){return this.sym("y"),this}symZ(){return this.sym("z"),this}rep(e=3,t=3,s=3){return this.operationsBefore.push(`${this.pointVarName}=opRep(${this.pointVarName},vec3(${o(e)},${o(t)},${o(s)}));`),this}repLim(e=2,t=0,s=0,a=0,r=1,i=1,n=1){return this.operationsBefore.push(`${this.pointVarName}=opRepLim(${this.pointVarName},${o(e)},vec3(${o(t)},${o(s)},${o(a)}),vec3(${o(r)},${o(i)},${o(n)}));`),this}twist(e=3){return this.operationsBefore.push(`${this.pointVarName}=opTwist(${this.pointVarName},${o(e)});`),this}cheapBend(e=1){return this.operationsBefore.push(`${this.pointVarName}=opCheapBend(${this.pointVarName},${o(e)});`),this}half(e="x"){return this.operationsHalf.push(`${this.sdfVarName}=opHalf${e.toUpperCase()}(${this.sdfVarName},${this.pointVarName});`),this}halfX(){return this.half("x"),this}halfY(){return this.half("y"),this}halfZ(){return this.half("z"),this}}class d extends p{intrinsicParams;width;height;depth;thickness;xCornerRadius;yCornerRadius;zCornerRadius;uberHole;uberBevel;uberCone;constructor(e={}){super(e),this.width=0,this.height=0,this.depth=0,this.thickness=0,this.xCornerRadius=0,this.yCornerRadius=0,this.zCornerRadius=0;this.intrinsicParams={width:.5,height:.5,depth:.5,thickness:.25,xCornerRadius:0,yCornerRadius:0,zCornerRadius:0},this.initActualParams();const{uberHole:t=0,uberBevel:s=0,uberCone:a=0}=e;this.uberHole=t,this.uberBevel=s,this.uberCone=a}initActualParams(){const{width:e,height:t,depth:s,thickness:a,xCornerRadius:r,yCornerRadius:i,zCornerRadius:o}=this.intrinsicParams;this.width=e,this.height=t,this.depth=s,this.thickness=a,this.xCornerRadius=r,this.yCornerRadius=i,this.zCornerRadius=o}setUberHole(e){this.uberHole=e}setUberBevel(e){this.uberBevel=e}setUberCone(e){this.uberCone=e}get shader(){return`float ${this.sdfVarName}=sdUberprim(${this.pointVarName}/${this.scaleVector},vec4(${o(this.width)},${o(this.height)},${o(this.depth)},${o(this.thickness)}),vec3(${o(this.xCornerRadius)},${o(this.yCornerRadius)},${o(this.zCornerRadius)}))*${o(this.scaleValue)};`}}e.BezierSDF=class extends p{x1;y1;x2;y2;x3;y3;xMax;yMax;zMax;constructor(e={}){super(e);const{x1:t=0,y1:s=0,x2:a=0,y2:r=.8,x3:i=.6,y3:o=0,xMax:n=1.3,yMax:h=.9,zMax:c=.1}=e;this.x1=t,this.y1=s,this.x2=a,this.y2=r,this.x3=i,this.y3=o,this.xMax=n,this.yMax=h,this.zMax=c}get shader(){return`float ${this.sdfVarName}=sdBezier3D(${this.pointVarName}/${this.scaleVector},vec2(${o(this.x1)},${o(this.y1)}),vec2(${o(this.x2)},${o(this.y2)}),vec2(${o(this.x3)},${o(this.y3)}),${o(this.xMax)},${o(this.yMax)},${o(this.zMax)})*${o(this.scaleValue)};`}},e.BoxSDF=class extends p{width;height;depth;constructor(e={}){super(e);const{width:t=.5,height:s=.5,depth:a=.5}=e;this.width=t,this.height=s,this.depth=a}get shader(){return`float ${this.sdfVarName}=sdBox(${this.pointVarName}/${this.scaleVector},vec3(${o(this.width)},${o(this.height)},${o(this.depth)}))*${o(this.scaleValue)};`}},e.CylinderSDF=class extends p{radius;height;constructor(e={}){super(e);const{radius:t=.5,height:s=.5}=e;this.radius=t,this.height=s}get shader(){return`float ${this.sdfVarName}=sdCylinder(${this.pointVarName}/${this.scaleVector},vec2(${o(this.radius)},${o(this.height)}))*${o(this.scaleValue)};`}},e.DEFAULT_MATERIAL_ID=t,e.GroupSDF=class extends p{mapFuncName;primitives;constructor(e={}){super(e);const{mapFuncName:t="g1"}=e;this.mapFuncName=t,this.primitives=[]}addPrimitive(e){this.primitives.push(e)}get primitivesShaderArray(){return this.primitives.map((e=>e.totalShader))}get primitivesShader(){return h(this.primitivesShaderArray)}get primitivesShaderReverse(){return h(a(this.primitivesShaderArray))}get mapFuncShader(){return`\n    vec2 ${this.mapFuncName}(in vec3 pos)\n    {\n        vec2 res=vec2(1e10,0.);\n        \n        {\n            ${this.primitivesShaderReverse}\n        }\n        \n        return res;\n    }\n    `}get shader(){return`vec2 ${this.sdfVarName}=${this.mapFuncName}(${this.pointVarName}/${this.scaleVector})*${o(this.scaleValue)};`}get addExisting(){return`res=opUnion(res,${this.sdfVarName});`}},e.GyroidSDF=class extends p{gyroidScale;thickness;bias;constructor(e={}){super(e);const{gyroidScale:t=1,thickness:s=.03,bias:a=0}=e;this.gyroidScale=t,this.thickness=s,this.bias=a}get shader(){return`float ${this.sdfVarName}=sdGyroid(${this.pointVarName}/${this.scaleVector},${o(this.gyroidScale)},${o(this.thickness)},${o(this.bias)})*${o(this.scaleValue)};`}},e.JointSDF=class extends p{x1;y1;z1;x2;y2;z2;r;constructor(e={}){super(e);const{x1:t=0,y1:s=-.5,z1:a=0,x2:r=0,y2:i=.5,z2:o=0,r:n=.25}=e;this.x1=t,this.y1=s,this.z1=a,this.x2=r,this.y2=i,this.z2=o,this.r=n}get shader(){return`float ${this.sdfVarName}=sdCapsule(${this.pointVarName}/${this.scaleVector},vec3(${o(this.x1)},${o(this.y1)},${o(this.z1)}),vec3(${o(this.x2)},${o(this.y2)},${o(this.z2)}),${o(this.r)})*${o(this.scaleValue)};`}},e.Marcher=class{utilFunction;mapFunction;material;lighting;raycast;calcNormal;render;getSceneColor;mainImage;groups;showIsoline;constructor(e={}){this.utilFunction="",this.mapFunction=null,this.material=null,this.lighting=null,this.raycast=null,this.calcNormal=null,this.render=new l,this.getSceneColor=null,this.mainImage=new c,this.groups=[];const{antialias:t=!1,skybox:s="vec3(10.,10.,10.)/255.",showIsoline:a=!1}=e;t&&this.mainImage.setAntialias(!0),s&&this.render.setSkyBox(s),this.showIsoline=a}setUtilFunction(e){return this.utilFunction=e,this}setMapFunction(e){return this.mapFunction=e,this}setMaterial(e){return this.material=e,this}setLighting(e){return this.lighting=e,this}setRaycast(e){return this.raycast=e,this}setCalcNormal(e){return this.calcNormal=e,this}setGetSceneColor(e){return this.getSceneColor=e,this}addGroup(e){return this.groups.push(e),this}enableOrbitControls(){return this.setGetSceneColor("#define GLSLIFY 1\nvec3 getSceneColor(vec2 fragCoord){vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);vec3 ro=vec3(0.,4.,8.);vec3 ta=vec3(0.,0.,0.);const float fl=2.5;vec2 m=iMouse.xy/iResolution.xy;ro.yz=rotate(ro.yz,-m.y*PI+1.);ro.xz=rotate(ro.xz,-m.x*TWO_PI);vec3 rd=getRayDirection(p,ro,ta,fl);vec3 col=render(ro,rd);col=toGamma(col);return col;}"),this}enableBeautifulLighting(){return this.setLighting("#define GLSLIFY 1\nvec3 lighting(in vec3 col,in vec3 pos,in vec3 rd,in vec3 nor){vec3 lin=vec3(0.);vec3 ref=reflect(rd,nor);float occ=1.;{vec3 lig=normalize(vec3(-.5,.4,-.6));vec3 hal=normalize(lig-rd);float dif=diffuse(nor,lig);dif*=softshadow(pos,lig,.02,2.5);float spe=specular(nor,hal,16.);spe*=dif;spe*=fresnel(.04,.96,5.,-lig,hal);lin+=col*2.20*dif*vec3(1.30,1.,.70);lin+=5.*spe;}{float dif=sqrt(saturate_0(.5+.5*nor.y));dif*=occ;float spe=smoothstep(-.2,.2,ref.y);spe*=dif;spe*=fresnel(.04,.96,5.,rd,nor);spe*=softshadow(pos,ref,.02,2.5);lin+=col*.60*dif;lin+=2.*spe;}{float dif=diffuse(nor,normalize(vec3(.5,0.,.6)))*saturate_0(1.-pos.y);dif*=occ;lin+=col*.55*dif;}{float dif=fresnel(0.,1.,2.,rd,nor);dif*=occ;lin+=col*.25*dif;}return lin;}"),this}get shaderSDFUtils(){return"#define GLSLIFY 1\nconst float PI=3.14159265359;const float TWO_PI=6.28318530718;float sdBox(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}float sdSphere(vec3 p,float s){return length(p)-s;}float sdCylinder(vec3 p,vec3 c){return length(p.xz-c.xy)-c.z;}float sdCylinder(vec3 p,vec2 h){vec2 d=abs(vec2(length(p.xz),p.y))-h;return min(max(d.x,d.y),0.)+length(max(d,0.));}float sdCylinder(vec3 p,vec3 a,vec3 b,float r){vec3 pa=p-a;vec3 ba=b-a;float baba=dot(ba,ba);float paba=dot(pa,ba);float x=length(pa*baba-ba*paba)-r*baba;float y=abs(paba-baba*.5)-baba*.5;float x2=x*x;float y2=y*y*baba;float d=(max(x,y)<0.)?-min(x2,y2):(((x>0.)?x2:0.)+((y>0.)?y2:0.));return sign(d)*sqrt(abs(d))/baba;}float sdCapsule(vec3 p,vec3 a,vec3 b,float r){vec3 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h)-r;}float dot2(in vec2 v){return dot(v,v);}float dot2(in vec3 v){return dot(v,v);}float sdBezier(in vec2 pos,in vec2 A,in vec2 B,in vec2 C){vec2 a=B-A;vec2 b=A-2.*B+C;vec2 c=a*2.;vec2 d=A-pos;float kk=1./dot(b,b);float kx=kk*dot(a,b);float ky=kk*(2.*dot(a,a)+dot(d,b))/3.;float kz=kk*dot(d,a);float res=0.;float p=ky-kx*kx;float p3=p*p*p;float q=kx*(2.*kx*kx-3.*ky)+kz;float h=q*q+4.*p3;if(h>=0.){h=sqrt(h);vec2 x=(vec2(h,-h)-q)/2.;vec2 uv=sign(x)*pow(abs(x),vec2(1./3.));float t=clamp(uv.x+uv.y-kx,0.,1.);res=dot2(d+(c+b*t)*t);}else{float z=sqrt(-p);float v=acos(q/(p*z*2.))/3.;float m=cos(v);float n=sin(v)*1.732050808;vec3 t=clamp(vec3(m+m,-n-m,n-m)*z-kx,0.,1.);res=min(dot2(d+(c+b*t.x)*t.x),dot2(d+(c+b*t.y)*t.y));}return sqrt(res);}float opExtrusion_0(in vec3 p,in float sdf,in float h){vec2 w=vec2(sdf,abs(p.z)-h);return min(max(w.x,w.y),0.)+length(max(w,0.));}float sdBezier3D(in vec3 pos,in vec2 A,in vec2 B,in vec2 C,in float h){return opExtrusion_0(pos,sdBezier(pos.xy,A,B,C),h);}const float PI_0=3.14159265359;float sdBezier3D(in vec3 pos,in vec2 A,in vec2 B,in vec2 C,in float xMax,in float yMax,in float zMax){vec2 xyMax=vec2(xMax,yMax);vec2 v0=xyMax*cos(A*PI_0);vec2 v1=xyMax*cos(B*PI_0);vec2 v2=xyMax*cos(C*PI_0);return sdBezier3D(pos,v0,v1,v2,zMax);}float sdUnterprim(vec3 p,vec4 s,vec3 r,vec2 ba,float sz2){vec3 d=abs(p)-s.xyz;float q=length(max(d.xy,0.))+min(0.,max(d.x,d.y))-r.x;q=abs(q)-s.w;vec2 pa=vec2(q,p.z-s.z);vec2 diag=pa-vec2(r.z,sz2)*clamp(dot(pa,ba),0.,1.);vec2 h0=vec2(max(q-r.z,0.),p.z+s.z);vec2 h1=vec2(max(q,0.),p.z-s.z);return sqrt(min(dot(diag,diag),min(dot(h0,h0),dot(h1,h1))))*sign(max(dot(pa,vec2(-ba.y,ba.x)),d.z))-r.y;}float sdUberprim(vec3 p,vec4 s,vec3 r){s.xy-=r.x;r.x-=s.w;s.w-=r.y;s.z-=r.y;vec2 ba=vec2(r.z,-2.*s.z);return sdUnterprim(p,s,r,ba/dot(ba,ba),ba.y);}float sdStar(in vec2 p,in float r,in int n,in float m){float an=3.141593/float(n);float en=3.141593/m;vec2 acs=vec2(cos(an),sin(an));vec2 ecs=vec2(cos(en),sin(en));float bn=mod(atan(p.x,p.y),2.*an)-an;p=length(p)*vec2(cos(bn),abs(sin(bn)));p-=r*acs;p+=ecs*clamp(-dot(p,ecs),0.,r*acs.y/ecs.y);return length(p)*sign(p.x);}float opExtrusion_3(in vec3 p,in float sdf,in float h){vec2 w=vec2(sdf,abs(p.z)-h);return min(max(w.x,w.y),0.)+length(max(w,0.));}float sdStar3D(in vec3 pos,in float r,in int n,in float m,in float h){return opExtrusion_3(pos,sdStar(pos.xy,r,n,m),h);}float sdTriangle(in vec2 p,in vec2 p0,in vec2 p1,in vec2 p2){vec2 e0=p1-p0;vec2 e1=p2-p1;vec2 e2=p0-p2;vec2 v0=p-p0;vec2 v1=p-p1;vec2 v2=p-p2;vec2 pq0=v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.);vec2 pq1=v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.);vec2 pq2=v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);float s=e0.x*e2.y-e0.y*e2.x;vec2 d=min(min(vec2(dot(pq0,pq0),s*(v0.x*e0.y-v0.y*e0.x)),vec2(dot(pq1,pq1),s*(v1.x*e1.y-v1.y*e1.x))),vec2(dot(pq2,pq2),s*(v2.x*e2.y-v2.y*e2.x)));return-sqrt(d.x)*sign(d.y);}float opExtrusion_1(in vec3 p,in float sdf,in float h){vec2 w=vec2(sdf,abs(p.z)-h);return min(max(w.x,w.y),0.)+length(max(w,0.));}float sdTriangle3D(in vec3 pos,in vec2 p0,in vec2 p1,in vec2 p2,in float h){return opExtrusion_1(pos,sdTriangle(pos.xy,p0,p1,p2),h);}const float PI_1=3.14159265359;float sdTriangle3D(in vec3 pos,in vec2 A,in vec2 B,in vec2 C,in float xMax,in float yMax,in float zMax){vec2 xyMax=vec2(xMax,yMax);vec2 v0=xyMax*cos(A*PI_1);vec2 v1=xyMax*cos(B*PI_1);vec2 v2=xyMax*cos(C*PI_1);return sdTriangle3D(pos,v0,v1,v2,zMax);}float sdGyroid(vec3 p,float scale,float thickness,float bias){p*=scale;float d=dot(sin(p),cos(p.zxy));float g=abs(d-bias);return g/scale-thickness;}float ndot(in vec2 a,in vec2 b){return a.x*b.x-a.y*b.y;}float sdRhombus(vec3 p,float la,float lb,float h,float ra){p=abs(p);vec2 b=vec2(la,lb);float f=clamp((ndot(b,b-2.*p.xz))/dot(b,b),-1.,1.);vec2 q=vec2(length(p.xz-.5*b*vec2(1.-f,1.+f))*sign(p.x*b.y+p.z*b.x-b.x*b.y)-ra,p.y-h);return min(max(q.x,q.y),0.)+length(max(q,0.));}vec4 opElongate(in vec3 p,in vec3 h){vec3 q=abs(p)-h;return vec4(max(q,0.),min(max(q.x,max(q.y,q.z)),0.));}float opRound(in float d,in float h){return d-h;}float opOnion(in float d,in float h){return abs(d)-h;}float opInverse(float d){float result=-d;return result;}float opOffset(float d,float v){return d-v;}float opCrossing(float d1,float d2){return max(d1,d2);}float opDifference(float d1,float d2){return opCrossing(d1,opInverse(d2));}float opClearance(float d1,float d2,float v){return opDifference(d1,opOffset(d2,v));}float opShell(float d1,float v){return opClearance(d1,d1,-abs(v));}float opExtrusion_2(in vec3 p,in float sdf,in float h){vec2 w=vec2(sdf,abs(p.z)-h);return min(max(w.x,w.y),0.)+length(max(w,0.));}vec2 opRevolution(in vec3 p,float w){return vec2(length(p.xz)-w,p.y);}float length2(vec2 p){return sqrt(p.x*p.x+p.y*p.y);}float length4(vec2 p){p=p*p;p=p*p;return pow(p.x+p.y,1./4.);}float length6(vec2 p){p=p*p*p;p=p*p;return pow(p.x+p.y,1./6.);}float length8(vec2 p){p=p*p;p=p*p;p=p*p;return pow(p.x+p.y,1./8.);}float length8(vec3 p){p=p*p;p=p*p;p=p*p;return pow(p.x+p.y+p.z,1./8.);}float opUnion(float d1,float d2){return min(d1,d2);}vec2 opUnion(vec2 d1,vec2 d2){return(d1.x<d2.x)?d1:d2;}float opIntersection(float d1,float d2){return max(d1,d2);}float opSubtraction(float d1,float d2){return max(-d1,d2);}float opSmoothUnion(float d1,float d2,float k){float h=max(k-abs(d1-d2),0.);return min(d1,d2)-h*h*.25/k;}float opSmoothIntersection(float d1,float d2,float k){float h=max(k-abs(d1-d2),0.);return max(d1,d2)+h*h*.25/k;}float opSmoothSubtraction(float d1,float d2,float k){float h=max(k-abs(-d1-d2),0.);return max(-d1,d2)+h*h*.25/k;}float opRep(in float p,in float c){return mod(p,c)-.5*c;}vec2 opRep(in vec2 p,in vec2 c){return mod(p,c)-.5*c;}vec3 opRep(in vec3 p,in vec3 c){return mod(p,c)-.5*c;}float opRepLim(in float p,in float s,in float lima,in float limb){return p-s*clamp(round(p/s),lima,limb);}vec2 opRepLim(in vec2 p,in float s,in vec2 lima,in vec2 limb){return p-s*clamp(round(p/s),lima,limb);}vec3 opRepLim(in vec3 p,in float s,in vec3 lima,in vec3 limb){return p-s*clamp(round(p/s),lima,limb);}vec2 opSymX(in vec2 p){p.x=abs(p.x);return p;}vec3 opSymX(in vec3 p){p.x=abs(p.x);return p;}vec2 opSymY(in vec2 p){p.y=abs(p.y);return p;}vec3 opSymY(in vec3 p){p.y=abs(p.y);return p;}vec3 opSymZ(in vec3 p){p.z=abs(p.z);return p;}vec3 opTx(vec3 p,mat4 m){return vec3(inverse(m)*vec4(p,1.));}vec3 opTwist(vec3 p,float k){float c=cos(k*p.y);float s=sin(k*p.y);mat2 m=mat2(c,-s,s,c);vec3 q=vec3(m*p.xz,p.y);return q;}vec3 opCheapBend(vec3 p,float k){float c=cos(k*p.y);float s=sin(k*p.y);mat2 m=mat2(c,-s,s,c);vec3 q=vec3(m*p.xy,p.z);return q;}float opHalfX(float sdf,vec3 pos){return max(sdf,pos.x);}float opHalfY(float sdf,vec3 pos){return max(sdf,pos.y);}float opHalfZ(float sdf,vec3 pos){return max(sdf,pos.z);}vec3 opPosition(in vec3 p,in vec3 pos){return p-pos;}vec3 opRotation(const in vec3 p,const in vec4 q){return p+2.*cross(-q.xyz,cross(-q.xyz,p)+q.w*p);}vec3 opSymXYZ(in vec3 p,in vec3 pos,in vec3 mir,in vec3 axis){p=p*(vec3(1.)-mir)+(abs(p+pos-axis)-abs(pos-axis))*mir;return p;}vec2 normalizeScreenCoords(vec2 screenCoord,vec2 resolution){vec2 result=2.*(screenCoord/resolution.xy-.5);result.x*=resolution.x/resolution.y;return result;}mat3 setCamera(in vec3 ro,in vec3 ta,float cr){vec3 cw=normalize(ta-ro);vec3 cp=vec3(sin(cr),cos(cr),0.);vec3 cu=normalize(cross(cw,cp));vec3 cv=(cross(cu,cw));return mat3(cu,cv,cw);}vec3 getRayDirection(vec2 p,vec3 ro,vec3 ta,float fl){mat3 ca=setCamera(ro,ta,0.);vec3 rd=ca*normalize(vec3(p,fl));return rd;}float saturate_1(float a){return clamp(a,0.,1.);}float saturate_2(float a){return clamp(a,0.,1.);}float diffuse(vec3 n,vec3 l){float diff=saturate_2(dot(n,l));return diff;}float saturate_0(float a){return clamp(a,0.,1.);}float specular(vec3 n,vec3 l,float shininess){float spec=pow(saturate_0(dot(n,l)),shininess);return spec;}float fresnel(float bias,float scale,float power,vec3 I,vec3 N){return bias+scale*pow(1.+dot(I,N),power);}mat2 rotation2d(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}mat4 rotation3d(vec3 axis,float angle){axis=normalize(axis);float s=sin(angle);float c=cos(angle);float oc=1.-c;return mat4(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.,oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.,oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.,0.,0.,0.,1.);}vec2 rotate(vec2 v,float angle){return rotation2d(angle)*v;}vec3 rotate(vec3 v,vec3 axis,float angle){return(rotation3d(axis,angle)*vec4(v,1.)).xyz;}mat3 rotation3dX(float angle){float s=sin(angle);float c=cos(angle);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}vec3 rotateX(vec3 v,float angle){return rotation3dX(angle)*v;}mat3 rotation3dY(float angle){float s=sin(angle);float c=cos(angle);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}vec3 rotateY(vec3 v,float angle){return rotation3dY(angle)*v;}mat3 rotation3dZ(float angle){float s=sin(angle);float c=cos(angle);return mat3(c,s,0.,-s,c,0.,0.,0.,1.);}vec3 rotateZ(vec3 v,float angle){return rotation3dZ(angle)*v;}const float gamma=2.2;float toGamma(float v){return pow(v,1./gamma);}vec2 toGamma(vec2 v){return pow(v,vec2(1./gamma));}vec3 toGamma(vec3 v){return pow(v,vec3(1./gamma));}vec4 toGamma(vec4 v){return vec4(toGamma(v.rgb),v.a);}"}get shaderMapFunction(){return this.mapFunction?.shader||"#define GLSLIFY 1\nvec2 map(in vec3 pos){vec2 res=vec2(1e10,0.);return res;}"}get shaderRaycast(){return this.raycast||"#define GLSLIFY 1\nvec2 raycast(in vec3 ro,in vec3 rd){vec2 res=vec2(-1.,-1.);float t=0.;for(int i=0;i<64;i++){vec3 p=ro+t*rd;vec2 h=map(p);if(abs(h.x)<(.001*t)){res=vec2(t,h.y);break;};t+=h.x;}return res;}"}get shaderNormal(){return this.calcNormal||"#define GLSLIFY 1\nvec3 calcNormal(vec3 pos,float eps){const vec3 v1=vec3(1.,-1.,-1.);const vec3 v2=vec3(-1.,-1.,1.);const vec3 v3=vec3(-1.,1.,-1.);const vec3 v4=vec3(1.,1.,1.);return normalize(v1*map(pos+v1*eps).x+v2*map(pos+v2*eps).x+v3*map(pos+v3*eps).x+v4*map(pos+v4*eps).x);}vec3 calcNormal(vec3 pos){return calcNormal(pos,.002);}float softshadow(in vec3 ro,in vec3 rd,in float mint,in float tmax){float res=1.;float t=mint;for(int i=0;i<16;i++){float h=map(ro+rd*t).x;res=min(res,8.*h/t);t+=clamp(h,.02,.10);if(h<.001||t>tmax)break;}return clamp(res,0.,1.);}float ao(in vec3 pos,in vec3 nor){float occ=0.;float sca=1.;for(int i=0;i<5;i++){float hr=.01+.12*float(i)/4.;vec3 aopos=nor*hr+pos;float dd=map(aopos).x;occ+=-(dd-hr)*sca;sca*=.95;}return clamp(1.-3.*occ,0.,1.);}"}get shaderMaterial(){return this.material?.shader||"#define GLSLIFY 1\nvec3 material(in vec3 col,in vec3 pos,in float m,in vec3 nor){col=vec3(153.,204.,255.)/255.;return col;}"}get shaderLighting(){return this.lighting||"#define GLSLIFY 1\nvec3 lighting(in vec3 col,in vec3 pos,in vec3 rd,in vec3 nor){vec3 lin=col;{vec3 lig=normalize(vec3(1.,1.,1.));float dif=diffuse(nor,lig);float spe=specular(nor,lig,3.);lin+=col*dif*spe;}{lin*=col*.7;}return lin;}"}get shaderRender(){return this.render?.shader||"#define GLSLIFY 1\nvec3 render(in vec3 ro,in vec3 rd){vec3 col=vec3(10.,10.,10.)/255.;vec2 res=raycast(ro,rd);float t=res.x;float m=res.y;if(m>-.5){vec3 pos=ro+t*rd;vec3 nor=(m<1.5)?vec3(0.,1.,0.):calcNormal(pos);col=material(col,pos,m,nor);col=lighting(col,pos,rd,nor);}return col;}"}get shaderGetSceneColor(){return this.getSceneColor||"#define GLSLIFY 1\nvec3 getSceneColor(vec2 fragCoord){vec2 p=normalizeScreenCoords(fragCoord,iResolution.xy);vec3 ro=vec3(0.,4.,8.);vec3 ta=vec3(0.,0.,0.);const float fl=2.5;vec3 rd=getRayDirection(p,ro,ta,fl);vec3 col=render(ro,rd);col=toGamma(col);return col;}"}get shaderMainImage(){return this.mainImage?.shader||"#define GLSLIFY 1\nvoid mainImage(out vec4 fragColor,in vec2 fragCoord){vec3 tot=vec3(0.);float AA_size=1.;float count=0.;for(float aaY=0.;aaY<AA_size;aaY++){for(float aaX=0.;aaX<AA_size;aaX++){tot+=getSceneColor(fragCoord+vec2(aaX,aaY)/AA_size);count+=1.;}}tot/=count;fragColor=vec4(tot,1.);}"}get shaderGroupFunctionsArray(){return this.groups.map((e=>e.mapFuncShader))}get shaderGroupFunctions(){return h(this.shaderGroupFunctionsArray)}get shaderGroupFunctionsReverse(){return h(a(this.shaderGroupFunctionsArray))}get shaderIsolineDefine(){return"#define SHOW_ISOLINE "+(this.showIsoline?1:0)}get totalShaderArray(){return[this.shaderIsolineDefine,this.shaderSDFUtils,this.utilFunction,this.shaderGroupFunctionsReverse,this.shaderMapFunction,this.shaderRaycast,this.shaderNormal,this.shaderMaterial,this.shaderLighting,this.shaderRender,this.shaderGetSceneColor,this.shaderMainImage]}get fragmentShader(){return h(this.totalShaderArray)}},e.PolygonSDF=class extends p{radius;edgeCount;angleDivisor;depth;constructor(e={}){super(e);const{radius:t=.5,edgeCount:s=6,angleDivisor:a=2,depth:r=.5}=e;this.radius=t,this.edgeCount=s,this.angleDivisor=a,this.depth=r}get shader(){return`float ${this.sdfVarName}=sdStar3D(${this.pointVarName}/${this.scaleVector},${o(this.radius)},${this.edgeCount},${o(this.angleDivisor)},${o(this.depth)})*${o(this.scaleValue)};`}},e.PrimitiveSDF=p,e.RhombusSDF=class extends p{diagA;diagB;height;radius;constructor(e={}){super(e);const{diagA:t=.5,diagB:s=.25,height:a=.1,radius:r=0}=e;this.diagA=t,this.diagB=s,this.height=a,this.radius=r}get shader(){return`float ${this.sdfVarName}=sdRhombus(${this.pointVarName}/${this.scaleVector},${o(this.diagA)},${o(this.diagB)},${o(this.height)},${o(this.radius)})*${o(this.scaleValue)};`}},e.SDFLayer=class{primitives;customCodesBefore;customCodesAfter;constructor(){this.primitives=[],this.customCodesBefore=[],this.customCodesAfter=[]}addPrimitive(e){return this.primitives.push(e),this}prependCustomCode(e){return this.customCodesBefore.push(e),this}appendCustomCode(e){return this.customCodesAfter.push(e),this}get primitivesShaderArray(){return this.primitives.map((e=>e.totalShader))}get primitivesShader(){return h(this.primitivesShaderArray)}get primitivesShaderReverse(){return h(a(this.primitivesShaderArray))}get customCodesBeforeShader(){return h(this.customCodesBefore)}get customCodesAfterShader(){return h(this.customCodesAfter)}get totalShaderArray(){return[this.customCodesBeforeShader,this.primitivesShaderReverse,this.customCodesAfterShader]}get shader(){return`\n      {\n        ${h(this.totalShaderArray)}\n      }\n      `}},e.SDFMainImage=c,e.SDFMapFunction=class{layers;constructor(){this.layers=[]}addLayer(e){return this.layers.push(e),this}get layerShader(){return h(this.layers.map((e=>e.shader)))}get shader(){return`\n      vec2 map(in vec3 pos)\n      {\n          vec2 res=vec2(1e10,0.);\n          \n          ${this.layerShader}\n          \n          return res;\n      }\n      `}},e.SDFMaterial=class{materials;constructor(){this.materials=[]}addMaterial(e=t,s=""){return this.materials.push(`\n    if(m==${e}){\n        ${s}\n    }\n      `),this}addColorMaterial(e=t,s=255,a=255,r=255){const o=`col=vec3(${i(s)},${i(a)},${i(r)})/255.;`;return this.addMaterial(e,o),this}addIsolineMaterial(e=t,s=1,a=0,r=1){const o=`\n    if(SHOW_ISOLINE==1){\n      col=drawIsoline(col,vec3(pos.x*${i(s)},pos.y*${i(a)},pos.z*${i(r)}));\n    }\n    `;return this.addMaterial(e,o),this}get shader(){return`\n    vec3 drawIsoline(vec3 col,vec3 pos){\n      float d=map(pos).x;\n      col*=1.-exp(-6.*abs(d));\n      col*=.8+.2*cos(150.*d);\n      col=mix(col,vec3(1.),1.-smoothstep(0.,.01,abs(d)));\n      return col;\n    }\n\n    vec3 material(in vec3 col,in vec3 pos,in float m,in vec3 nor){\n        col=vec3(153.,204.,255.)/255.;\n        \n        ${h(this.materials)}\n        \n        return col;\n    }\n      `}},e.SDFRender=l,e.SphereSDF=class extends p{radius;constructor(e={}){super(e);const{radius:t=.5}=e;this.radius=t}get shader(){return`float ${this.sdfVarName}=sdSphere(${this.pointVarName}/${this.scaleVector},${o(this.radius)})*${o(this.scaleValue)};`}},e.TriangleSDF=class extends p{x1;y1;x2;y2;x3;y3;xMax;yMax;zMax;constructor(e={}){super(e);const{x1:t=0,y1:s=0,x2:a=0,y2:r=.8,x3:i=.6,y3:o=0,xMax:n=1.3,yMax:h=.9,zMax:c=.1}=e;this.x1=t,this.y1=s,this.x2=a,this.y2=r,this.x3=i,this.y3=o,this.xMax=n,this.yMax=h,this.zMax=c}get shader(){return`float ${this.sdfVarName}=sdTriangle3D(${this.pointVarName}/${this.scaleVector},vec2(${o(this.x1)},${o(this.y1)}),vec2(${o(this.x2)},${o(this.y2)}),vec2(${o(this.x3)},${o(this.y3)}),${o(this.xMax)},${o(this.yMax)},${o(this.zMax)})*${o(this.scaleValue)};`}},e.UberprimBoxSDF=class extends d{constructor(e={}){super(e);this.intrinsicParams={width:.5,height:.5,depth:.5,thickness:.25,xCornerRadius:0,yCornerRadius:0,zCornerRadius:0},this.initActualParams(),this.setUberHole(this.uberHole),this.setUberBevel(this.uberBevel),this.setUberCone(this.uberCone)}setParameterByHole(){this.thickness=this.intrinsicParams.width/2-this.uberHole}setParameterByBevel(){this.xCornerRadius=this.uberBevel}setParameterByCone(){this.width=n(this.intrinsicParams.depth,0,this.uberCone),this.height=n(this.intrinsicParams.depth,0,this.uberCone),this.zCornerRadius=n(0,this.intrinsicParams.depth,this.uberCone)}setUberHole(e){super.setUberHole(e),this.setParameterByHole()}setUberBevel(e){super.setUberBevel(e),this.setParameterByBevel()}setUberCone(e){super.setUberCone(e),this.setParameterByCone()}},e.UberprimCapsuleSDF=class extends d{constructor(e={}){super(e);this.intrinsicParams={width:.5,height:.5,depth:1,thickness:.5,xCornerRadius:.5,yCornerRadius:.5,zCornerRadius:0},this.initActualParams(),this.setUberCone(this.uberCone)}setParameterByCone(){this.width=n(this.intrinsicParams.depth/2,0,this.uberCone),this.height=n(this.intrinsicParams.depth/2,0,this.uberCone),this.zCornerRadius=n(0,this.intrinsicParams.depth/2,this.uberCone),this.thickness=n(this.intrinsicParams.thickness,this.intrinsicParams.thickness/2,this.uberCone),this.xCornerRadius=n(this.intrinsicParams.xCornerRadius,0,this.uberCone),this.yCornerRadius=n(this.intrinsicParams.yCornerRadius,0,this.uberCone)}setUberCone(e){super.setUberCone(e),this.setParameterByCone()}},e.UberprimConeSDF=class extends d{constructor(e={}){super(e);this.intrinsicParams={width:0,height:0,depth:.5,thickness:.25,xCornerRadius:0,yCornerRadius:0,zCornerRadius:.5},this.initActualParams()}},e.UberprimCylinderSDF=class extends d{constructor(e={}){super(e);this.intrinsicParams={width:.5,height:.5,depth:.5,thickness:.25,xCornerRadius:.5,yCornerRadius:0,zCornerRadius:0},this.initActualParams(),this.setUberHole(this.uberHole),this.setUberCone(this.uberCone)}setParameterByHole(){this.thickness=this.intrinsicParams.width/2-this.uberHole}setParameterByCone(){this.width=n(this.intrinsicParams.depth,0,this.uberCone),this.height=n(this.intrinsicParams.depth,0,this.uberCone),this.zCornerRadius=n(0,this.intrinsicParams.depth,this.uberCone),this.xCornerRadius=n(this.intrinsicParams.xCornerRadius,0,this.uberCone)}setUberHole(e){super.setUberHole(e),this.setParameterByHole()}setUberCone(e){super.setUberCone(e),this.setParameterByCone()}},e.UberprimSDF=d,e.UberprimSphereSDF=class extends d{constructor(e={}){super(e);this.intrinsicParams={width:.5,height:.5,depth:.5,thickness:.5,xCornerRadius:.5,yCornerRadius:.5,zCornerRadius:0},this.initActualParams()}},e.UberprimTorusSDF=class extends d{constructor(e={}){super(e);this.intrinsicParams={width:.5,height:.5,depth:.125,thickness:.125,xCornerRadius:.5,yCornerRadius:.125,zCornerRadius:0},this.initActualParams()}},e.compact=s,e.deg2rad=r,e.joinLine=h,e.lerp=n,e.rad2Deg=e=>180*e/Math.PI,e.reverse=a,e.toFixed1=i,e.toFixed2=o,Object.defineProperty(e,"__esModule",{value:!0})}));
