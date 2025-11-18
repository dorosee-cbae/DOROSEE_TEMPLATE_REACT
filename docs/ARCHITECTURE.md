# 아키텍처 가이드

이 템플릿은 도메인 기반 아키텍처를 따릅니다.

## 아키텍처 개요

도메인 기반 아키텍처는 비즈니스 도메인을 중심으로 코드를 조직화하는 방법입니다.

## 프로젝트 구조

```
src/
├── app/                              # 애플리케이션 초기화
│   ├── App.tsx                       # 루트 컴포넌트
│   ├── providers/                    # 전역 프로바이더
│   │   ├── QueryProvider.tsx         # React Query 프로바이더
│   │   ├── RouterProvider.tsx        # React Router 프로바이더
│   │   └── ThemeProvider.tsx        # 테마 프로바이더
│   ├── routes/                       # 라우팅 설정
│   │   └── index.tsx                 # 라우트 정의
│   └── styles/                       # 전역 스타일
│       ├── index.css                 # 전역 CSS
│       └── theme.ts                  # 테마 설정
├── pages/                            # 페이지 컴포넌트
│   ├── 404/                          # 404 에러 페이지
│   │   ├── NotFoundPage.styles.ts
│   │   └── NotFoundPage.tsx
│   ├── home/                         # 홈 페이지
│   │   ├── HomePage.styles.ts
│   │   └── HomePage.tsx
├── domains/                          # 도메인별 비즈니스 로직 (비어있음 - 새로 추가)
├── shared/                           # 공통 코드
│   ├── api/                          # API 클라이언트
│   │   └── client.ts                 # Axios/Fetch 클라이언트 설정
│   ├── config/                       # 설정
│   │   ├── api.ts                    # API 엔드포인트 설정
│   │   ├── const.ts                  # 상수 정의
│   │   ├── routes.ts                 # 라우트 경로 상수
│   │   └── texts.ts                  # 텍스트 상수
│   ├── hooks/                        # 공통 커스텀 훅
│   │   ├── useKeydown.ts             # 키보드 이벤트 훅
│   │   └── useToggle.ts              # 토글 상태 훅
│   ├── lib/                          # 외부 라이브러리 설정
│   │   └── react-query/              # React Query 설정
│   │       ├── config/
│   │       │   └── queryClient.ts    # QueryClient 설정
│   │       └── utils/
│   │           └── hooks.ts           # React Query 유틸리티 훅
│   ├── types/                        # 공통 타입 정의
│   │   └── common.type.ts            # 공통 타입
│   ├── ui/                           # UI 컴포넌트
│   │   ├── atoms/                    # 원자적 컴포넌트
│   │   │   └── button/
│   │   │       ├── Button.styles.ts
│   │   │       └── Button.tsx
│   └── utils/                        # 유틸리티
│       ├── common.util.ts            # 공통 유틸리티 함수
│       └── date.util.ts              # 날짜 유틸리티 함수
├── main.tsx                          # 애플리케이션 진입점
├── styled.d.ts                       # Styled Components 타입 정의
└── vite-env.d.ts                     # Vite 환경 타입 정의
```

## 도메인 구조

각 도메인은 `_common`과 `features`로 구분됩니다.

### \_common (공통 코드)

도메인 내에서 공통으로 사용되는 코드입니다.

