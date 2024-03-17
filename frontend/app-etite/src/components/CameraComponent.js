import React, { useState, useRef } from 'react'

function CameraComponent({onCapture}) {
    const [stream, setStream] = useState(null)
    const [showStartButton, setShowStartButton] = useState(true)
    const videoRef = useRef()

    const startCamera = async () => {
        try {
            const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: {ideal: 'environment'}} })
            setStream(userMediaStream)
            setShowStartButton(false)
            onCapture(null)
            if (videoRef.current) {
                videoRef.current.srcObject = userMediaStream;
            }
        } catch (error) {
          console.error('Error accessing camera:', error)
        }
    }

    const stopCamera = () => {
        if (stream) {
          stream.getTracks().forEach(track => track.stop())
          setStream(null)
          setShowStartButton(true)
        }
    }

    const takePicture = async () => {
        if (!stream || !videoRef.current)
            return
    
        const video = videoRef.current
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL('image/png')
        onCapture(imageData)
        stopCamera()
    }

    return (
        <div>
            {showStartButton && <button onClick={startCamera}>Start Camera</button>}
            {stream && <button onClick={takePicture}>Take Picture</button>}
            <video ref={videoRef} autoPlay playsInline muted style={{ display: stream ? 'block' : 'none' }}/>
        </div>
    )
}

export default CameraComponent