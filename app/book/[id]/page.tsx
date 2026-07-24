'use client';

import { useEffect, useState } from 'react';
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

export default function BookPage() {
  const { user, loading: authLoading, openAuthModal } = useAuth();
  const router = useRouter();
  const params = useParams();
  const bookId = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleReadOrListen = (action: 'read' | 'listen') => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (book?.subscriptionRequired) {
      router.push('/choose-plan');
      return;
    }

    router.push(`/player/${bookId}`);
  };

  const handleAddToLibrary = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    alert('Added to library! (Feature coming soon)');
  };

  if (isLoading || authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
      }}>
        <div style={{ fontSize: '1.25rem' }}>Loading book...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '16px'
          }}>
            {error || 'Book not found'}
          </h2>
          <button
            onClick={() => router.push('/for-you')}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
    }}>
      <div style={{
        marginLeft: '256px',
        transition: 'margin-left 0.3s ease',
      }}
      className="book-page-content">
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '32px 16px',
        }}>
          <button
            onClick={() => router.back()}
            style={{
              marginBottom: '24px',
              color: '#2563eb',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#1e40af'}
            onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
          >
            ← Back
          </button>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '32px',
            marginBottom: '32px',
          }}>
            <div style={{
              display: 'flex',
              gap: '32px',
            }}
            className="book-info-layout">
              <div style={{ flexShrink: 0 }}>
                <img
                  src={book.imageLink}
                  alt={book.title}
                  style={{
                    width: '256px',
                    height: '384px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                  className="book-cover"
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '16px' }}>
                  {book.subscriptionRequired && (
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: '#fbbf24',
                      color: '#78350f',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      marginBottom: '8px',
                    }}>
                      Premium
                    </span>
                  )}
                  <h1 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#111827',
                  }}>
                    {book.title}
                  </h1>
                  <p style={{
                    fontSize: '1.25rem',
                    color: '#6b7280',
                    marginBottom: '8px'
                  }}>
                    {book.subTitle}
                  </p>
                  <p style={{
                    fontSize: '1.125rem',
                    color: '#374151'
                  }}>
                    By {book.author}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  marginBottom: '24px',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  flexWrap: 'wrap',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fbbf24' }}>★</span>
                    <span>
                      {book.averageRating} ({book.totalRating} reviews)
                    </span>
                  </div>
                  <div>⏱️ {book.keyIdeas} Key Ideas</div>
                  <div>📚 {book.type}</div>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '24px',
                }}>
                  {book.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#e5e7eb',
                        color: '#374151',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}>
                  <button
                    onClick={() => handleReadOrListen('read')}
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '12px 32px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    📖 Read
                  </button>
                  <button
                    onClick={() => handleReadOrListen('listen')}
                    style={{
                      backgroundColor: '#16a34a',
                      color: 'white',
                      padding: '12px 32px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                  >
                    🎧 Listen
                  </button>
                  <button
                    onClick={handleAddToLibrary}
                    style={{
                      backgroundColor: '#e5e7eb',
                      color: '#374151',
                      padding: '12px 32px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                  >
                    + Add to Library
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '32px',
            marginBottom: '32px',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#111827',
            }}>
              About the Book
            </h2>
            <p style={{
              color: '#374151',
              lineHeight: '1.75',
              whiteSpace: 'pre-line',
            }}>
              {book.bookDescription}
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '32px',
            marginBottom: '32px',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#111827',
            }}>
              About the Author
            </h2>
            <p style={{
              color: '#374151',
              lineHeight: '1.75',
              whiteSpace: 'pre-line',
            }}>
              {book.authorDescription}
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '32px',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#111827',
            }}>
              Summary
            </h2>
            <p style={{
              color: '#374151',
              lineHeight: '1.75',
              whiteSpace: 'pre-line',
              display: '-webkit-box',
              WebkitLineClamp: 6,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {book.summary}
            </p>
            <button
              onClick={() => handleReadOrListen('read')}
              style={{
                marginTop: '16px',
                color: '#2563eb',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1e40af'}
              onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
            >
              Read full summary →
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .book-page-content {
            margin-left: 0 !important;
            padding-top: 60px;
          }
          .book-info-layout {
            flex-direction: column !important;
            align-items: center !important;
          }
          .book-cover {
            width: 100% !important;
            max-width: 300px !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
