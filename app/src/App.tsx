import { useEffect, useRef } from 'react'

import LineAudioVisualizer from './components/visualizer/LineAudioVisualizer'
import getAudioData from './utils/audio'

function App() {
  // const data = useRef<number[]>([])
  // useEffect(() => {
  //   async function test() {
  //     data.current = await getAudioData('/SoundHelix-Song-1.mp3')
  //     console.log('Success', data.current)
  //   }
  //   test()
  // }, [])

  return (
    <div className='App'>
      <LineAudioVisualizer music='fwef' color='black' count={30}/>

    </div>
  )
}

export default App
