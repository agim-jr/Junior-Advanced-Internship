'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function PlayerPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const bookId = params.id as string;
  const audioRef = useRef<HTMLAudioElement>(null);

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Tab state
  const [activeTab, setActiveTab] = useState<'summary' | 'audio'>('summary');

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Fetch book
  useEffect(() => {
    async function fetchBook() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
        );

        if (!response.ok) {
          throw new Error('Book not found');
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError('Failed to load book');
        console.error('Error fetching book:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [book]);

  // Play/Pause toggle
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Seek audio
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  // Change playback speed
  const changeSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];

    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !book || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error || 'Book not found'}
          </h2>
          <button
            onClick={() => router.push('/for-you')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold truncate mx-4">{book.title}</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Book Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-6">
            <img
              src={book.imageLink}
              alt={book.title}
              className="w-32 h-48 object-cover rounded shadow"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-1">{book.author}</p>
              <p className="text-sm text-gray-500 mb-4">{book.subTitle}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{book.averageRating}</span>
                </div>
                <div>⏱️ {book.keyIdeas} Key Ideas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'summary'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📖 Summary
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'audio'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🎧 Audio
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'summary' && (
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {book.summary}
                </div>
              </div>
            )}

            {activeTab === 'audio' && (
              <div>
                {/* Audio Player */}
                <audio ref={audioRef} src={book.audioLink} />

                {/* Player Controls */}
                <div className="bg-gray-100 rounded-lg p-6">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-center gap-6">
                    {/* Speed Control */}
                    <button
                      onClick={changeSpeed}
                      className="text-gray-700 hover:text-blue-600 font-semibold"
                    >
                      {playbackRate}x
                    </button>

                    {/* Rewind */}
                    <button
                      onClick={() => skip(-10)}
                      className="text-gray-700 hover:text-blue-600 text-2xl"
                    >
                      ⏪
                    </button>

                    {/* Play/Pause */}
                    <button
                      onClick={togglePlayPause}
                      className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 text-3xl"
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>

                    {/* Forward */}
                    <button
                      onClick={() => skip(10)}
                      className="text-gray-700 hover:text-blue-600 text-2xl"
                    >
                      ⏩
                    </button>

                    {/* Volume (placeholder) */}
                    <button className="text-gray-700 hover:text-blue-600 text-2xl">
                      🔊
                    </button>
                  </div>
                </div>

                {/* Now Playing Info */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">Now playing</p>
                  <p className="font-semibold text-lg">{book.title}</p>
                  <p className="text-gray-500">by {book.author}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
