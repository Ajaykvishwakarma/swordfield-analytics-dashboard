import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  callback: () => void;
  hasMore: boolean;
  loading: boolean;
  rootMargin?: string;
  threshold?: number;
}

export function useInfiniteScroll({
  callback,
  hasMore,
  loading,
  rootMargin = '100px',
  threshold = 0.5,
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            callback();
          }
        },
        { rootMargin, threshold }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, callback, rootMargin, threshold]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return lastElementRef;
}