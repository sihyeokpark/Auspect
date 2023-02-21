import { useEffect, useRef } from 'react'

import LineAudioVisualizer from './components/visualizer/LineAudioVisualizer'
import getAudioData from './utils/audio'

function App() {
  return (
    <div className='App'>
      <LineAudioVisualizer music='fwef' color='black' x={200} y={200} width={10}/>

    </div>
  )
}

export default App
