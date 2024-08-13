import { NextRequest, NextResponse } from 'next/server';

const API_URL = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";
const headers = {
  Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  "Content-Type": "application/json",
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, amount, resolution } = await req.json();

    if (!prompt || !amount) {
      return NextResponse.json({ error: 'Prompt and amount are required' }, { status: 400 });
    }

    const imageUrls: string[] = [];
    const amountNumber = parseInt(amount, 10);

    // Generate the number of images specified by the user
    for (let i = 0; i < amountNumber; i++) {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ inputs: prompt, resolution }), // Ensure resolution is passed if required
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch image, status code: ${response.status}, message: ${errorMessage}`);
      }

      const imageBytes = await response.arrayBuffer();
      const base64Image = Buffer.from(imageBytes).toString('base64');
      const imageUrl = `data:image/png;base64,${base64Image}`;

      imageUrls.push(imageUrl);
    }

    return NextResponse.json({ imageUrls });
  } catch (error) {
    console.error('Error generating images:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