- **api/**: API 호출 함수
- **model/**: 데이터 모델 및 스키마 (schema, store만 포함)
- **ui/**: 공통 UI 컴포넌트
- **utils/**: 도메인별 유틸리티

```typescript
// domains/post/_common/api/posts.api.ts
export const postApi = {
  fetchPostList: (): Promise<Post[]> => {
    return apiClient.get<Post[]>('/posts');
  },
};

// domains/post/_common/model/posts.schema.ts
export interface Post {
  id: string;
  title: string;
  content: string;
}

// domains/post/_common/ui/PostCard/PostCard.tsx
export function PostCard({ post }: { post: Post }) {
  return <div>{post.title}</div>;
}
```

### features (기능별 컴포넌트)

특정 기능을 구현하는 컴포넌트입니다.

- **hooks/**: 기능별 비즈니스 로직 훅 (모든 데이터 fetching 및 로직은 hooks로 분리)
- **ui/**: 기능별 UI 컴포넌트 (순수 렌더링만 담당)

**중요**: 모든 데이터 fetching과 비즈니스 로직은 hooks로 분리합니다. UI 컴포넌트는 hooks를 통해 데이터를 받아 렌더링만 담당합니다. 이는 패턴 통일을 위한 규칙입니다.

```typescript
// ✅ Query 호출도 hooks로 분리 (패턴 통일)
// domains/post/features/post-list/hooks/usePostList.ts
export function usePostList() {
  const { data: postList, isLoading, error } = useFetchPostListQuery();
  return { postList, isLoading, error };
}

// domains/post/features/post-list/ui/PostList/PostList.tsx
export function PostList() {
  const { postList } = usePostList(); // hooks를 통해 데이터 받기

  return (
    <Grid>
      {postList?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>
  );
}

// ✅ Mutation 로직도 hooks로 분리
// domains/post/features/create-post/hooks/useCreatePost.ts
export function useCreatePost() {
  const { mutateAsync: createPost, isPending } = useCreatePostMutation();
  const navigate = useNavigate();

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { userId: 1 },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    await createPost(data);
    navigate(ROUTES_PATHS.POSTS.LIST);
  };

  return { form, onSubmit, isPending };
}

// domains/post/features/create-post/ui/CreatePostForm/CreatePostForm.tsx
export function CreatePostForm() {
  const { form, onSubmit, isPending } = useCreatePost();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 폼 필드들 */}
    </form>
  );
}

// ✅ 삭제 로직도 hooks로 분리 (재사용 가능한 feature로 분리)
// domains/post/features/delete-post/hooks/useDeletePost.ts
export function useDeletePost() {
  const { mutateAsync: deletePost, isPending } = useDeletePostMutation();

  const handleDelete = async (postId: string | number) => {
    await deletePost(String(postId));
  };

  return { handleDelete, isPending };
}

// domains/post/features/delete-post/ui/DeletePostButton/DeletePostButton.tsx
export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const { handleDelete, isPending } = useDeletePost();

  return (
    <Button onClick={() => handleDelete(postId)} disabled={isPending}>
      삭제
    </Button>
  );
}

// ✅ post-list에서 delete-post feature 재사용
// domains/post/features/post-list/ui/PostList/PostList.tsx
export function PostList() {
  const { postList } = usePostList();

  return (
    <Grid>
      {postList?.map((post) => (
        <PostCard key={post.id} post={post}>
          {post.id && <DeletePostButton postId={post.id} />}
        </PostCard>
      ))}
    </Grid>
  );
}
```

## Shared UI 구조

현재 템플릿에는 기본적인 Button 컴포넌트만 포함되어 있습니다. 프로젝트에 필요한 UI 컴포넌트를 추가하여 사용할 수 있습니다.

### atoms (원자적 컴포넌트)

가장 작은 단위의 UI 컴포넌트입니다.

- **Button**: 기본 버튼 컴포넌트

```typescript
// shared/ui/atoms/button/Button.tsx
export function Button({ children, onClick, variant, size }: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
```

## 의존성 규칙

1. **pages**는 **domains**와 **shared**에 의존할 수 있습니다
2. **domains**는 **shared**에만 의존할 수 있습니다
3. **domains** 간에는 서로 의존할 수 없습니다
4. **shared**는 다른 레이어에 의존할 수 없습니다

```
✅ pages → domains → shared
❌ domains → pages (불가능)
❌ domains → domains (불가능)
❌ shared → domains (불가능)
```

## 도메인 기반 아키텍처의 장점

1. **도메인 중심**: 비즈니스 로직이 도메인별로 명확하게 분리
2. **확장성**: 새로운 도메인을 추가할 때 기존 코드에 영향 최소화
3. **유지보수성**: 도메인별로 독립적으로 유지보수 가능
4. **재사용성**: `_common`의 코드를 여러 features에서 재사용
5. **테스트 용이성**: 도메인별로 독립적으로 테스트 가능
