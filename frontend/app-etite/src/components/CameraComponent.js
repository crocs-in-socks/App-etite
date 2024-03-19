import React, { useState, useRef } from 'react'

function CameraComponent({onCapture, uploadButton, uploadFileButton}) {
    const [stream, setStream] = useState(null)
    const [showStartButton, setShowStartButton] = useState(true)
	const [videoOn, setVideoOn] = useState(false)
    const videoRef = useRef()

    const startCamera = async () => {
        try {
			setVideoOn(prev => !prev)
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

	function renderVideoStream() {
		if (videoOn)
			return <video className="videostream" ref={videoRef} autoPlay playsInline muted style={{ display: stream ? 'block' : 'none' }}/>

		else
			return <div className="greybox">Upload a food image!</div>
	}

    return (
        <div className="camera-button-group">
            {renderVideoStream()}
			<div className="image-buttons-row">
				{showStartButton && <button className="gradient-button" onClick={startCamera}>Open Camera</button>}
				{uploadButton()}
                {uploadFileButton()}
				{stream && <button className="gradient-button" onClick={takePicture}>Take Picture</button>}
			</div>
        </div>
    )
}

export default CameraComponent