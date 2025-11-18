import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

export const StyledWelcomeSection = styled.section`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray900};
  }

  p {
    margin: 0 0 0.75rem 0;
    color: ${({ theme }) => theme.colors.gray600};
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
