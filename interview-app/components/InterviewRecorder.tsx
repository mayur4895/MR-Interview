// components/InterviewRecorder.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import TermsAndConditions from './Terms-condition';
import VideoFeed from './Video-feed';
import QuestionDisplay from './Question-display';
 

const InterviewRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [questions] = useState<string[]>([
    "Tell us about yourself.",
    "Why do you want to work here?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in five years?",
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showTerms, setShowTerms] = useState(true);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);

        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => [...prev, event.data]);
          }
        };

        recorder.onstop = () => {
          const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(videoBlob);
          console.log("Video recorded:", videoUrl);
          // Handle the recorded video URL here (e.g., upload it to the server)
        };
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    getUserMedia();
  }, []);

  const startInterview = () => {
    if (mediaRecorder && !isRecording) {
      setIsRecording(true);
      mediaRecorder.start();
      setShowTerms(false); // Hide terms and conditions when starting the interview
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleSubmitInterview = () => {
    if (mediaRecorder) {
      mediaRecorder.stop(); // Stop the recording
      router.push('/response-recorded'); // Redirect to the response recorded page
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {showTerms ? (
        <TermsAndConditions onStartInterview={startInterview} />
      ) : (
        <QuestionDisplay
          question={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onNext={handleNextQuestion}
          onSubmit={handleSubmitInterview}
        />
      )}
      <VideoFeed isRecording={isRecording} stream={videoStream} />
    </div>
  );
};

export default InterviewRecorder;
