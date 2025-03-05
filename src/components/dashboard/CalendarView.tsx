import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PostPreview from "./PostPreview";

interface ScheduledPost {
  id: string;
  imageUrl: string;
  caption: string;
  scheduledTime: Date;
  hashtags: string[];
}

interface CalendarViewProps {
  scheduledPosts?: ScheduledPost[];
  onCreatePost?: (date?: Date) => void;
  onSelectPost?: (post: ScheduledPost) => void;
  onFilterChange?: (filter: string) => void;
}

const CalendarView = ({
  scheduledPosts = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=500&q=80",
      caption: "Beautiful sunset at the beach today! Nature at its finest.",
      scheduledTime: new Date(new Date().setHours(10, 30)),
      hashtags: ["sunset", "beach", "nature"],
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&q=80",
      caption: "Delicious homemade pasta for dinner tonight! #foodie #cooking",
      scheduledTime: new Date(new Date().setDate(new Date().getDate() + 2)),
      hashtags: ["food", "cooking", "homemade", "pasta"],
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1551655510-555dc3be8633?w=500&q=80",
      caption:
        "Morning workout routine. Starting the day right! #fitness #motivation",
      scheduledTime: new Date(new Date().setDate(new Date().getDate() + 5)),
      hashtags: ["fitness", "workout", "motivation", "morning"],
    },
  ],
  onCreatePost = (date) => console.log("Create post for date:", date),
  onSelectPost = (post) => console.log("Selected post:", post),
  onFilterChange = (filter) => console.log("Filter changed to:", filter),
}: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  // Get the first and last day of the current month
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Navigate to previous month
  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Get posts for a specific date
  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter((post) => isSameDay(post.scheduledTime, date));
  };

  // Get posts for the selected date
  const postsForSelectedDate = selectedDate
    ? getPostsForDate(selectedDate)
    : [];

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Handle create post button click
  const handleCreatePost = () => {
    onCreatePost(selectedDate);
  };

  return (
    <div className="w-full h-full p-6 bg-background">
      <div className="flex flex-col space-y-6">
        {/* Header with title and actions */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Content Calendar</h1>
            <p className="text-muted-foreground">
              Schedule and manage your Instagram posts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all" onValueChange={onFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter posts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreatePost}>
              <Plus className="mr-2 h-4 w-4" /> Create Post
            </Button>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex justify-end">
          <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="text-xs"
            >
              Calendar View
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="text-xs"
            >
              List View
            </Button>
          </div>
        </div>

        {viewMode === "calendar" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle>{format(currentDate, "MMMM yyyy")}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={currentDate}
                  className="rounded-md border"
                />
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
                    <span>Scheduled</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500" />
                    <span>Published</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-gray-300" />
                    <span>Draft</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts for selected date */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {selectedDate
                      ? format(selectedDate, "EEEE, MMMM d, yyyy")
                      : "Select a date"}
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCreatePost}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create post for this date</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                {postsForSelectedDate.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {postsForSelectedDate.map((post) => (
                      <PostPreview
                        key={post.id}
                        imageUrl={post.imageUrl}
                        caption={post.caption}
                        scheduledTime={post.scheduledTime}
                        hashtags={post.hashtags}
                        onClick={() => onSelectPost(post)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No posts scheduled</h3>
                    <p className="text-muted-foreground mb-4">
                      There are no posts scheduled for this date.
                    </p>
                    <Button onClick={handleCreatePost}>
                      <Plus className="mr-2 h-4 w-4" /> Create Post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* List View */
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Scheduled Posts</CardTitle>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h4 className="font-medium">Filter Posts</h4>
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Status</h5>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">All</Badge>
                            <Badge>Scheduled</Badge>
                            <Badge variant="secondary">Draft</Badge>
                            <Badge variant="outline">Published</Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Date Range</h5>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span className="text-sm">From</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span className="text-sm">To</span>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full">Apply Filters</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button onClick={handleCreatePost}>
                    <Plus className="mr-2 h-4 w-4" /> Create Post
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.length > 0 ? (
                  scheduledPosts
                    .sort(
                      (a, b) =>
                        a.scheduledTime.getTime() - b.scheduledTime.getTime(),
                    )
                    .map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                        onClick={() => onSelectPost(post)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden">
                            <img
                              src={post.imageUrl}
                              alt="Post thumbnail"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium truncate max-w-md">
                              {post.caption}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {format(
                                post.scheduledTime,
                                "MMM d, yyyy 'at' h:mm a",
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.hashtags.slice(0, 2).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                              {post.hashtags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.hashtags.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge
                            className={`mr-4 ${isToday(post.scheduledTime) ? "bg-orange-500" : ""}`}
                          >
                            {isToday(post.scheduledTime)
                              ? "Today"
                              : "Scheduled"}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No posts scheduled</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't scheduled any posts yet.
                    </p>
                    <Button onClick={handleCreatePost}>
                      <Plus className="mr-2 h-4 w-4" /> Create Post
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
