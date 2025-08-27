import { useState, useEffect, useMemo } from 'react';

interface UsePaginationOptions<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  setItemsPerPage: (items: number) => void;
  resetToFirstPage: () => void;
}

export function usePagination<T>({
  data,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationOptions<T>): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPageState);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPageState;
  }, [currentPage, itemsPerPageState]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPageState, totalItems);
  }, [startIndex, itemsPerPageState, totalItems]);

  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const firstPage = () => {
    goToPage(1);
  };

  const lastPage = () => {
    goToPage(totalPages);
  };

  const setItemsPerPage = (items: number) => {
    setItemsPerPageState(items);
    setCurrentPage(1);
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    canGoNext,
    canGoPrevious,
    startIndex,
    endIndex,
    totalItems,
    setItemsPerPage,
    resetToFirstPage,
  };
}