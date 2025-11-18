import { ReactNode } from 'react';
import {
  StyledPageLayout,
  StyledHeader,
  StyledTitle,
  StyledDescription,
  StyledContent,
} from './PageLayout.styles';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: Readonly<PageLayoutProps>) {
  return (
    <StyledPageLayout>
      <StyledHeader>
        <StyledTitle>React Template</StyledTitle>
        <StyledDescription>도메인 기반 아키텍처를 적용한 React 프로젝트 템플릿</StyledDescription>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </StyledPageLayout>
  );
}
