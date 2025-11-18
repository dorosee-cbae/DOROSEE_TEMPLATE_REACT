import { PageLayout } from '@/shared/ui/layouts/page-layout/PageLayout';
import { StyledContainer, StyledWelcomeSection } from './HomePage.styles';

export function HomePage() {
  return (
    <PageLayout>
      <StyledContainer>
        <StyledWelcomeSection>
          <h2>시작하기</h2>
          <p>이 템플릿은 바로 사용할 수 있는 깨끗한 상태입니다.</p>
          <p>프로젝트 구조와 아키텍처 가이드를 참고하여 개발을 시작하세요.</p>
        </StyledWelcomeSection>
      </StyledContainer>
    </PageLayout>
  );
}
