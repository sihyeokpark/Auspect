import { useState, useRef, useEffect, useCallback } from 'react'

import AudioVisualizer from '../interfaces/AudioVisualizer'

interface LineAudioVisualizerProps extends AudioVisualizer {
  count: number
}

class Line {
  constructor(
    public x: number,
    public y: number,
    public height: number,
    public color: string
  ) {}
}

export default function BarAudioSpectrum(props: LineAudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [time, setTime] = useState<number>(0)
  const requestRef = useRef<number>(0)
  const linesRef = useRef<Line[]>([])

  const init = useCallback(() => {
    if (linesRef.current?.length !== 0) return // prevent re-initialization (React.strictMode)
    const lines = linesRef.current
    for (let i = 0; i < props.count; i++) {
      lines.push(new Line(200 + i*20, 500, 100, 'black'))
    }
  }, [])

  const draw = useCallback((t: DOMHighResTimeStamp): void => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const lines = linesRef.current
    
    ctx?.clearRect(0, 0, canvas?.width as number, canvas?.height as number);
    setTime(t)

    for (let i = 0; i < lines.length; i++) {
      const random: number = Math.random() * 5
      lines[i].height -= random-0.5 * 5
    }
    console.log(lines)

    if (ctx) {
      ctx.strokeStyle = props.color
      ctx.lineWidth = 5
      
      lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x, line.y - line.height)
        ctx.closePath()

        ctx.stroke()
      })
      
    }
    requestRef.current = requestAnimationFrame(draw)
  }, [props.count])

  useEffect(() => {
    init()
    requestRef.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  return (
    <div className='LineAudioVisualizer'>
      <canvas ref={canvasRef} width='1000px' height='1000px'></canvas>
    </div>
  )
}