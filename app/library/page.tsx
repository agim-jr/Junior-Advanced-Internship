'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import SkeletonLibrary from '@/components/SkeletonLibrary';

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

interface SavedBook extends Book {
  savedAt: string;
  isFinished: boolean;
}

export default function LibraryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<SavedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchLibrary() {
      if (!user) return;

      try {
        setIsLoading(true);

        const savedBooksData = localStorage.getItem(`library_${user.uid}`);
        const finishedBooksData = localStorage.getItem(`finished_${user.uid}`);

        if (savedBooksData) {
          setSavedBooks(JSON.parse(savedBooksData));
        }

        if (finishedBooksData) {
          setFinishedBooks(JSON.parse(finishedBooksData));
        }
      } catch (error) {
        console.error('Error fetching library:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchLibrary();
    }
  }, [user]);

  if (loading || isLoading) {
    return <SkeletonLibrary />;
  }

  if (!user) {
    return null;
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
      className="library-content">
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '32px 16px',
        }}>
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#111827',
            }}>
              Saved Books
            </h2>

            {savedBooks.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '48px 16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                  Save your first book to start building your library
                </p>
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
                  Browse Books
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '16px',
              }}>
                {savedBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => router.push(`/book/${book.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img
                        src={book.imageLink}
                        alt={book.title}
                        style={{
                          width: '100%',
                          aspectRatio: '2/3',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          transition: 'box-shadow 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                      />
                      {book.subscriptionRequired && (
                        <span style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: '#fbbf24',
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: '500',
                        }}>
                          Premium
                        </span>
                      )}
                    </div>
                    <p style={{
                      marginTop: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      color: '#111827',
                    }}>
                      {book.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#111827',
            }}>
              Finished
            </h2>

            {finishedBooks.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '48px 16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                <p style={{ color: '#6b7280' }}>
                  Finish your first book to see it here
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '16px',
              }}>
                {finishedBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => router.push(`/book/${book.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img
                        src={book.imageLink}
                        alt={book.title}
                        style={{
                          width: '100%',
                          aspectRatio: '2/3',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          transition: 'box-shadow 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                      />
                      {book.subscriptionRequired && (
                        <span style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: '#fbbf24',
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: '500',
                        }}>
                          Premium
                        </span>
                      )}
                    </div>
                    <p style={{
                      marginTop: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      color: '#111827',
                    }}>
                      {book.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .library-content {
            margin-left: 0 !important;
            padding-top: 60px;
          }
        }
      `}</style>
    </div>
  );
}
