import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Instagram,
  Send,
  Save,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import MediaUploader from "./MediaUploader";
import HashtagSuggestions from "./HashtagSuggestions";

interface PostEditorProps {
  onSave?: (postData: PostData) => void;
  onSchedule?: (postData: PostData) => void;
  initialData?: PostData;
}

interface PostData {
  media?: File;
  caption?: string;
  hashtags?: string[];
  scheduledDate?: Date;
  scheduledTime?: string;
}

const PostEditor = ({
  onSave = () => {},
  onSchedule = () => {},
  initialData = {
    caption: "",
    hashtags: ["instagram", "socialmedia"],
    scheduledDate: new Date(),
    scheduledTime: "12:00",
  },
}: PostEditorProps) => {
  const [media, setMedia] = useState<File | null>(null);
  const [caption, setCaption] = useState(initialData.caption || "");
  const [hashtags, setHashtags] = useState<string[]>(
    initialData.hashtags || [],
  );
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    initialData.scheduledDate || new Date(),
  );
  const [scheduledTime, setScheduledTime] = useState(
    initialData.scheduledTime || "12:00",
  );
  const [activeTab, setActiveTab] = useState("content");

  const handleFileSelect = (file: File) => {
    setMedia(file);
  };

  const handleAddHashtag = (hashtag: string) => {
    if (!hashtags.includes(hashtag)) {
      setHashtags([...hashtags, hashtag]);
    }
  };

  const handleRemoveHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter((tag) => tag !== hashtag));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduledTime(e.target.value);
  };

  const handleSaveAsDraft = () => {
    const postData: PostData = {
      media: media || undefined,
      caption,
      hashtags,
      scheduledDate,
      scheduledTime,
    };
    onSave(postData);
  };

  const handleSchedulePost = () => {
    const postData: PostData = {
      media: media || undefined,
      caption,
      hashtags,
      scheduledDate,
      scheduledTime,
    };
    onSchedule(postData);
  };

  // Format caption with hashtags for preview
  const getFormattedCaption = () => {
    if (!caption && hashtags.length === 0) return "Add a caption...";

    let formattedCaption = caption;
    if (hashtags.length > 0) {
      formattedCaption += "\n\n" + hashtags.map((tag) => `#${tag}`).join(" ");
    }
    return formattedCaption;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Instagram className="mr-2 h-6 w-6" /> Create Instagram Post
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Media Upload */}
        <div className="lg:col-span-1">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Media</CardTitle>
            </CardHeader>
            <CardContent>
              <MediaUploader onFileSelect={handleFileSelect} />
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Post Details */}
        <div className="lg:col-span-1">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Post Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Caption
                    </label>
                    <Textarea
                      placeholder="Write your caption here..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {2200 - caption.length} characters remaining
                    </p>
                  </div>
                  <HashtagSuggestions
                    onSelectHashtag={handleAddHashtag}
                    selectedHashtags={hashtags}
                    onRemoveHashtag={handleRemoveHashtag}
                  />
                </TabsContent>
                <TabsContent value="scheduling" className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduledDate ? (
                            format(scheduledDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={setScheduledDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Time
                    </label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={handleTimeChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Optimal Posting Times
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["09:00", "12:30", "18:00"].map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          onClick={() => setScheduledTime(time)}
                          className={
                            scheduledTime === time ? "bg-primary/10" : ""
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Based on your audience engagement
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleSaveAsDraft}>
                <Save className="mr-2 h-4 w-4" /> Save as Draft
              </Button>
              <Button onClick={handleSchedulePost}>
                <Send className="mr-2 h-4 w-4" /> Schedule Post
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-1">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Instagram-like header */}
                <div className="flex items-center p-3 border-b">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=yourprofile"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-semibold">your_account</p>
                  </div>
                </div>

                {/* Post image */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {media ? (
                    <img
                      src={URL.createObjectURL(media)}
                      alt="Post preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <Instagram className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Upload media to see preview</p>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="p-3">
                  <p className="text-sm">
                    <span className="font-semibold mr-1">your_account</span>
                    {getFormattedCaption()}
                  </p>
                </div>

                {/* Scheduled time */}
                <div className="p-3 border-t flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>
                    {scheduledDate
                      ? `Scheduled for ${format(scheduledDate, "MMM d, yyyy")} at ${scheduledTime}`
                      : "Select date and time"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
