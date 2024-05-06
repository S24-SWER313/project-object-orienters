import React, {useEffect, useState} from 'react';
import {ungzip} from 'pako'; // Or another library for gzip decompression
import {Buffer} from 'buffer'; // Import the buffer polyfill

function MediaContentData({mediaData}) {
    const [mediaContent, setMediaContent] = useState(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        let objectUrl = null;

        if (mediaData && mediaData.data) {
            try {
                // Use Buffer from the buffer polyfill to decode the base64 data
                const base64DecodedData = Buffer.from(mediaData.data, 'base64');
                const ungzipedData = ungzip(base64DecodedData);
                const mimeType = mediaData.type || 'application/octet-stream';

                // Create a URL object from the decompressed data
                objectUrl = URL.createObjectURL(new Blob([ungzipedData], {type: mimeType}));

                // Determine the media type and render appropriate content
                switch (mimeType.split('/')[0]) {
                    case 'image':
                        setMediaContent(<img src={objectUrl} alt="Media"/>);
                        break;
                    case 'video':
                        setMediaContent(<video controls>
                            <source src={objectUrl} type={mimeType}/>
                        </video>);
                        break;
                    case 'audio':
                        setMediaContent(<audio controls>
                            <source src={objectUrl} type={mimeType}/>
                        </audio>);
                        break;
                    default:
                        setMediaContent(<p>No preview available</p>);
                }
                setLoadError(false);
            } catch (error) {
                console.error('Error processing media data:', error);
                setMediaContent(null);
                setLoadError(true);
            }
        } else {
            setMediaContent(null);
        }

        // Cleanup URL object after component unmount
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [mediaData]);

    return (
        <div>
            {mediaContent}
            {/* {loadError && <p>Error loading media</p>} */}
        </div>
    );
}

export default MediaContentData;
