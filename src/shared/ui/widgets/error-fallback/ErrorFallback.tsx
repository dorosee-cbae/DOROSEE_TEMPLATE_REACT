import { ErrorLayout } from '@/shared/ui/layouts/error-layout/ErrorLayout';

export function ErrorFallback() {
  return <ErrorLayout title="오류 발생" description="애플리케이션에서 오류가 발생했습니다." />;
}
