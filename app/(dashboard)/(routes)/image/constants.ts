// app/(dashboard)/(routes)/image/constants.ts

import { z } from "zod";

export const amountOptions = [
    { value: '1', label: '1 Image' },
    { value: '2', label: '2 Images' },
    { value: '3', label: '3 Images' },
    // Add more options as needed
  ];
  
  export const resolutionOption = [
    { value: '512x512', label: '512x512' },
    { value: '1024x1024', label: '1024x1024' },
    // Add more options as needed
  ];
  
  export const fromSchema = z.object({
    prompt: z.string().nonempty("Prompt is required"),
    amount: z.string().default("1"),
    resolution: z.string().default("512x512"),
  });
  