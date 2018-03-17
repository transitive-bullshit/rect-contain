# rect-contain ([demo](https://transitive-bullshit.github.io/rect-contain/))

> Computes a transform between two rectangles the same way as `background-size: contain`.

[![NPM](https://img.shields.io/npm/v/rect-contain.svg)](https://www.npmjs.com/package/rect-contain) [![Build Status](https://travis-ci.org/transitive-bullshit/rect-contain.svg?branch=master)](https://travis-ci.org/transitive-bullshit/rect-contain) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

Simulating `background-size: contain` is very useful for canvas animations, drawing sprites in games, and rendering videos. This module is used as part of our video rendering pipeline at [Automagical](https://automagical.ai/).

## Install

```bash
npm install --save rect-contain
```

## Usage

Check out the [demo](https://transitive-bullshit.github.io/rect-contain/) to understand what this module does.

```js
const rectContain = require('rect-contain')

const {
  scale,
  translate
} = rectContain({ width: 500, height: 500 }, { width: 1280, height: 720 })

// CSS transforms apply the rightmost operation first.
// Note that this assumes a transform-origin of `top left`.
const transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
```

## API

### rectContain(viewport, image)

Returns a 2D affine transform defined by `{ scale: Number, translate: { x: Number, y: Number } }` such that the given `image` will be fully contained within the `viewport` and also maintain its original aspect ratio.

Note that you'll want to apply the `scale` transform first followed by the `translate`.

#### viewport

Type: `{ width: Number, height: Number }`

The viewport you want to draw the image into.

#### image

Type: `{ width: Number, height: Number }`

The dimensions of the image to be drawn.

## Related

- [rect-cover](https://github.com/transitive-bullshit/rect-cover)
- [rect-crop](https://github.com/gre/rect-crop) if you need to mimic rect-cover with a `zoom` ratio and `center` point (eg, for [kenburns effects](https://github.com/gre/kenburns))
- [css background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
