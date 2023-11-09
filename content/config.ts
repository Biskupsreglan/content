import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

// @ts-ignore
const faerlurSchema = ({ image }) =>
  z.object({
    title: z.string(),
    id: z.string().optional(),
    description: z.string(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    authors: z.array(z.string()).default(["matthias"]),
    frettadir: z.array(z.string()).optional(),
    date: z.date(),
    lastmod: z.date().optional(),
    efnisord: z.array(z.string()).default(["annað"]),
    stig: z.number().default(1),
    frettadir_stig: z.number().optional(),
    ogImage: image() // @ts-ignore
      .refine(img => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph þarf að vera í það minnsta 1200 X 630 pixlar!",
      })
      .or(z.string())
      .optional(),
    canonicalURL: z.string().optional(),
  });

// @ts-ignore
const folkSchema = ({ image }) =>
  z.object({
    name: z.string(),
    id: z.string().optional(),
    description: z.string(),
    occupation: z.string(),
    company: z.string().default("Biskupsreglan"),
    hlutverk: z
      .array(
        z.object({
          title: z.string(),
          desc: z.string(),
        })
      )
      .optional()
      .default([]),
    draft: z.boolean().optional().default(false),
    date: z.date(),
    retired: z.date().optional(),
    verkamadur: z.boolean().optional().default(false),
    stofnandi: z.boolean().optional().default(false),
    radunautur: z.boolean().optional().default(false),
    framkvaemdarteymi: z.boolean().optional().default(false),
    email: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    github: z.string().optional(),
    facebook: z.string().optional(),
    mastodon: z.string().optional(),
    retired_stig: z.number().optional().default(0),
    sida_stig: z.number().optional().default(0),
    stig: z.number().optional().default(0),
    ogImage: image() // @ts-ignore
      .refine(img => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph þarf að vera í það minnsta 1200 X 630 pixlar!",
      })
      .or(z.string())
      .optional(),
  });

const frettir = defineCollection({
  type: "content",
  schema: faerlurSchema,
});

const verkefni = defineCollection({
  type: "content",
  schema: faerlurSchema,
});

const medlimir = defineCollection({
  type: "content",
  schema: folkSchema,
});

const starfsfolk = defineCollection({
  type: "content",
  schema: folkSchema,
});

export const collections = { frettir, verkefni, medlimir, starfsfolk };
