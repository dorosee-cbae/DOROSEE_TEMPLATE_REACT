import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES_PATHS } from '@/shared/config/routes';

// Lazy load pages for code splitting
const HomePage = lazy(() =>
  import('@/pages/home/HomePage').then((module) => ({ default: module.HomePage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/404/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);

/**
 * App Router
 * app 레이어의 라우팅 설정
 */
export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div>로딩 중...</div>
        </div>
      }
    >
      <Routes>
        {/* Home */}
        <Route path={ROUTES_PATHS.HOME} element={<HomePage />} />

        {/* 404 */}
        <Route path={ROUTES_PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
