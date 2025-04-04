<<<<<<< HEAD
<div align="center">
  <img src="./assets/logo.jpg" width="200">
  <h1>kokomi.js</h1>
  <p>A growing three.js helper library.</p>
</div>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/kokomi.js.svg" />
  <a href="https://github.com/alphardex/kokomi.js/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/alphardex007" target="_blank">
    <img alt="Twitter: alphardex007" src="https://img.shields.io/twitter/follow/alphardex007.svg?style=social" />
  </a>
</p>

> Sangonomiya Kokomi, the young Divine Priestess of Watatsumi Island.

## Install

```sh
npm i kokomi.js
```

Also, make sure to install three.js.

```sh
npm i three
```

Check the documentation: https://kokomi-docs.netlify.app/

## Hello world

With just several lines, you can make a most basic 3D scene :d

index.html

```html
<div id="sketch"></div>
```

style.css

```css
#sketch {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
}
```

script.js

```js
import * as kokomi from "kokomi.js";

class Sketch extends kokomi.Base {
  create() {
    new kokomi.OrbitControls(this);

    const box = new kokomi.Box(this);
    box.addExisting();

    this.update((time) => {
      box.spin(time);
    });
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

createSketch();
```

![Basic](./assets/previews/1.gif?v=3)

Online Sandbox: https://kokomi-sandbox.netlify.app/

## Features

- You can simply extend `kokomi.Base` class to kickstart a simple scene without writing any boilerplate codes.
- Either you can write all your three.js code in a single file, or encapsulate your code into individual classes in a large project. By extending `kokomi.Component`, you can make your components keep their own state and animation.
- `kokomi.AssetManager` can handle the preloads of assets (gltfModel, texture, cubeTexture, font, etc). You can just write a simple js object to config your assets without caring about various loaders.
- Integrated with [three.interactive](https://github.com/markuslerner/THREE.Interactive), which can handle mouse and touch interactions easily.
- Many more [useful components](https://kokomi-js.netlify.app/examples/) for you to discover!

## Previews

### Model Showcase

![2](./assets/previews/2.gif?v=3)

### Shadertoy Integration

![3](./assets/previews/3.gif?v=3)

### Persistence Effect

![4](./assets/previews/4.gif?v=3)

### Render Texture

![5](./assets/previews/5.gif?v=3)

### Reflector

![6](./assets/previews/6.gif?v=3)

### Infinite Gallery

![7](./assets/previews/7.gif?v=3)

## Credits

- [three.js](https://github.com/mrdoob/three.js)
- [drei](https://github.com/pmndrs/drei)
- Various articles from [codrops](https://tympanus.net/codrops/) and other amazing blogs
- Various video tutorials from [youtube](https://www.youtube.com/)

## Author

👤 **alphardex**

- Website: https://alphardex.netlify.app
- Twitter: [@alphardex007](https://twitter.com/alphardex007)
- Github: [@alphardex](https://github.com/alphardex)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
=======
# example
>>>>>>> cab70d95fc631936e7e6fce6dda86bd397dffaaa
