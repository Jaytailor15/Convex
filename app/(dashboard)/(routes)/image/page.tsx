"use client";

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Image, Loader2 } from 'lucide-react'; // Import Loader2 icon for loading spinner
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { amountOptions, resolutionOption } from './constants'; // Adjust path as needed

// Define the schema for the form
const schema = z.object({
  prompt: z.string().nonempty("Prompt is required"),
  amount: z.string().default("1"),
  resolution: z.string().default("512x512"),
});

type FormValues = z.infer<typeof schema>;

const Page = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // New loading state
  const isLoading = form.formState.isSubmitting || loading; // Updated isLoading state

  const onSubmit = async (values: FormValues) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post('/api/generate-image', {
        prompt: values.prompt,
        amount: values.amount,
        resolution: values.resolution,
      });
      if (response.data.imageUrls) {
        setImageUrls(response.data.imageUrls);
      }
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <Heading
        title="Image Generator"
        description="Generate multiple images from text prompts."
        icon={Image}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Enter your prompt here to generate images..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOption.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="text-center">
              <p className="mb-2">Convex is loading images, please wait...</p>
              <Loader2 className="animate-spin w-6 h-6 mx-auto text-orange-500" /> {/* Loading spinner */}
            </div>
          </div>
        )}
        <div className="space-y-4 mt-4">
          {imageUrls.length > 0 && imageUrls.map((url, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <img src={url} alt={`Generated image ${index + 1}`} className="w-full mb-2" />
              <a href={url} download={`image_${index + 1}.jpg`}>
                <Button>Download Image</Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
