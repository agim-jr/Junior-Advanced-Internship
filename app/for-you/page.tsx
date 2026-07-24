'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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

export default function ForYouPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);

        const selectedRes = await fetch(
          'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected'
        );
        const selectedData = await selectedRes.json();
        setSelectedBook(selectedData[0]);

        const recommendedRes = await fetch(
          'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended'
        );
        const recommendedData = await recommendedRes.json();
        setRecommendedBooks(recommendedData);

        const suggestedRes = await fetch(
          'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested'
        );
        const suggestedData = await suggestedRes.json();
        setSuggestedBooks(suggestedData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchBooks();
    }
  }, [user]);

  if (loading || isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
      }}>
        <div style={{ fontSize: '1.25rem' }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
    }}>
      {/* Main content wrapper with proper offset for sidebar */}
      <div style={{
        marginLeft: '256px', // Desktop sidebar width
        transition: 'margin-left 0.3s ease',
      }}
      className="for-you-content">
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '32px 16px',
        }}>
          {/* Selected Book Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#111827',
            }}>
              Selected just for you
            </h2>
            {selectedBook && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '24px',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  flexDirection: 'row',
                }}
                className="selected-book-card">
                  <img
                    src={selectedBook.imageLink}
                    alt={selectedBook.title}
                    style={{
                      width: '192px',
                      height: '288px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#111827',
                    }}>
                      {selectedBook.title}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      marginBottom: '8px',
                    }}>
                      {selectedBook.author}
                    </p>
                    <p style={{
                      color: '#374151',
                      marginBottom: '16px',
                      lineHeight: '1.5',
                    }}>
                      {selectedBook.subTitle}
                    </p>
                    <button
                      onClick={() => router.push(`/book/${selectedBook.id}`)}
                      style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        padding: '8px 24px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Recommended Books Section */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#111827',
            }}>
              Recommended For You
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px',
            }}>
              {recommendedBooks.map((book) => (
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
          </section>

          {/* Suggested Books Section */}
          <section>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#111827',
            }}>
              Suggested Books
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px',
            }}>
              {suggestedBooks.map((book) => (
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
          </section>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .for-you-content {
            margin-left: 0 !important;
            padding-top: 60px;
          }
          .selected-book-card {
            flex-direction: column !important;
            align-items: center !important;
          }
          .selected-book-card img {
            width: 100% !important;
            max-width: 300px !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
