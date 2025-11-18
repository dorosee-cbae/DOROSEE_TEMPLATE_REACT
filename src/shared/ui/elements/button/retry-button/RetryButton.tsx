import { StyledRetryButton } from './RetryButton.styles';
import { TEXTS } from '@/shared/config/texts';

interface RetryButtonProps {
  onRetry: () => void;
}

export function RetryButton({ onRetry }: RetryButtonProps) {
  return <StyledRetryButton onClick={onRetry}>{TEXTS.buttons.retry}</StyledRetryButton>;
}
