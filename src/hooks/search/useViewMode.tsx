'use client';

import { useState } from 'react';

const useViewMode = () => {
  const [viewMode, setViewMode] = useState<'default' | 'focused' | 'filter'>(
    'default',
  );

  const setDefault = () => setViewMode('default');
  const setFocused = () => setViewMode('focused');
  const setFilter = () => setViewMode('filter');

  return { viewMode, setDefault, setFocused, setFilter };
};

