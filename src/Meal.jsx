import { Buffer } from 'buffer';
import React from 'react';
import { ungzip } from 'pako';

function Meal({ category }) {
    const [imageSrc, setImageSrc] = React.useState(null);
    const [loadError, setLoadError] = React.useState(false);

    React.useEffect(() => {
        if (category.mediaData && category.mediaData.data) {
            try {
                const base64DecodedData = Buffer.from(category.mediaData.data, 'base64');
                const ungzipedData = ungzip(base64DecodedData);
                const mimeType = 'image/jpeg'; // This should ideally be dynamically determined
                const blob = new Blob([ungzipedData], { type: mimeType });
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
                setLoadError(false);
            } catch (error) {
                console.error('Error processing image data:', error);
                setImageSrc(null);
                setLoadError(true);
            }
        } else {
            setImageSrc(null);
        }
    }, [category]);

    return (
        <div style={{ width: "30%" }}>
            <h5>{category.contentID}</h5>
            {imageSrc && <img src={imageSrc} alt="Meal" />}
            {!imageSrc && loadError}
            <p>{category.textData}</p>
        </div>
    );
}

export default Meal;
