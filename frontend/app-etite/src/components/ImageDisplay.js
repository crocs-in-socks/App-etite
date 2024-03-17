import React from 'react'

const ImageDisplay = ({imageData}) => {
    return(
        <div>
            {imageData && <img src={imageData} alt='Captured Image'/>}
        </div>
    )
}

export default ImageDisplay