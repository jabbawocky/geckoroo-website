import { defineCollection, z } from 'astro:content';

const picksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Camping', 'Workshop', 'Kitchen', 'Tech', 'Garden', 'Sports']),
    blurb: z.string(),
    price_hint: z.string(),
    aff_url: z.string(),
    image: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()).optional(),
    badges: z.array(z.string()).optional(),
    yt_video_id: z.string().optional(),
    featured: z.boolean().default(false),
    publishDate: z.date().default(() => new Date()),
  })
});

export const collections = {
  'picks': picksCollection,
};