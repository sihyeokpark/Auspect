import { useRef, useEffect, useCallback } from 'react'

import AudioSpectrum from '../interfaces/AudioSpectrum'

interface BarAudioSpectrumProps extends AudioSpectrum {

}

export default function BarAudioSpectrum(props: BarAudioSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback((): void => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (ctx) {
      ctx.strokeStyle = props.color
      ctx.lineWidth = 5

      ctx.beginPath()
      ctx.moveTo(200, 500)
      ctx.lineTo(1000, 1000)
      ctx.closePath()

      ctx.stroke()
    }
  }, [props.color])

  return (
    <div className='BarAudioSpectrum'>
      <canvas ref={canvasRef} width='1000px' height='1000px'></canvas>
    </div>
  )
}