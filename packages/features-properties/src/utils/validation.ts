import z from "zod";

// Property Media
export const PropertyMediaSchema = z.object({
  propertyId: z.string().uuid(),
  type: z.enum(["Image", "Video", "Document", "Tour_3D"]),
  url: z.string().min(1, "Required"),
  title: z.string().min(1, "Required").optional(),
  description: z.string().min(1, "Required").optional(),
  order: z.number({ coerce: true }).int().nonnegative(),
  metadata: z.object({
    size: z.number({
      coerce: true,
    }),
    memeType: z.string().min(1, "Required").optional(),
  }),
});

export const PropertySchema = z.object({
  name: z.string(),
  thumbnail: z.string(),
  attributes: z
    .array(
      z.object({
        attributeId: z.string().uuid(),
        value: z.string().min(1, "Required"),
      })
    )
    .optional(),
  addressId: z.string().uuid("invalid address"),
  media: z.array(PropertyMediaSchema.omit({ propertyId: true })).optional(),
  amenities: z.array(z.string().uuid()).optional(),
  categories: z.array(z.string().uuid()).optional(),
});
