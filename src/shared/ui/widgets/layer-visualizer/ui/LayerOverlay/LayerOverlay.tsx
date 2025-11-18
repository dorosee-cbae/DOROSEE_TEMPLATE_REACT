import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  StyledOverlayContainer,
  StyledOverlayLabel,
  StyledOverlayBox,
  StyledToggleButton,
} from './LayerOverlay.styles';

interface OverlayElement {
  element: HTMLElement;
  path: string;
  layer: string;
  rect: DOMRect;
}

const LAYER_COLORS: Record<string, string> = {
  app: '#3F51B5', // Material Indigo 500
  pages: '#9C27B0', // Material Purple 500
  'domains/**/_common': '#FF9800', // Material Orange 500
  'domains/**/features': '#03A9F4', // 하늘색
  'shared/ui/elements': '#E91E63', // 분홍색
  'shared/ui/atoms': '#2196F3', // 파란색
  'shared/ui/widgets': '#4CAF50', // 초록색
  'shared/ui/layouts': '#009688', // Material Teal 500
};

export function LayerOverlay() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [overlays, setOverlays] = useState<OverlayElement[]>([]);

  useEffect(() => {
    if (!isEnabled) {
      setOverlays([]);
      return;
    }

    const updateOverlays = () => {
      const elements = document.querySelectorAll('[data-fsd-path]');
      const newOverlays: OverlayElement[] = [];

      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const path = el.getAttribute('data-fsd-path');
          if (path) {
            const pathParts = path.split('/');
            let layer = pathParts[0];

            // 세분화된 레이어로 매핑
            if (layer === 'domains') {
              // domains/**/_common 또는 domains/**/features 구분
              // 경로 형식: domains/post/_common, domains/user/_common → domains/**/_common
              // 경로 형식: domains/post/features, domains/user/features → domains/**/features
              if (pathParts[1] === '_common') {
                layer = 'domains/**/_common';
              } else if (pathParts[1] === 'features') {
                layer = 'domains/**/features';
              } else {
                // domains/post/_common 같은 경우 (pathParts[2]가 '_common')
                if (pathParts.length >= 3 && pathParts[2] === '_common') {
                  layer = 'domains/**/_common';
                } else if (pathParts.length >= 3 && pathParts[2] === 'features') {
                  layer = 'domains/**/features';
                } else {
                  // domains의 다른 구조는 _common으로 처리
                  layer = 'domains/**/_common';
                }
              }
            } else if (layer === 'shared') {
              // shared/ui/elements, shared/ui/atoms, shared/ui/widgets, shared/ui/layouts 형식
              // 경로 형식: shared/ui/atoms/... 또는 shared/ui/elements/... 또는 shared/ui/widgets/... 또는 shared/ui/layouts/...
              if (pathParts.length >= 2 && pathParts[0] === 'shared' && pathParts[1] === 'ui') {
                if (pathParts[2] === 'elements') {
                  layer = 'shared/ui/elements';
                } else if (pathParts[2] === 'atoms') {
                  layer = 'shared/ui/atoms';
                } else if (pathParts[2] === 'widgets') {
                  layer = 'shared/ui/widgets';
                } else if (pathParts[2] === 'layouts') {
                  layer = 'shared/ui/layouts';
                } else {
                  // shared/ui의 다른 구조는 elements로 처리
                  layer = 'shared/ui/elements';
                }
              } else {
                // shared의 다른 부분은 제외
                return;
              }
            }

            if (!layer) {
              return;
            }

            // shared 레이어 처리
            if (layer.startsWith('shared')) {
              // shared/ui/widgets와 shared/ui/layouts는 항상 표시
              if (layer === 'shared/ui/widgets' || layer === 'shared/ui/layouts') {
                // 계속 진행
              } else if (layer === 'shared/ui/elements' || layer === 'shared/ui/atoms') {
                // shared/ui/elements와 shared/ui/atoms는 domains 안에서 호출된 경우 제외
                // 단, counter-example은 예외로 처리
                let parent = el.parentElement;
                while (parent) {
                  const parentPath = parent.getAttribute('data-fsd-path');
                  if (parentPath && parentPath.startsWith('domains/')) {
                    // counter-example은 예외로 처리 (표시)
                    if (parentPath.startsWith('domains/counter-example')) {
                      break; // counter-example 내부에서는 표시
                    }
                    return; // 다른 domains 안에서 호출된 경우 제외
                  }
                  parent = parent.parentElement;
                }
                // domains 안에서 호출되지 않았거나 counter-example인 경우 계속 진행
              } else {
                // 다른 shared 레이어는 제외
                return;
              }
            }

            const rect = el.getBoundingClientRect();
            newOverlays.push({
              element: el,
              path,
              layer,
              rect,
            });
          }
        }
      });

      setOverlays(newOverlays);
    };

    updateOverlays();

    const observer = new MutationObserver(updateOverlays);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-fsd-path'],
    });

    const resizeObserver = new ResizeObserver(updateOverlays);
    document.querySelectorAll('[data-fsd-path]').forEach((el) => {
      resizeObserver.observe(el);
    });

    const handleScroll = () => {
      requestAnimationFrame(updateOverlays);
    };
    const handleResize = () => {
      requestAnimationFrame(updateOverlays);
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isEnabled]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      <StyledToggleButton
        onClick={() => setIsEnabled(!isEnabled)}
        $isActive={isEnabled}
        title="레이어 오버레이 토글"
      >
        {isEnabled ? '🔴' : '⚪'} 레이어
      </StyledToggleButton>
      {isEnabled &&
        createPortal(
          <>
            {overlays.map((overlay, index) => {
              const color = LAYER_COLORS[overlay.layer] || '#666';
              // 화면 상단에 가까우면(30px 이내) 레이블을 안쪽에 표시
              const isNearTop = overlay.rect.top < 30;
              const labelTop = isNearTop ? overlay.rect.top + 4 : overlay.rect.top - 28;

              return (
                <div key={`${overlay.path}-${index}`}>
                  <StyledOverlayLabel
                    $color={color}
                    style={{
                      position: 'fixed',
                      top: `${labelTop}px`,
                      left: `${overlay.rect.left}px`,
                      pointerEvents: 'none',
                      zIndex: 10000,
                    }}
                  >
                    {overlay.path}
                  </StyledOverlayLabel>
                  <StyledOverlayContainer
                    style={{
                      position: 'fixed',
                      top: `${overlay.rect.top}px`,
                      left: `${overlay.rect.left}px`,
                      width: `${overlay.rect.width}px`,
                      height: `${overlay.rect.height}px`,
                      pointerEvents: 'none',
                      zIndex: 9999,
                    }}
                  >
                    <StyledOverlayBox $color={color} />
                  </StyledOverlayContainer>
                </div>
              );
            })}
          </>,
          document.body
        )}
    </>
  );
}
