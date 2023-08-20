import React, { useState } from 'react'

import logo from './logo.svg'
import './App.css'

const Range = props => <input
  type="range"
  { ...props }
/>

const Rotate = ({
  amplitude=0.15,
  animation="ossicilate",
  frequency=1,
  x=0.5,
  y=0.5,
  onClick,
  children,
}) => <div
  className={"rotate"}
  style={ {
    "--ossicilate-min": `-${amplitude}rad`,
    "--ossicilate-max": `${amplitude}rad`,
    "--rotate-animation": `${animation}`,
    "--rotate-x-origin": `${x * 100}%`,
    "--rotate-y-origin": `${y * 100}%`,
    "--rotate-frequency": `${1/frequency}s`,
  }}
  onClick={onClick}
>
  {children}
</div>

const App = () => {

  const [src, setSrc] = useState(logo)
  const [amplitude, setAmplitude] = useState(0.1)
  const [frequency, setFrequency] = useState(1.0)
  const [x, setX] = useState(0.5)
  const [y, setY] = useState(0.5)

  const handleClick = e => {
    const elementWidth = e.currentTarget.offsetWidth
    const elementHeight = e.currentTarget.offsetHeight

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    const relativeX = x / elementWidth
    const relativeY = y / elementHeight

    setX(relativeX)
    setY(relativeY)
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          className="src"
          type="text"
          value={src}
          onChange={e => setSrc(e.target.value)}
        />
        <Rotate
          amplitude={amplitude}
          frequency={frequency}
          x={x}
          y={y}
          onClick={handleClick}
        >
          <img src={src} className="App-logo" alt="logo" />
        </Rotate>
        <div className="controls">
          <div>
            Amplitude (rad):
            <Range
              min={0.0} max={4*Math.PI} step={0.01}
              value={amplitude}
              onChange={e => setAmplitude(e.target.value)}
            />
          </div>
          <div>
            Frequency (s):
            <Range
              min={0.01} max={4} step={0.01}
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
            />
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
