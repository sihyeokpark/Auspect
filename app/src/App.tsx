import { useEffect } from 'react'

import LineAudioVisualizer from './components/visualizer/LineAudioVisualizer'
import getAudioData from './utils/audio'

function App() {
  

  useEffect(() => {
    getAudioData()
  }, [])
  
  return (
    <div className='App'>
      {/* <LineAudioVisualizer music='fwef' color='black' count={30}/> */}

    </div>
  )
}

export default App
