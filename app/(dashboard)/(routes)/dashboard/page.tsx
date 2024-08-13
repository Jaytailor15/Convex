"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Edit, Image } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Image Generator",
    icon: Image,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/image"

  },
  {
    label: "Edit Tool",
    icon: Edit,
    color: "text-yellow-500",
    bgColor: "bg-orange-500/10",
    href: "/edit"

  },
]
export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-700">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Generate images using text <br/>
          Experience the power of <b className="text-orange-500 font-extrabold">Convex</b>
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool)=>(
            <Card 
            onClick={()=> router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/10 flex items-center justify-between hover:shadow-md transition cursor-pointer bg-gray-100"
            >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)}/>
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5"/>
            </Card>
          ))}
      </div>
    </div>

  );
}
