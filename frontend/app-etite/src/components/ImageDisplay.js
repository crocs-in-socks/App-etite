import React, { useState } from 'react';

const ImageDisplay = ({imageData}) => {
    return(
        <div>
            {imageData && <img src={imageData} />}
        </div>
    );
};