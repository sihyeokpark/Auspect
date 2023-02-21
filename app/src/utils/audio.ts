export default async function getAudioData(src: string) {
  const response = await fetch(src, {
    method: 'GET',
    mode: 'no-cors'
  })
  const arrayBuffer = await response.arrayBuffer()

  const audioCtx = new AudioContext()
  let soundSource
  audioCtx.decodeAudioData(arrayBuffer, (buffer) => {
    soundSource = audioCtx.createBufferSource()
  })
  // const rawData = audioBuffer.getChannelData(0)

  // console.log(rawData.length, rawData)

  // const samplesPerSec = 100 // 1초당 표시할 샘플의 수
  // const { duration, sampleRate } = audioBuffer

  // const totalSamples = duration * samplesPerSec // 구간 처리 후 전체 샘플 수
  // const blockSize = Math.floor(sampleRate / samplesPerSec) // 샘플링 구간 사이즈
  // const filteredData: number[] = []

  console.log(audioCtx)
  const analyser = audioCtx.createAnalyser()
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  analyser.connect(audioCtx.destination)
  analyser.fftSize = 256
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.getByteFrequencyData(dataArray)

  console.log(dataArray)

  return [analyser, dataArray, bufferLength]

  // for (let i = 0; i < totalSamples; i++) {
  //   const blockStart = blockSize * i // 샘플 구간 시작 포인트
  //   let blockSum = 0

  //   for (let j = 0; j < blockSize; j++) {
  //     if (rawData[blockStart + j]) {
  //       blockSum = blockSum + Math.abs(rawData[blockStart + j]);
  //     }
  //   }

  //   filteredData.push(blockSum / blockSize)
  // }
  // console.log(filteredData)

  // return filteredData
}