'use strict'

const { test } = require('ava')
const rectCover = require('.')

const viewports = [
  { width: 1280, height: 720 },
  { width: 200, height: 200 },
  { width: 1000, height: 1000 },
  { width: 400, height: 800 },
  { width: 1, height: 1 }
]

const images = [
  { width: 460, height: 360 },
  { width: 100, height: 200 },
  { width: 500, height: 5000 },
  { width: 400, height: 800 },
  { width: 1, height: 1 },
  { width: 2400, height: 10 }
]

viewports.forEach((viewport) => {
  images.forEach((image) => {
    const name = `viewport ${viewport.width}x${viewport.height}; image ${image.width}x${image.height}`
    test(name, async (t) => {
      const {
        scale,
        translate
      } = rectCover(viewport, image)

      t.truthy(scale > 0)
      t.truthy(image.width * scale <= viewport.width)
      t.truthy(image.height * scale <= viewport.height)

      t.truthy(translate.x >= 0)
      t.truthy(translate.y >= 0)
    })
  })
})
