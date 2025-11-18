import { ReactNode } from 'react';
import {
  StyledErrorLayout,
  StyledContent,
  StyledTitle,
  StyledDescription,
  StyledActions,
} from './ErrorLayout.styles';
import { RefreshButton } from '@/shared/ui/elements/button/refresh-button/RefreshButton';

interface ErrorLayoutProps {
  title: string;
  description?: string;
  children?: ReactNode;
  actionButton?: ReactNode;
}

export function ErrorLayout({ title, description, children, actionButton }: ErrorLayoutProps) {
  return (
    <StyledErrorLayout>
      <StyledContent>
        <StyledTitle>{title}</StyledTitle>
        {description && <StyledDescription>{description}</StyledDescription>}
        {children && <div>{children}</div>}
        <StyledActions>{actionButton || <RefreshButton />}</StyledActions>
      </StyledContent>
    </StyledErrorLayout>
  );
}
