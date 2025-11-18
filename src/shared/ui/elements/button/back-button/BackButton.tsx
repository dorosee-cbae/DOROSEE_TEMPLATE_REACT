import { useNavigate } from 'react-router-dom';
import { StyledBackButton, StyledArrowIcon } from './BackButton.styles';
import { TEXTS } from '@/shared/config/texts';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <StyledBackButton onClick={() => navigate(-1)}>
      <StyledArrowIcon
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </StyledArrowIcon>
      {TEXTS.buttons.back}
    </StyledBackButton>
  );
}
