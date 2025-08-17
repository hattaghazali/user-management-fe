import { DateRange } from 'react-day-picker';

/**
 * Formats a date range for display in the format "1/Aug/25 - 5/Aug/25"
 * @param dateRange - The date range object with from and to dates
 * @returns Formatted date range string or fallback message
 */

export const formatDateRange = (dateRange?: DateRange): string => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
        return 'No date range selected';
    }

    const formatDate = (date: Date): string => {
        const day = date.getDate(); // No leading zero
        const month = date.toLocaleDateString('en-UK', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2); // Last 2 digits
        return `${day}/${month}/${year}`;
    };

    const fromDate = formatDate(dateRange.from);
    const toDate = formatDate(dateRange.to);

    return `${fromDate} - ${toDate}`;
};

/**
 * Formats a date to YYYY-MM-DD format for API queries
 * @param date - The date to format
 * @returns Formatted date string in YYYY-MM-DD format
 */
export const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
