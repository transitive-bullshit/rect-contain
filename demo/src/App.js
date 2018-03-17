import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

import BlockImage from 'react-block-image'
import rectContain from 'rect-contain'

import ribbon from './ribbon.png'
import images from './images'
import styles from './styles.css'

export default class App extends Component {
  state = {
    index: 0,
    status: 'loading',
    width: undefined,
    height: undefined
  }

  _isMounted = false

  componentWillMount() {
    this._isMounted = true
    this._reload()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render () {
    const {
      index,
      status
    } = this.state

    const image = images[index]

    const aspectRatio = 16 / 9
    const widthC = Math.min(720 - 32, window.innerWidth)
    const heightC = Math.min(480, window.innerHeight)

    const heightR = widthC / aspectRatio
    const widthR = heightC * aspectRatio

    const width = Math.min(widthC, widthR)
    const height = Math.min(heightC, heightR)
    let transform = null

    if (status === 'success') {
      const { scale, translate } = rectContain({ width, height }, this.state)
      transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
    }

    return (
      <MuiThemeProvider>
        <div>
          <a href='https://github.com/transitive-bullshit/rect-contain'>
            <img
              src={ribbon}
              alt='Fork me on GitHub'
              className={styles.ribbon}
            />
          </a>

          <div className={styles.container}>
            <div style={{ width: '100%' }}>
              <div className={styles.horiz}>
                <div>
                  <h3>
                    css background-size contain
                  </h3>

                  <BlockImage
                    className={styles.image}
                    src={image.src}
                    backgroundSize='contain'
                    style={{
                      width,
                      height
                    }}
                  />
                </div>

                <div>
                  <h3>
                    rect-contain demo
                  </h3>

                  <div
                    className={styles.image}
                    style={{
                      width,
                      height
                    }}
                  >
                    {transform && (
                      <img
                        className={styles.img}
                        src={image.src}
                        style={{ transform }}
                      />
                    )}
                  </div>

                  <p>
                    Viewport size: {width}x{height}px
                  </p>

                  <p>
                    Image size: {this.state.width}x{this.state.height}px
                  </p>

                  <p>
                    Transform: {transform}
                  </p>
                </div>
              </div>

              <div className={styles.footer}>
                <p>
                  Image credit <a href={image.source.userUrl} target='_blank' rel='noopener'>{image.source.user}</a> / <a href={image.source.url} target='_blank' rel='noopener'>{image.source.label}</a>.
                </p>

                <div className={styles.actions}>
                  <RaisedButton
                    label='Prev'
                    onTouchTap={this._onSelectPrev}
                  />

                  <RaisedButton
                    label='Next'
                    onTouchTap={this._onSelectNext}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

  _onSelectPrev = () => {
    let index = this.state.index - 1
    if (index < 0) index = images.length - 1

    this.setState({ index, status: 'loading' }, this._reload)
  }

  _onSelectNext = () => {
    let index = this.state.index + 1
    if (index >= images.length) index = 0

    this.setState({ index, status: 'loading' }, this._reload)
  }

  _reload = () => {
    const { index } = this.state
    const { src } = images[index]

    if (!src) {
      this.setState({ status: 'error' })
    } else {
      const img = new window.Image()

      img.onload = () => {
        if (this._isMounted) {
          this.setState({
            status: 'success',
            width: img.naturalWidth,
            height: img.naturalHeight
          })
        }
      }

      img.onerror = img.onabort = (event) => {
        if (this._isMounted) {
          this.setState({ status: 'error' })
        }
      }

      this.setState({ status: 'loading' })
      img.src = src
    }
  }
}
