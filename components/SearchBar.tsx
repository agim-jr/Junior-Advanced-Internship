'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  subscriptionRequired: boolean;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredClear, setHoveredClear] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        setSearchResults(data || []);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  const handleBookClick = (bookId: string) => {
    setSearchQuery('');
    setShowResults(false);
    router.push(`/book/${bookId}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div
      ref={searchRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '768px',
        margin: '0 auto',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            pointerEvents: 'none',
          }}
        >
          <FiSearch size={20} />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books or authors..."
          style={{
            width: '100%',
            paddingLeft: '48px',
            paddingRight: '48px',
            paddingTop: '12px',
            paddingBottom: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            outline: 'none',
            backgroundColor: 'white',
            fontSize: '1rem',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />

        {searchQuery && (
          <button
            onClick={clearSearch}
            onMouseEnter={() => setHoveredClear(true)}
            onMouseLeave={() => setHoveredClear(false)}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: hoveredClear ? '#4b5563' : '#9ca3af',
              transition: 'color 0.2s',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FiX size={20} />
          </button>
        )}
      </div>

      {showResults && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            maxHeight: '384px',
            overflowY: 'auto',
            zIndex: 50,
          }}
        >
          {isLoading ? (
            <div
              style={{
                padding: '32px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid #e5e7eb',
                  borderTopColor: '#2563eb',
                  borderRadius: '50%',
                  margin: '0 auto 8px',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p style={{ color: '#6b7280' }}>Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div style={{ padding: '8px 0' }}>
              {searchResults.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleBookClick(book.id)}
                  onMouseEnter={() => setHoveredButton(book.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    backgroundColor: hoveredButton === book.id ? '#f9fafb' : 'transparent',
                    transition: 'background-color 0.2s',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    style={{
                      width: '48px',
                      height: '64px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontWeight: '600',
                        color: '#111827',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: '4px',
                      }}
                    >
                      {book.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#4b5563',
                      }}
                    >
                      {book.author}
                    </p>
                  </div>

                  {book.subscriptionRequired && (
                    <span
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        borderRadius: '4px',
                      }}
                    >
                      Premium
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '32px',
                textAlign: 'center',
                color: '#6b7280',
              }}
            >
              No books found for "
              <span style={{ fontWeight: '600' }}>{searchQuery}</span>"
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
