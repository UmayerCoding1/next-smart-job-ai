import z from "zod";

export const seacrhSchema = z.object({
  title: z.string(),
  location: z.string(),
  jobType: z.string(),
});

export type seacrhSchemaTyoe = z.infer<typeof seacrhSchema>;
