'use client';

import { useEffect, useState } from 'react';

const DrinkDetailNavigator = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'review'>('info');
  const [ignoreScroll, setIgnoreScroll] = useState(false);

  const NAV_HEIGHT = 80;

  const handleTabClick = (targetId: 'info' | 'review') => {
    setActiveTab(targetId);

    setIgnoreScroll(true);

    const el = document.getElementById(targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      const offset = window.scrollY + rect.top - NAV_HEIGHT;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    setTimeout(() => {
      setIgnoreScroll(false);
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (ignoreScroll) return;

      const reviewEl = document.getElementById('review');
      if (!reviewEl) return;
      const reviewTop = reviewEl.offsetTop;

      const scrollPos = window.scrollY;
      if (scrollPos + NAV_HEIGHT >= reviewTop) {
        setActiveTab('review');
      } else {
        setActiveTab('info');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ignoreScroll]);

  return (
    <nav className="border-b border-grayscale-200 bg-etc-white px-6">
      <ul className="x-[534px] mx-auto flex justify-center">
        <li>
          <button
            className={`w-[243px] px-4 pb-3 pt-2 text-label-lm ${
              activeTab === 'info'
                ? 'border-b border-primary text-primary'
                : 'border-b border-transparent text-grayscale-400'
            }`}
            onClick={() => handleTabClick('info')}
          >
            정보
          </button>
        </li>
        <li>
          <button
            className={`w-[243px] px-4 pb-3 pt-2 text-label-lm ${
              activeTab === 'review'
                ? 'border-b border-primary text-primary'
                : 'border-b border-transparent text-grayscale-400'
            }`}
            onClick={() => handleTabClick('review')}
          >
            리뷰
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DrinkDetailNavigator;
