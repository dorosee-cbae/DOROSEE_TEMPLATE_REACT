import { Button } from '@/shared/ui/atoms/button/Button';
import { FormGroup } from '@/shared/ui/elements/form-group/FormGroup';
import { Input } from '@/shared/ui/atoms/input/Input';
import { Label } from '@/shared/ui/atoms/label/Label';
import { Textarea } from '@/shared/ui/atoms/textarea/Textarea';
import { ErrorMessage } from '@/shared/ui/elements/error-message/ErrorMessage';
import { StyledForm } from './CreatePostForm.styles';
import { TEXTS } from '@/shared/config/texts';
import { useCreatePost } from '@/domains/post/features/create-post/hooks/useCreatePost';

export function CreatePostForm() {
  const { form, onSubmit, isPending } = useCreatePost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} data-fsd-path="domains/post/features/create-post">
      <FormGroup>
        <Label htmlFor="title">{TEXTS.labels.title}</Label>
        <Input
          id="title"
          type="text"
          placeholder={TEXTS.placeholders.postTitle}
          {...register('title')}
          hasError={!!errors.title}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="body">{TEXTS.labels.body}</Label>
        <Textarea
          id="body"
          placeholder={TEXTS.placeholders.postBody}
          rows={10}
          {...register('body')}
          hasError={!!errors.body}
        />
        {errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="userId">{TEXTS.labels.userId}</Label>
        <Input
          id="userId"
          type="number"
          placeholder={TEXTS.placeholders.userId}
          {...register('userId', { valueAsNumber: true })}
          hasError={!!errors.userId}
        />
        {errors.userId && <ErrorMessage>{errors.userId.message}</ErrorMessage>}
      </FormGroup>

      <Button
        type="submit"
        disabled={isPending}
        data-fsd-path="domains/post/features/create-post/SubmitButton"
      >
        {isPending ? TEXTS.buttons.createLoading : TEXTS.buttons.create}
      </Button>
    </StyledForm>
  );
}
