import React from "react";
import { Calendar, Clock, Instagram } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PostPreviewProps {
  imageUrl?: string;
  caption?: string;
  scheduledTime?: Date;
  hashtags?: string[];
  onClick?: () => void;
}

const PostPreview = ({
  imageUrl = "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=500&q=80",
  caption = "Beautiful sunset at the beach today! Nature at its finest. #sunset #beach",
  scheduledTime = new Date(),
  hashtags = ["sunset", "beach", "nature", "photography"],
  onClick = () => console.log("Post preview clicked"),
}: PostPreviewProps) => {
  // Format the date and time for display
  const formattedDate = scheduledTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedTime = scheduledTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Truncate caption if it's too long
  const truncatedCaption =
    caption.length > 80 ? `${caption.substring(0, 80)}...` : caption;

  return (
    <Card
      className="w-[300px] h-[350px] overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-[180px] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt="Post preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full">
          <Instagram size={16} />
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Calendar size={14} />
          <span>{formattedDate}</span>
          <Clock size={14} className="ml-2" />
          <span>{formattedTime}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-700 mb-2">{truncatedCaption}</p>
        <div className="flex flex-wrap gap-1">
          {hashtags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {hashtags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{hashtags.length - 3} more
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs">
          Edit
        </Button>
        <Button variant="secondary" size="sm" className="text-xs">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostPreview;
