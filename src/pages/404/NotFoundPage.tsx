import {
  StyledContainer,
  StyledContent,
  StyledTitle,
  StyledDescription,
} from './NotFoundPage.styles';

export function NotFoundPage() {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledTitle>404</StyledTitle>
        <StyledDescription>페이지를 찾을 수 없습니다</StyledDescription>
      </StyledContent>
    </StyledContainer>
  );
}
