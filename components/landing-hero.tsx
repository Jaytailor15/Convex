"use client";
import { useAuth } from "@clerk/nextjs";
import { Edit, Image } from 'lucide-react'; // Importing icons for visual appeal
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="relative min-h-screen flex flex-col justify-center bg-gray-900 py-20 px-4">
            <div className="absolute inset-0 opacity-0 pointer-events-none"></div>
            <div className="relative text-center space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
                    The Best AI Tool for
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-700">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Image Generation.",
                                "Image Editing"
                            ],
                            autoStart: true,
                            loop: true,
                            wrapperClassName: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                        }}
                    />
                </div>
                <p className="text-base md:text-lg lg:text-xl font-light text-zinc-300 max-w-2xl mx-auto">
                    Create stunning image content with our advanced AI technology. Experience creativity and efficiency like never before.
                </p>
            </div>
            <div className="flex justify-center mt-8">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="secondary" className="md:text-lg p-4 md:p-6 rounded-full font-semibold bg-gradient-to-r from-orange-500 via-yellow-200 to-orange-500 shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2">
                        {isSignedIn ? <Edit className="w-5 h-5"/> : <Image className="w-5 h-5"/>}
                        <span>Start Generating for Free</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
