import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePostMutation } from '@/domains/post/_common/api/posts.queries';
import { ROUTES_PATHS } from '@/shared/config/routes';
import { TEXTS } from '@/shared/config/texts';
import { useNavigate } from 'react-router-dom';

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, TEXTS.formValidation.titleRequired)
    .max(100, TEXTS.formValidation.titleMaxLength(100)),
  body: z
    .string()
    .min(1, TEXTS.formValidation.bodyRequired)
    .max(1000, TEXTS.formValidation.bodyMaxLength(1000)),
  userId: z.number().min(1, TEXTS.formValidation.userIdMin),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export function useCreatePost() {
  const { mutateAsync: createPost, isPending } = useCreatePostMutation();
  const navigate = useNavigate();

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      userId: 1,
    },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    await createPost(data);
    navigate(ROUTES_PATHS.POSTS.LIST);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
