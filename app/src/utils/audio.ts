export default async function getAudioData() {
  const response = await fetch('/SoundHelix-Song-1.mp3', {
    method: 'GET',
    mode: 'no-cors'
  })
  const arrayBuffer = await response.arrayBuffer()

  const audioCtx = new AudioContext()
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
  const rawData = audioBuffer.getChannelData(0)

  console.log(rawData.length, rawData)

  const samplesPerSec = 100 // 1초당 표시할 샘플의 수
  const {
    duration, sampleRate, // 샘플링 레이트. 보통 48000 또는 44100.
  } = audioBuffer;

  const totalSamples = duration * samplesPerSec // 구간 처리 후 전체 샘플 수
  const blockSize = Math.floor(sampleRate / samplesPerSec) // 샘플링 구간 사이즈
  const filteredData: number[] = []

  for (let i = 0; i < totalSamples; i++) {
    const blockStart = blockSize * i // 샘플 구간 시작 포인트
    let blockSum = 0

    for (let j = 0; j < blockSize; j++) {
      if (rawData[blockStart + j]) {
        blockSum = blockSum + Math.abs(rawData[blockStart + j]);
      }
    }

    filteredData.push(blockSum / blockSize)
  }
  console.log(filteredData)
}