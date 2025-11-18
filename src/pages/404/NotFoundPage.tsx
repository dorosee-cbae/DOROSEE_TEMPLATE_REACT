import { ErrorLayout } from '@/shared/ui/layouts/error-layout/ErrorLayout';
import { BackButton } from '@/shared/ui/elements/button/back-button/BackButton';

export function NotFoundPage() {
  return (
    <ErrorLayout
      title="404"
      description="페이지를 찾을 수 없습니다"
      actionButton={<BackButton />}
    />
  );
}
