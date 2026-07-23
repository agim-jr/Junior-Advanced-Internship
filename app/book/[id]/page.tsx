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

  // Fetch book by ID
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading book...</div>
      </div>
    );
  }

  if (error || !book) {
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
      <div className="max-w-6xl mx-auto px-4 py-8">

        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back
        </button>


        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">

            <div className="shrink-0">
              <img
                src={book.imageLink}
                alt={book.title}
                className="w-64 h-96 object-cover rounded-lg shadow-lg"
              />
            </div>


            <div className="flex-1">
              <div className="mb-4">
                {book.subscriptionRequired && (
                  <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    Premium
                  </span>
                )}
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-2">{book.subTitle}</p>
                <p className="text-lg text-gray-700">By {book.author}</p>
              </div>

              <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★</span>
                  <span>
                    {book.averageRating} ({book.totalRating} reviews)
                  </span>
                </div>
                <div>⏱️ {book.keyIdeas} Key Ideas</div>
                <div>📚 {book.type}</div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleReadOrListen('read')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                   Read
                </button>
                <button
                  onClick={() => handleReadOrListen('listen')}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold"
                >
                   Listen
                </button>
                <button
                  onClick={handleAddToLibrary}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                >
                  + Add to Library
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Book</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {book.bookDescription}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Author</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {book.authorDescription}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line line-clamp-6">
            {book.summary}
          </p>
          <button
            onClick={() => handleReadOrListen('read')}
            className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
          >
            Read full summary →
          </button>
        </div>
      </div>
    </div>
  );
}
