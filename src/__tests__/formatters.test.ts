import {
  formatCurrency,
  formatPercentage,
  formatNumber,
  formatDate,
} from '../utils/formatters';

describe('Formatters Utility Functions', () => {
  describe('formatCurrency', () => {
    test('formats small numbers correctly', () => {
      expect(formatCurrency(10.50)).toBe('$10.50');
      expect(formatCurrency(999.99)).toBe('$999.99');
    });

    test('formats thousands correctly', () => {
      expect(formatCurrency(1500)).toBe('$1.50K');
      expect(formatCurrency(999000)).toBe('$999.00K');
    });

    test('formats millions correctly', () => {
      expect(formatCurrency(1500000)).toBe('$1.50M');
      expect(formatCurrency(999000000)).toBe('$999.00M');
    });

    test('formats billions correctly', () => {
      expect(formatCurrency(1500000000)).toBe('$1.50B');
      expect(formatCurrency(999000000000)).toBe('$999.00B');
    });

    test('formats trillions correctly', () => {
      expect(formatCurrency(1500000000000)).toBe('$1.50T');
    });

    test('formats very small numbers correctly', () => {
      expect(formatCurrency(0.000001)).toBe('$0.000001');
      expect(formatCurrency(0.00999)).toBe('$0.009990');
    });

    test('respects decimal parameter', () => {
      expect(formatCurrency(1234.5678, 3)).toBe('$1.235K');
      expect(formatCurrency(1234567, 0)).toBe('$1M');
    });
  });

  describe('formatPercentage', () => {
    test('formats positive percentages correctly', () => {
      expect(formatPercentage(5.25)).toBe('+5.25%');
      expect(formatPercentage(0.5)).toBe('+0.50%');
    });

    test('formats negative percentages correctly', () => {
      expect(formatPercentage(-3.75)).toBe('-3.75%');
      expect(formatPercentage(-0.25)).toBe('-0.25%');
    });

    test('formats zero correctly', () => {
      expect(formatPercentage(0)).toBe('+0.00%');
    });
  });

  describe('formatNumber', () => {
    test('formats numbers with thousand separators', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(1234567.89)).toBe('1,234,567.89');
    });

    test('handles small numbers', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(999)).toBe('999');
    });
  });

  describe('formatDate', () => {
    test('formats date strings correctly', () => {
      const dateString = '2024-01-15T10:30:00Z';
      const formatted = formatDate(dateString);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    test('formats Date objects correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });
  });
});