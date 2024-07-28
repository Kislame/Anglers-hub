'use client';
import { useState, useTransition, useMemo } from 'react';
import { post } from '@/actions/post';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SingleImageDropzone } from '@/components/editor/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormDescription,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { LatLngLiteral } from 'leaflet';
import { CatchSchema } from '@/schemas';
import dynamic from 'next/dynamic';
import TagsCom from '@/components/tags/tags';
import { Tag } from '@/types/responses';
import { ClipLoader } from 'react-spinners';

type Props = {};

export const EditorForm = (props: Props) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const { edgestore } = useEdgeStore();
  const LocationPicker = useMemo(
    () =>
      dynamic(() => import('@/components/location-picker/LocationPicker'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTranstion] = useTransition();

  const form = useForm<z.infer<typeof CatchSchema>>({
    resolver: zodResolver(CatchSchema),
    defaultValues: {
      description: '',
      imageUrl: '',
      location: '',
      tags: [],
    },
  });

  const onSubmit = (values: z.infer<typeof CatchSchema>) => {
    setError('');
    setSuccess('');
    startTranstion(async () => {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });
        // you can run some server action or api here
        // to add the necessary data to your database

        console.log(res);
        if (res.url) {
          values.imageUrl = res.url;
          values.tags = tags;

          post(values)
            .then((data) => {
              // if (data?.error) {
              //   form.reset();
              //   setError(data?.error);
              // }
              if (data?.success) {
                form.reset();
                setSuccess(data?.success);
              }
            })
            .catch((error) => {
              console.log(error);
              setError('something went wrong');
            });
        }
      }
    });
  };

  const handleLocationChange = (latlng: LatLngLiteral) => {
    form.setValue('location', `${latlng.lat},${latlng.lng}`);
  };
  return (
    <Card className=" max-w-[700px]   w-[80%]">
      <CardHeader>
        <p>Add New Catch</p>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex flex-col items-center">
            <ClipLoader loading={true} />
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
              value={file}
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
                  <div>
                    <FormLabel>Tags</FormLabel>
                    <TagsCom tags={tags} setTags={setTags} />{' '}
                  </div>

                  <div>
                    <FormLabel>Location</FormLabel>
                    <LocationPicker onLocationChange={handleLocationChange} />
                  </div>
                </div>

                <Button disabled={isPending} type="submit">
                  Save
                </Button>
              </form>
            </Form>
          </>
        )}
      </CardContent>
    </Card>
  );
};
