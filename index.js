'use strict'

module.exports = (viewport, image) => {
  const { width: w, height: h } = viewport
  const { width: W, height: H } = image

  const R = W / H

  const W0 = h * R
  const H0 = w / R

  if (H0 < h) {
    // constrain width; H0 is smaller axis
    return {
      scale: w / W,
      translate: {
        x: 0,
        y: -((H0 - h) / 2)
      }
    }
  } else {
    // constrain height; W0 is smaller axis
    return {
      scale: h / H,
      translate: {
        x: -((W0 - w) / 2),
        y: 0
      }
    }
  }
}
