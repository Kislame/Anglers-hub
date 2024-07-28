import * as z from 'zod';

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    { message: 'new password is required!', path: ['newPassword'] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: 'old password is required!',
      path: ['password'],
    }
  );

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'password is required',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'email is required',
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minumum of six characters required',
  }),
});
export const tagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Tag name cannot be empty'),
});

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
export const MAX_MB = 10;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const CatchSchema = z.object({
  description: z
    .string()
    .min(6, { message: 'Minmum of six characters required' }),
  imageUrl: z.string(),

  location: z.string().min(1, 'Location is required').default(''),
  tags: z.array(tagSchema),

  // imageUrl:
  //   typeof window === 'undefined'
  //     ? z.any()
  //     : z
  //         .instanceof(FileList)
  //         .refine((file) => file?.length == 1, 'File is required.'),

  // imageUrl: z
  //   .instanceof(File)
  //   .optional()
  //   .refine(
  //     (file) => !file || file.size !== 0 || file.size <= MAX_UPLOAD_SIZE,
  //     `Max image size is ${MAX_MB}MB`
  //   )
  //   .refine(
  //     (file) =>
  //       !file || file.type === '' || ACCEPTED_IMAGE_TYPES.includes(file.type),
  //     'Only .jpg, .jpeg, and .png formats are supported'
  //   ),

  // location: z.string().min(1, 'Location is required').default(''),
  //tags: z.array(tagSchema).optional(),
});

export const UpdateCatchSchema = z.object({
  catchId: z.string(),
  userId: z.string(),
  description: z
    .string()
    .min(6, { message: 'Minmum of six characters required' }),
  originalDescription: z
    .string()
    .min(6, { message: 'Minimum of six characters required' }),
  imageUrl: z.string(),
  originalImageUrl: z.string(),
});

{
  /* 

   // const fileRef = form.register('imageUrl');
  
  <FormField
                control={form.control}
                name="imageUrl"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...fieldProps}
                        disabled={isPending}
                        {...fileRef}
                        accept="image/*"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */
}
