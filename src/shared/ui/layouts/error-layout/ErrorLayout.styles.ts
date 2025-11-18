import styled from 'styled-components';

export const StyledErrorLayout = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 2rem;
`;

export const StyledContent = styled.div`
  text-align: center;
  max-width: 600px;
`;

export const StyledTitle = styled.h1`
  font-size: 6rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0 0 1rem 0;
  line-height: 1;
`;

export const StyledDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.gray600};
  margin: 0 0 2rem 0;
  line-height: 1.6;
`;

export const StyledActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;
