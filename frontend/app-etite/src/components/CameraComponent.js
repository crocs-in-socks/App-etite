import React, { useState } from 'react';

function CameraComponent({onCapture}) {
    const handleTakePicture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            const videoElement = document.createElement('video');
            document.body.appendChild(videoElement);
            videoElement.srcObject = stream;
            videoElement.play();

            const canvas = document.createElement('canvas');
            canvas.width = videoElement.width;
            canvas.height = videoElement.height;
            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL('image/png');
            onCapture(imageData);

            videoElement.srcObject.getVideoTracks().forEach(track => track.stop());
            document.body.removeChild(videoElement);
        }
        catch (error) {
            console.error('Error accessing camera:', camera);
        }
    };

    return (
        <div>
            <button onClick={handleTakePicture}>Take Picture</button>
        </div>
    );
};

export default CameraComponent