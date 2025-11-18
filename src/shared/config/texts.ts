/**
 * UI 텍스트 상수
 *
 * 애플리케이션 전역에서 사용되는 UI 텍스트들을 중앙에서 관리합니다.
 * 다국어 지원을 위한 기반이 될 수 있습니다.
 */

export const TEXTS = {
  labels: {
    email: '이메일',
    password: '비밀번호',
    message: '메시지',
  },
  placeholders: {
    email: 'example@email.com',
    password: '비밀번호를 입력하세요',
    message: '메시지를 입력하세요',
  },
  buttons: {
    retry: '다시 시도',
    refresh: '새로고침',
    home: '홈',
    back: '뒤로 가기',
  },
  ui: {
    defaultError: '오류가 발생했습니다.',
  },
  errors: {
    idRequired: 'id is required',
    noAccessToken: 'No access token available',
    unauthorizedRefreshToken: 'Unauthorized refresh token',
    loginFailed: 'Login failed',
    accountNotFound: 'Account is not found',
  },
} as const;
