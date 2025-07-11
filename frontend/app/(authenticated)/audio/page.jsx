'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Upload, Loader2, Play, Pause } from 'lucide-react';

export default function AudioExperiencePage() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    
    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);
    const intervalRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const chunks = [];
            mediaRecorder.ondataavailable = (event) => {
                chunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                setAudioBlob(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            setError(null);
            setResult(null);

            // Start timer
            intervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (err) {
            setError('Error accessing microphone: ' + err.message);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(intervalRef.current);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const playAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            setAudioBlob(file);
            setError(null);
            setResult(null);
        } else {
            setError('Please select a valid audio file');
        }
    };

    const processAudio = async () => {
        if (!audioBlob) {
            setError('No audio file to process');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');

            const response = await fetch('/api/process-audio', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            setResult(data.result);
        } catch (err) {
            setError('Error processing audio: ' + err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const resetAll = () => {
        setAudioBlob(null);
        setResult(null);
        setError(null);
        setIsPlaying(false);
        setRecordingTime(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Create Your Tourism Experience
                        </h1>
                        <p className="text-gray-600">
                            Speak in your native language to create a tourism post
                        </p>
                    </div>

                    {/* Recording Section */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Record Your Experience
                        </h2>
                        
                        <div className="flex flex-col items-center space-y-4">
                            {isRecording && (
                                <div className="text-lg font-mono text-red-600">
                                    Recording: {formatTime(recordingTime)}
                                </div>
                            )}
                            
                            <div className="flex space-x-4">
                                {!isRecording ? (
                                    <button
                                        onClick={startRecording}
                                        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
                                    >
                                        <Mic size={20} />
                                        <span>Start Recording</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={stopRecording}
                                        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
                                    >
                                        <Square size={20} />
                                        <span>Stop Recording</span>
                                    </button>
                                )}
                            </div>

                            {/* File Upload Option */}
                            <div className="text-center">
                                <p className="text-gray-500 mb-2">Or upload an audio file</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Upload size={18} />
                                    <span>Upload Audio</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Audio Preview */}
                    {audioBlob && (
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Audio Preview
                            </h3>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={playAudio}
                                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                                </button>
                                <audio
                                    ref={audioRef}
                                    src={audioBlob ? URL.createObjectURL(audioBlob) : ''}
                                    onEnded={() => setIsPlaying(false)}
                                    className="hidden"
                                />
                                <button
                                    onClick={resetAll}
                                    className="text-red-500 hover:text-red-700 px-4 py-2 border border-red-300 rounded-lg transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Process Button */}
                    {audioBlob && (
                        <div className="text-center mb-6">
                            <button
                                onClick={processAudio}
                                disabled={isProcessing}
                                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <span>Create Tourism Post</span>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Result Display */}
                    {result && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Generated Tourism Post
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Title:</h4>
                                    <p className="text-gray-600 mb-4">{result.title}</p>
                                    
                                    <h4 className="font-semibold text-gray-700 mb-2">Description:</h4>
                                    <p className="text-gray-600 mb-4">{result.description}</p>
                                    
                                    <h4 className="font-semibold text-gray-700 mb-2">Location:</h4>
                                    <p className="text-gray-600 mb-4">{result.village}, {result.state}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Price:</h4>
                                    <p className="text-gray-600 mb-4">₹{result.price}</p>
                                    
                                    <h4 className="font-semibold text-gray-700 mb-2">Duration:</h4>
                                    <p className="text-gray-600 mb-4">{result.duration}</p>
                                    
                                    <h4 className="font-semibold text-gray-700 mb-2">Status:</h4>
                                    <p className="text-gray-600 mb-4">{result.isPublic ? 'Public' : 'Private'}</p>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Images:</h4>
                                <div className="space-y-1">
                                    {result.images.map((img, index) => (
                                        <p key={index} className="text-gray-600 text-sm">{img}</p>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">JSON Output:</h4>
                                <pre className="text-xs text-gray-600 overflow-x-auto">
                                    {JSON.stringify(result, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}