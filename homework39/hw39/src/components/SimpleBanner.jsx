import { useState } from 'react';

export function SimpleBanner({images}) {
    const [imageIndex, setImageIndex] = useState(0);

    const handleClick = (e) => {
        console.log(`picture clicked, image selected: ${imageIndex}`);
        setImageIndex((imageIndex + 1) % images.length);
        console.log(`imageIndex ${imageIndex} new src=${images[imageIndex]}`);
    }

    return (
        <div>
            <img src={images[imageIndex]} onClick={handleClick}></img>
        </div>
    )
} 