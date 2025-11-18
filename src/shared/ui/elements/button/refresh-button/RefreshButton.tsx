import { StyledRefreshButton } from './RefreshButton.styles';
import { TEXTS } from '@/shared/config/texts';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '@/shared/config/routes';

export function RefreshButton() {
  const navigate = useNavigate();

  return (
    <StyledRefreshButton onClick={() => navigate(ROUTES_PATHS.HOME)}>
      {TEXTS.buttons.refresh}
    </StyledRefreshButton>
  );
}
