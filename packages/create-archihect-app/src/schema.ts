import { z } from "zod";

export const optionsSchema = z.object({
  default: z.boolean(),
  style: z.enum(["new-york", "default"]),
  color: z.string(),
  darkMode: z.boolean(),
  install: z.boolean(),
  git: z.boolean(),
});
export type Options = z.infer<typeof optionsSchema>;
