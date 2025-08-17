import * as React from 'react';
import { type DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';

export default function Calendar05() {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(2025, 5, 12),
        to: new Date(2025, 6, 15)
    });

    // // Log the selected values whenever dateRange changes
    // React.useEffect(() => {
    //     if (dateRange?.from && dateRange?.to) {
    //         console.log('From:', dateRange.from);
    //         console.log('To:', dateRange.to);
    //     }
    // }, [dateRange]);

    return (
        <>
            <Calendar
                mode='range'
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className='rounded-lg border shadow-sm'
            />
            <div>
                <p>
                    From:{' '}
                    {dateRange?.from?.toLocaleDateString() || 'Not selected'}
                </p>
                <p>
                    To: {dateRange?.to?.toLocaleDateString() || 'Not selected'}
                </p>
            </div>
        </>
    );
}
