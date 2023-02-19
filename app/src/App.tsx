import { useEffect } from 'react'

import LineAudioVisualizer from './components/visualizer/LineAudioVisualizer'

function App() {
  async function getaudioData() {
    const response = await fetch('/SoundHelix-Song-1.mp3', {
      method: 'GET',
      mode: 'no-cors'
    })
    const arrayBuffer = await response.arrayBuffer()

    const audioCtx = new AudioContext()
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    const rawData = audioBuffer.getChannelData(0)

    console.log(rawData.length, rawData)
  }

  useEffect(() => {
    getaudioData()
  }, [])
  
  return (
    <div className='App'>
      {/* <BarAudioSpectrum music='fwef' color='black' count={30}/> */}

    </div>
  )
}

export default App
