'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import SkeletonPlayer from '@/components/SkeletonPlayer';

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
  const seekingRef = useRef(false); // Track if user is actively seeking

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isAudioReady, setIsAudioReady] = useState(false); // Track audio readiness

  const [activeTab, setActiveTab] = useState<'summary' | 'audio'>('summary');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

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

  // Fixed: Better audio event handling with proper cleanup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !book?.audioLink) return;

    // Reset state when audio source changes
    setIsAudioReady(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const updateTime = () => {
      if (!seekingRef.current && audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      if (audio && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsAudioReady(true);
      }
    };

    const handleCanPlay = () => {
      setIsAudioReady(true);
      if (audio && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsAudioReady(false);
      setError('Failed to load audio file');
    };

    // Add all event listeners
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Load the audio
    audio.load();

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [book?.audioLink]);

  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !isAudioReady) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  }, [isPlaying, isAudioReady]);

  // Fixed: Proper seek handling with mousedown/mouseup events
  const handleSeekStart = () => {
    seekingRef.current = true;
  };

  const handleSeekEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !isAudioReady) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    seekingRef.current = false;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update UI immediately while dragging
    setCurrentTime(parseFloat(e.target.value));
  };

  // Fixed: Better skip function with boundary checks
  const skip = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !isAudioReady || !isFinite(duration)) return;

    const newTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration, isAudioReady]);

  const changeSpeed = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];

    setPlaybackRate(nextSpeed);
    audio.playbackRate = nextSpeed;
  }, [playbackRate]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading || authLoading) {
    return <SkeletonPlayer />;
  }

  if (error || !book || !user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '256px',
        transition: 'margin-left 0.3s ease',
      }}
      className="error-container">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '16px',
          }}>
            {error || 'Book not found'}
          </h2>
          <button
            onClick={() => router.push('/for-you')}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Back to Home
          </button>
        </div>
        <style jsx>{`
          @media (max-width: 1024px) {
            .error-container {
              margin-left: 0 !important;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '16px',
          marginLeft: '256px',
          transition: 'margin-left 0.3s ease',
        }}
        className="header-content">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}>
            <button
              onClick={() => router.back()}
              style={{
                color: '#2563eb',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1e40af'}
              onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
            >
              ← Back
            </button>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              textAlign: 'center',
            }}>
              {book.title}
            </h1>
            <div style={{ width: '80px' }}></div>
          </div>
        </div>
      </div>

      <div style={{
        marginLeft: '256px',
        transition: 'margin-left 0.3s ease',
      }}
      className="main-content">
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '32px 16px',
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '24px',
            marginBottom: '32px',
          }}>
            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
            }}
            className="book-info-flex">
              <img
                src={book.imageLink}
                alt={book.title}
                style={{
                  width: '128px',
                  height: '192px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#111827',
                }}>
                  {book.title}
                </h2>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '4px',
                }}>
                  {book.author}
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                  marginBottom: '16px',
                }}>
                  {book.subTitle}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  flexWrap: 'wrap',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#eab308' }}>★</span>
                    <span>{book.averageRating}</span>
                  </div>
                  <div>⏱ {book.keyIdeas} Key Ideas</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '32px',
          }}>
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e5e7eb',
            }}>
              <button
                onClick={() => setActiveTab('summary')}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  fontWeight: '600',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: activeTab === 'summary' ? '#2563eb' : '#6b7280',
                  borderBottom: activeTab === 'summary' ? '2px solid #2563eb' : 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => {
                  if (activeTab !== 'summary') e.currentTarget.style.color = '#374151';
                }}
                onMouseOut={(e) => {
                  if (activeTab !== 'summary') e.currentTarget.style.color = '#6b7280';
                }}
              >
                📝 Summary
              </button>
              <button
                onClick={() => setActiveTab('audio')}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  fontWeight: '600',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: activeTab === 'audio' ? '#2563eb' : '#6b7280',
                  borderBottom: activeTab === 'audio' ? '2px solid #2563eb' : 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => {
                  if (activeTab !== 'audio') e.currentTarget.style.color = '#374151';
                }}
                onMouseOut={(e) => {
                  if (activeTab !== 'audio') e.currentTarget.style.color = '#6b7280';
                }}
              >
                🎧 Audio
              </button>
            </div>

            <div style={{ padding: '32px' }}>
              {activeTab === 'summary' && (
                <div>
                  <div style={{
                    whiteSpace: 'pre-line',
                    color: '#374151',
                    lineHeight: '1.75',
                    fontSize: '1rem',
                  }}>
                    {book.summary}
                  </div>
                </div>
              )}

              {activeTab === 'audio' && (
                <div>
                  <audio
                    ref={audioRef}
                    src={book.audioLink}
                    preload="metadata"
                    crossOrigin="anonymous"
                  />

                  {!isAudioReady && (
                    <div style={{ textAlign: 'center', color: '#6b7280', marginBottom: '16px' }}>
                      Loading audio...
                    </div>
                  )}

                  <div style={{
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    padding: '24px',
                    opacity: isAudioReady ? 1 : 0.5,
                    pointerEvents: isAudioReady ? 'auto' : 'none',
                  }}>
                    <div style={{ marginBottom: '16px' }}>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeekChange}
                        onMouseDown={handleSeekStart}
                        onMouseUp={handleSeekEnd}
                        onTouchStart={handleSeekStart}
                        onTouchEnd={handleSeekEnd}
                        disabled={!isAudioReady}
                        style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#d1d5db',
                          borderRadius: '8px',
                          appearance: 'none',
                          cursor: isAudioReady ? 'pointer' : 'not-allowed',
                          accentColor: '#2563eb',
                        }}
                      />
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginTop: '8px',
                      }}>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '24px',
                      flexWrap: 'wrap',
                    }}>
                      <button
                        onClick={changeSpeed}
                        disabled={!isAudioReady}
                        style={{
                          color: '#374151',
                          fontWeight: '600',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: isAudioReady ? 'pointer' : 'not-allowed',
                          fontSize: '1rem',
                        }}
                        onMouseOver={(e) => isAudioReady && (e.currentTarget.style.color = '#2563eb')}
                        onMouseOut={(e) => e.currentTarget.style.color = '#374151'}
                      >
                        {playbackRate}x
                      </button>

                      <button
                        onClick={() => skip(-10)}
                        disabled={!isAudioReady}
                        style={{
                          color: '#374151',
                          fontSize: '1.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: isAudioReady ? 'pointer' : 'not-allowed',
                        }}
                        onMouseOver={(e) => isAudioReady && (e.currentTarget.style.color = '#2563eb')}
                        onMouseOut={(e) => e.currentTarget.style.color = '#374151'}
                      >
                        ⏪
                      </button>

                      <button
                        onClick={togglePlayPause}
                        disabled={!isAudioReady}
                        style={{
                          width: '64px',
                          height: '64px',
                          backgroundColor: isAudioReady ? '#2563eb' : '#9ca3af',
                          color: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.875rem',
                          border: 'none',
                          cursor: isAudioReady ? 'pointer' : 'not-allowed',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseOver={(e) => isAudioReady && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                        onMouseOut={(e) => isAudioReady && (e.currentTarget.style.backgroundColor = '#2563eb')}
                      >
                        {isPlaying ? '⏸' : '▶'}
                      </button>

                      <button
                        onClick={() => skip(10)}
                        disabled={!isAudioReady}
                        style={{
                          color: '#374151',
                          fontSize: '1.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: isAudioReady ? 'pointer' : 'not-allowed',
                        }}
                        onMouseOver={(e) => isAudioReady && (e.currentTarget.style.color = '#2563eb')}
                        onMouseOut={(e) => e.currentTarget.style.color = '#374151'}
                      >
                        ⏩
                      </button>

                      <button
                        style={{
                          color: '#374151',
                          fontSize: '1.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#374151'}
                      >
                        🔊
                      </button>
                    </div>
                  </div>

                  <div style={{
                    marginTop: '24px',
                    textAlign: 'center',
                  }}>
                    <p style={{ color: '#6b7280', marginBottom: '4px' }}>Now playing</p>
                    <p style={{
                      fontWeight: '600',
                      fontSize: '1.125rem',
                      marginBottom: '4px',
                      color: '#111827',
                    }}>
                      {book.title}
                    </p>
                    <p style={{ color: '#9ca3af' }}>by {book.author}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .header-content,
          .main-content {
            margin-left: 0 !important;
          }
          .main-content {
            padding-top: 60px;
          }
        }
        @media (max-width: 640px) {
          .book-info-flex {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }

        /* Fix range slider for WebKit browsers */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
