import { StyledRefreshButton } from './RefreshButton.styles';
import { TEXTS } from '@/shared/config/texts';

export function RefreshButton() {
  return (
    <StyledRefreshButton onClick={() => window.location.reload()}>
      {TEXTS.buttons.refresh}
    </StyledRefreshButton>
  );
}
