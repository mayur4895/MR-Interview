// components/VideoFeed.tsx
import React, { useRef, useEffect } from 'react';

interface VideoFeedProps {
  isRecording: boolean;
  stream: MediaStream | null;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ isRecording, stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '200px', height: '150px', borderRadius: '10px', overflow: 'hidden', display: isRecording ? 'block' : 'none' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          border: '2px solid #000',
        }}
      />
    </div>
  );
};

export default VideoFeed;
