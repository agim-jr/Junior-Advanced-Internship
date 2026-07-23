'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
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

        // Fetch suggested books
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Selected just for you</h2>
          {selectedBook && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex gap-6">
                <img
                  src={selectedBook.imageLink}
                  alt={selectedBook.title}
                  className="w-48 h-72 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedBook.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{selectedBook.author}</p>
                  <p className="text-gray-700 mb-4">{selectedBook.subTitle}</p>
                  <button
                    onClick={() => router.push(`/book/${selectedBook.id}`)}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>


        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recommendedBooks.map((book) => (
              <div
                key={book.id}
                className="cursor-pointer"
                onClick={() => router.push(`/book/${book.id}`)}
              >
                <div className="relative">
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="w-full rounded shadow hover:shadow-lg transition"
                  />
                  {book.subscriptionRequired && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                      Premium
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold line-clamp-2">
                  {book.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Suggested Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {suggestedBooks.map((book) => (
              <div
                key={book.id}
                className="cursor-pointer"
                onClick={() => router.push(`/book/${book.id}`)}
              >
                <div className="relative">
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="w-full rounded shadow hover:shadow-lg transition"
                  />
                  {book.subscriptionRequired && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                      Premium
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold line-clamp-2">
                  {book.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
