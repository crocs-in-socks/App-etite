import React from 'react'

const ImageDisplay = ({imageData}) => {
    return(
        <div>
            {imageData && <img className="captured-image" src={imageData} alt='Captured'/>}
        </div>
    )
}

export default ImageDisplay