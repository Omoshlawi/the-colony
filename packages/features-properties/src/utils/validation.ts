import z from "zod";

// Property Media
export const PropertyMediaSchema = z.object({
  type: z.enum(["Image", "Video", "Document", "Tour_3D"]),
  url: z.string().min(1, "Required"),
  title: z.string().min(1, "Required").optional(),
  description: z.string().min(1, "Required").optional(),
  order: z.number({ coerce: true }).int().nonnegative().optional(),
  metadata: z.object({
    size: z.number({
      coerce: true,
    }),
    memeType: z.string().min(1, "Required").optional(),
  }),
});

export const PropertySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  thumbnail: z.string().min(1, "Required"),
  attributes: z
    .array(
      z.object({
        attributeId: z
          .string()
          .min(1, "Required")
          .uuid("Invalid attribute type"),
        value: z.string().min(1, "Required"),
      })
    )
    .optional(),
  addressId: z.string().min(1, "Required").uuid("invalid address"),
  media: z.array(PropertyMediaSchema).optional(),
  amenities: z.array(z.string().uuid()).optional(),
  categories: z.array(z.string().uuid()).optional(),
});
