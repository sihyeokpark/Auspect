import { useState, useRef, useEffect, useCallback } from 'react'

import getAudioData from '../../utils/audio'
import AudioVisualizer from '../../interfaces/AudioVisualizer'
import { buffer } from 'stream/consumers'

interface LineAudioVisualizerProps extends AudioVisualizer {
  
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
  const audioData = useRef<Uint8Array>(new Uint8Array())
  const requestRef = useRef<number>(0)
  const linesRef = useRef<Line[]>([])
  const bufferLength = useRef<number>(0)
  const analyser = useRef<AnalyserNode>()

  // function init() {
  //   if (linesRef.current?.length !== 0) return // prevent re-initialization (React.strictMode)
  //   for (let i = 0; i < props.count; i++) {
  //     linesRef.current.push(new Line(200 + i*20, 500, 100, 'black'))
  //   }
  // }

  const draw = useCallback((t: DOMHighResTimeStamp): void => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const lines = linesRef.current
    
    ctx?.clearRect(0, 0, canvas?.width as number, canvas?.height as number);
    setTime(t)

    analyser.current!.getByteFrequencyData(audioData.current)

    if (!ctx) {
      console.log('canvas ctx doesn\'t exist')
      return
    }
    ctx.strokeStyle = props.color
    ctx.lineWidth = 5

    let x = props.x
    
    for (let i = 0; i < bufferLength.current; i++) {
      ctx.beginPath()
      ctx.fillRect(x, props.y, props.width, audioData.current[i])
      ctx.closePath()
      ctx.stroke()
      x += props.width + 20
    }
    
    requestRef.current = requestAnimationFrame(draw)
  }, [props.x, props.y,  props.width, audioData, bufferLength, analyser])

  useEffect(() => {
    async function main() {
      // init()
      const [dataAnalyser, dataArray, dataLength] = await getAudioData('/SoundHelix-Song-1.mp3')
      analyser.current = dataAnalyser as AnalyserNode
      audioData.current = dataArray as Uint8Array
      bufferLength.current = dataLength as number

      console.log(audioData.current)

      requestRef.current = requestAnimationFrame(draw)
      return () => cancelAnimationFrame(requestRef.current)
    }

    main()
  }, [])

  return (
    <div className='LineAudioVisualizer'>
      <canvas ref={canvasRef} width='1000px' height='1000px'></canvas>
    </div>
  )
}