'use client';
import { useEffect, useState, useTransition, useMemo } from 'react';
// Make sure to create and import this function
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SingleImageDropzone } from '@/components/editor/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { deletePost } from '@/actions/deletePost';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { UpdateCatchSchema } from '@/schemas';
import TagsCom from '@/components/tags/tags';
import { Tag, CatchResponse } from '@/types/responses';
import { updatePost } from '@/actions/updatePost';

type Props = {
  postData: CatchResponse;
};

export const UpdateForm = ({ postData }: Props) => {
  const memoTags = useMemo(() => {
    return postData.tags.map((tag, i) => ({ name: `${tag}` }));
  }, [postData.tags]);

  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const { edgestore } = useEdgeStore();

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateCatchSchema>>({
    resolver: zodResolver(UpdateCatchSchema),
    defaultValues: {
      catchId: postData.id,
      userId: postData.userId,
      description: postData.description,
      originalDescription: postData.description,
      imageUrl: postData.imageUrl,
      originalImageUrl: postData.imageUrl,
    },
  });

  // Fetch the existing data for the catch post and set the form values

  // Create and import this function

  const onSubmit = (values: z.infer<typeof UpdateCatchSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: postData.imageUrl,
          },
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });

        if (res.url) {
          values.imageUrl = res.url;
        }
      }

      updatePost(values)
        .then((data) => {
          if (data?.success) {
            setSuccess(data?.success);
          } else if (data?.error) {
            setError(data?.error);
          }
        })
        .catch((error) => {
          console.log(error);
          setError('Something went wrong');
        });
    });
  };

  const onDelete = async () => {
    try {
      const res = await deletePost(postData.id);
      if (res?.success) {
        setSuccess(res.success);
      } else if (res?.error) {
        setError(res.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Something went wrong');
    }
  };

  return (
    <Card className=" max-w-[700px] sm:w-[360px] w-[340px]">
      <CardHeader>
        <p>Edit Catch</p>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex flex-col items-center">
            {progress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            <p>Submitting...</p>
          </div>
        ) : success ? (
          <FormSuccess message={success} />
        ) : error ? (
          <FormError message={error} />
        ) : (
          <>
            <SingleImageDropzone
              width={200}
              height={200}
              value={file || postData.imageUrl}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="description"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between items-center flex-wrap">
                  <Button disabled={isPending} type="submit">
                    Save
                  </Button>
                  <Button
                    variant={'destructive'}
                    onClick={onDelete}
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </CardContent>
    </Card>
  );
};
