import React, { useEffect, useState } from 'react';
import { ungzip } from 'pako';
import { Buffer } from 'buffer';

function MediaContentData({ mediaData }) {
    const [mediaContent, setMediaContent] = useState([]);
    const [loadError, setLoadError] = useState(false);

    const mediaContentSetter = (data) =>{
        setMediaContent(prev => [...prev, data]);
    };

    useEffect(() => {
        let objectUrl = null;

        if (mediaData) {
            try {
                let l = mediaData.length;
                for (let i = 0; i < l; i++) {
                    const mimeType = mediaData[i].type || 'application/octet-stream';
                    objectUrl = mediaData[i].fileUrl;

                    // Determine the media type and render appropriate content
                    switch (mimeType.split('/')[0]) {
                        case 'image':
                                                       
                            console.log('Image:', objectUrl);
                            mediaContentSetter(<img src={objectUrl} alt={mediaData[i].fileName} />);
                            break;
                        case 'video':
                            mediaContentSetter(<video controls>
                                <source src={objectUrl} type={mimeType} alt={mediaData[i].fileName}/>
                            </video>);
                            break;
                        case 'audio':
                            mediaContentSetter(<audio controls>
                                <source src={objectUrl} type={mimeType} alt={mediaData[i].fileName}/>
                            </audio>);
                            break;
                        default:
                            console.error('Unsupported media type:', mimeType);

                    }
                    setLoadError(false);
                }
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

    // console.log('MediaContentData:', mediaContent);

    return (
        <div>
            {mediaContent}
            {/* {loadError && <p>Error loading media. Please check the format.</p>} */}
        </div>
    );
}

export default MediaContentData;