import React, { useEffect, useState } from 'react';
import { ungzip } from 'pako';
import { Buffer } from 'buffer';

function MediaContentData({ mediaData }) {
    const [mediaContent, setMediaContent] = useState(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        let objectUrl = null;

        if (mediaData && mediaData.data) {
            try {
                const base64DecodedData = Buffer.from(mediaData.data, 'base64');
                let processedData;

                // Check if data is gzipped by checking the magic number
                if (base64DecodedData[0] === 0x1f && base64DecodedData[1] === 0x8b) {
                    processedData = ungzip(base64DecodedData);  // If gzipped, decompress
                } else {
                    processedData = base64DecodedData;         // If not gzipped, use as is
                }

                const mimeType = mediaData.type || 'application/octet-stream';
                objectUrl = URL.createObjectURL(new Blob([processedData], { type: mimeType }));

                // Determine the media type and render appropriate content
                switch (mimeType.split('/')[0]) {
                    case 'image':
                        setMediaContent(<img src={objectUrl} alt="Media" />);
                        break;
                    case 'video':
                        setMediaContent(<video controls>
                            <source src={objectUrl} type={mimeType} />
                        </video>);
                        break;
                    case 'audio':
                        setMediaContent(<audio controls>
                            <source src={objectUrl} type={mimeType} />
                        </audio>);
                        break;
                    
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

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [mediaData]);

    return (
        <div>
            {mediaContent}
            {/* {loadError && <p>Error loading media. Please check the format.</p>} */}
        </div>
    );
}

export default MediaContentData;