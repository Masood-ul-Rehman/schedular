import React from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface AnalyticsPanelProps {
  bestTimes?: { day: string; time: string; engagement: number }[];
  audienceMetrics?: {
    followers: number;
    reachWeekly: number;
    impressionsWeekly: number;
    engagementRate: number;
  };
  postPerformance?: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    reach: number;
  };
}

const AnalyticsPanel = ({
  bestTimes = [
    { day: "Monday", time: "6:00 PM", engagement: 85 },
    { day: "Wednesday", time: "12:30 PM", engagement: 78 },
    { day: "Friday", time: "8:00 AM", engagement: 92 },
    { day: "Saturday", time: "9:00 PM", engagement: 88 },
    { day: "Sunday", time: "3:00 PM", engagement: 76 },
  ],
  audienceMetrics = {
    followers: 2547,
    reachWeekly: 12350,
    impressionsWeekly: 18720,
    engagementRate: 4.8,
  },
  postPerformance = {
    likes: 856,
    comments: 142,
    shares: 64,
    saves: 38,
    reach: 3240,
  },
}: AnalyticsPanelProps) => {
  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Last 7 Days
            </Button>
            <Button variant="outline" size="sm">
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">
              Custom Range
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="content">Content Performance</TabsTrigger>
            <TabsTrigger value="optimal-times">Optimal Times</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Followers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {audienceMetrics.followers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Weekly Reach
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {audienceMetrics.reachWeekly.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Engagement Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {audienceMetrics.engagementRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +1.2% from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Impressions
                  </CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {audienceMetrics.impressionsWeekly.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +15% from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Engagement Overview</CardTitle>
                  <CardDescription>Weekly engagement metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-slate-50 rounded-md">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Engagement chart visualization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>Age and location breakdown</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-slate-50 rounded-md">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Demographics chart visualization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audience Growth</CardTitle>
                <CardDescription>Follower growth over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="flex items-center justify-center h-full bg-slate-50 rounded-md">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Audience growth chart visualization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Post Performance</CardTitle>
                <CardDescription>Metrics for your recent posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-md">
                    <span className="text-xl font-bold">
                      {postPerformance.likes}
                    </span>
                    <span className="text-sm text-muted-foreground">Likes</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-md">
                    <span className="text-xl font-bold">
                      {postPerformance.comments}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Comments
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-md">
                    <span className="text-xl font-bold">
                      {postPerformance.shares}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Shares
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-md">
                    <span className="text-xl font-bold">
                      {postPerformance.saves}
                    </span>
                    <span className="text-sm text-muted-foreground">Saves</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-md">
                    <span className="text-xl font-bold">
                      {postPerformance.reach}
                    </span>
                    <span className="text-sm text-muted-foreground">Reach</span>
                  </div>
                </div>

                <div className="h-64 bg-slate-50 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Post performance comparison chart
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimal-times" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Best Times to Post</CardTitle>
                <CardDescription>
                  Recommended posting times based on audience engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bestTimes.map((timeSlot, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-md"
                    >
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-slate-500" />
                        <span className="font-medium">{timeSlot.day}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-slate-500" />
                        <span>{timeSlot.time}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 bg-slate-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${timeSlot.engagement}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">
                          {timeSlot.engagement}% engagement
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Schedule a Post for Best Time
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
