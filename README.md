# React Template

도메인 기반 아키텍처를 적용한 React + TypeScript 프로젝트 템플릿입니다.

## 📚 문서

- **[🏗️ 아키텍처 가이드](./docs/ARCHITECTURE.md)** - 도메인 기반 아키텍처의 개념, 구조, 핵심 원칙 상세 설명

## 🎯 프로젝트 소개

이 템플릿은 확장 가능하고 유지보수하기 쉬운 React 애플리케이션을 위한 견고한 기반을 제공합니다. 도메인 기반 아키텍처를 기반으로 하며, 모던 React 생태계의 best practice를 따릅니다.

### 주요 특징

- ⚡️ **빠른 개발 경험** - Vite 기반의 초고속 HMR과 빌드
- 🏗️ **확장 가능한 아키텍처** - 도메인 기반 구조로 체계적인 코드 구조 유지
- 🔷 **타입 안정성** - TypeScript로 런타임 에러 최소화
- 💅 **강력한 스타일링** - Styled-components와 테마 시스템
- 🔄 **효율적인 상태 관리** - React Query + Zustand 조합

## 🛠️ 기술 스택

### Core

- **React 18** - 최신 React 기능 (Concurrent, Suspense 등)
- **TypeScript 5** - 타입 안전성과 개발자 경험 향상
- **Vite 6** - 빠른 개발 서버와 최적화된 빌드

### 상태 관리

- **React Query** (TanStack Query) - 서버 상태 관리 및 캐싱
- **Zustand** - 간단하고 확장 가능한 클라이언트 상태 관리

### UI & 스타일링

- **Styled-components** - CSS-in-JS, 타입 안전한 스타일링
- **Pretendard Font** - 한글 최적화 웹폰트

### Form & Validation

- **React Hook Form** - 고성능 폼 관리
- **Zod** - 타입 안전한 스키마 검증

### 라우팅

- **React Router v6** - 선언적 라우팅

### 에러 처리

- **React Error Boundary** - 컴포넌트 에러 캐칭 및 처리

### 기타

- **Dayjs** - 가벼운 날짜 라이브러리
- **ESLint & Prettier** - 코드 품질 및 포맷팅

## 📁 프로젝트 구조

```
public/
└── fonts/                  # 웹폰트 파일 (Pretendard)
src/
├── app/                    # 애플리케이션 초기화, 프로바이더, 라우팅
├── pages/                  # 페이지 컴포넌트 (라우트)
├── domains/                # 도메인별 비즈니스 로직 (비어있음 - 새로 추가)
└── shared/                 # 공통 코드
    ├── api/                # API 클라이언트
    ├── config/             # 설정 파일
    ├── hooks/              # 공통 훅
    ├── lib/                # 라이브러리 설정
    ├── types/              # 공통 타입
    ├── ui/                 # UI 컴포넌트
    │   └── atoms/          # 원자적 컴포넌트 (Button 등)
    └── utils/              # 유틸리티 함수
```

**의존성 규칙:**

```
pages → domains → shared
```

자세한 구조 설명은 [아키텍처 가이드](./docs/ARCHITECTURE.md)를 참고하세요.

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 20 이상
- npm, yarn, 또는 pnpm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost 모드)
npm run dev

# 브라우저에서 http://localhost:7248 접속
```

### 주요 스크립트

```bash
# 개발
npm run dev              # localhost 모드
npm run dev:local        # localhost 모드 (별칭)
npm run dev:dev          # development 모드
npm run dev:prod         # production 모드

# 빌드
npm run build            # 프로덕션 빌드
npm run build:local      # localhost 모드 빌드
npm run build:dev        # development 빌드
npm run build:prod       # production 빌드

# 코드 품질
npm run type-check       # TypeScript 타입 체크
npm run lint             # ESLint 검사
npm run lint:fix         # ESLint 자동 수정
npm run format           # Prettier 포맷팅
npm run format:check     # Prettier 검사
npm run check            # 타입 체크 + 린트 + 포맷 체크
npm run check:fix        # 린트 수정 + 포맷팅

# 프리뷰
npm run preview          # 빌드 결과 미리보기
npm run preview:prod     # production 모드로 프리뷰
```

## 🏗️ 첫 번째 기능 만들기

### 1. 도메인 생성

새로운 기능을 추가하려면 먼저 도메인을 생성합니다.

예: `src/domains/example/_common/model/example.schema.ts` 파일 생성

```typescript
export interface Example {
  id: string;
  name: string;
  description?: string;
}
```

### 2. API 생성

`src/domains/example/_common/api/example.api.ts` 파일 생성

```typescript
import { apiClient } from '@/shared/api/client';
import type { Example } from '../model/example.schema';

export const exampleApi = {
  fetchList: (): Promise<Example[]> => {
    return apiClient.get<Example[]>('/examples');
  },
};
```

### 3. React Query 쿼리 생성

`src/domains/example/_common/api/example.queries.ts` 파일 생성

```typescript
import { useQuery } from '@tanstack/react-query';
import { exampleApi } from './example.api';
import type { Example } from '../model/example.schema';

export const exampleQueries = {
  all: () => ['examples'] as const,
  lists: () => [...exampleQueries.all(), 'list'] as const,
  list: () => [...exampleQueries.lists()] as const,
};

export function useExampleList() {
  return useQuery({
    queryKey: exampleQueries.list(),
    queryFn: exampleApi.fetchList,
  });
}
```

### 4. Feature 컴포넌트 생성

`src/domains/example/features/example-list/ui/ExampleList/ExampleList.tsx` 파일 생성

```typescript
import { useExampleList } from '@/domains/example/_common/api/example.queries';

export function ExampleList() {
  const { data: examples, isLoading, error } = useExampleList();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!examples || examples.length === 0) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      {examples.map((example) => (
        <div key={example.id}>
          <h3>{example.name}</h3>
          {example.description && <p>{example.description}</p>}
        </div>
      ))}
    </div>
  );
}
```

### 5. 페이지 생성

`src/pages/examples/ExamplesPage.tsx` 파일 생성

```typescript
import { ExampleList } from '@/domains/example/features/example-list/ui/ExampleList/ExampleList';

export function ExamplesPage() {
  return (
    <div>
      <h1>예제 목록</h1>
      <ExampleList />
    </div>
  );
}
```

### 6. 라우팅 추가

`src/app/routes/index.tsx` 파일에 라우트 추가

```typescript
// ... existing code ...

const ExamplesPage = lazy(() =>
  import('@/pages/examples/ExamplesPage').then((module) => ({ default: module.ExamplesPage }))
);

// ... existing code ...

<Routes>
  <Route path={ROUTES_PATHS.HOME} element={<HomePage />} />
  <Route path="/examples" element={<ExamplesPage />} />
  <Route path={ROUTES_PATHS.NOT_FOUND} element={<NotFoundPage />} />
</Routes>
```

### 7. 라우트 경로 상수 추가

`src/shared/config/routes.ts` 파일에 경로 추가

```typescript
const ROUTES_PATHS = {
  HOME: '/',
  EXAMPLES: '/examples',
  // ... existing code ...
};
```

## 📖 참고 자료

- [React 공식 문서](https://react.dev/)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Styled-components 문서](https://styled-components.com/)
- [아키텍처 가이드](./docs/ARCHITECTURE.md)
