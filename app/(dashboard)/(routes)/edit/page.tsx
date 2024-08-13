"use client";

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Edit, Loader2 } from 'lucide-react'; // Import Edit icon
import { useEffect, useState } from 'react';

const EditPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the generated image from the API or storage
    const fetchImage = async () => {
      try {
        const response = await axios.get('/api/get-latest-image'); // Adjust the endpoint as needed
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="mb-2">Loading the image, please wait...</p>
          <Loader2 className="animate-spin w-6 h-6 mx-auto text-orange-500" /> {/* Loading spinner */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading
        title="Edit Image"
        description="Edit your generated image below."
        icon={Edit} // Use Edit icon for editing
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
      />
      <div className="px-4 lg:px-8">
        {imageUrl ? (
          <div className="text-center">
            <img src={imageUrl} alt="Generated Image" className="w-full max-w-lg mx-auto border p-4 rounded-lg shadow-md" />
            <div className="mt-4">
              <Button className="w-full" onClick={() => {/* Handle edit action */}}>
                Edit Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>No image available for editing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPage;
