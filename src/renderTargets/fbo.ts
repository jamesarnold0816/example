import * as THREE from "three";

import type { Base } from "../base/base";
import { Component } from "../components/component";

export interface FBOConfig {
  width: number;
  height: number;
  samples: number;
  options: THREE.RenderTargetOptions;
}

class FBO extends Component {
  rt: THREE.WebGLRenderTarget;
  constructor(base: Base, config: Partial<FBOConfig> = {}) {
    super(base);

    const {
      width = this.defaultWidth,
      height = this.defaultHeight,
      samples = 0,
      options = {},
    } = config;

    const rt = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      type: THREE.HalfFloatType,
      ...options,
    });
    this.rt = rt;
    if (samples) {
      rt.samples = samples;
    }

    this.base.resizer.on("resize", () => {
      this.rt.setSize(width, height);
    });
  }
  get defaultWidth() {
    return window.innerWidth * window.devicePixelRatio;
  }
  get defaultHeight() {
    return window.innerHeight * window.devicePixelRatio;
  }
}

export { FBO };
