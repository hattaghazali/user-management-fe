import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import '@/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <h1>Test</h1>
    </StrictMode>
);
