import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from './providers/RouterProvider';
import { NotFoundPage } from '@/pages/404/NotFoundPage';
import { LayerOverlay } from '@/shared/ui/widgets/layer-visualizer/ui/LayerOverlay/LayerOverlay';
import { ErrorFallback } from '@/shared/ui/widgets/error-fallback/ErrorFallback';

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorBoundary FallbackComponent={NotFoundPage}>
        <RouterProvider />
        <LayerOverlay />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
