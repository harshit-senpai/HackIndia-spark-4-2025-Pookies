"use client";
import React, { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, Users, Heart, Share2, TrendingUp } from "lucide-react";

// Sample data
const data = [
  { day: "Mon", followers: 80, likes: 30, shared: 10 },
  { day: "Tue", followers: 120, likes: 50, shared: 20 },
  { day: "Wed", followers: 90, likes: 45, shared: 15 },
  { day: "Thu", followers: 110, likes: 40, shared: 20 },
  { day: "Fri", followers: 100, likes: 35, shared: 18 },
  { day: "Sat", followers: 60, likes: 25, shared: 10 },
  { day: "Sun", followers: 70, likes: 28, shared: 12 },
];

const monthlyData = [
  { month: "Jan", followers: 500, likes: 200, shared: 80 },
  { month: "Feb", followers: 550, likes: 220, shared: 85 },
  { month: "Mar", followers: 600, likes: 240, shared: 90 },
  { month: "Apr", followers: 680, likes: 260, shared: 100 },
  { month: "May", followers: 720, likes: 280, shared: 110 },
  { month: "Jun", followers: 800, likes: 320, shared: 130 },
];

const genderData = [
  { name: "Male", value: 65 },
  { name: "Female", value: 35 },
];

const ageData = [
  { name: "18-24", value: 25 },
  { name: "25-34", value: 40 },
  { name: "35-44", value: 20 },
  { name: "45+", value: 15 },
];

const topFollowers = [
  { name: "Anita Molle", engagement: 87, avatar: "AM" },
  { name: "Dan Rookie", engagement: 82, avatar: "DR" },
  { name: "Rita Sanchez", engagement: 78, avatar: "RS" },
  { name: "Carla Ferguson", engagement: 76, avatar: "CF" },
  { name: "James Wilson", engagement: 72, avatar: "JW" },
];

const GENDER_COLORS = ["#6366F1", "#EC4899"];
const AGE_COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("weekly");

  const CustomTooltip: React.FC<{ active?: boolean; payload?: any[]; label?: string }> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="text-gray-300">{label}</p>
          {payload?.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStatCard = (title: string, value: string, change: number, icon: React.ReactNode, color: string) => (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
          </div>
          <div className={`p-2 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
            {change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </span>
          <span className={`ml-1 ${change >= 0 ? "text-green-500" : "text-red-500"} font-medium`}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1 text-gray-400">vs previous period</span>
        </div>
      </CardContent>
    </Card>
  );

  const renderActiveContent = () => {
    const displayData = activeTab === "monthly" ? monthlyData : data;
    const labelKey = activeTab === "monthly" ? "month" : "day";

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getStatCard("Total Followers", "8,642", 12.3, <Users size={20} />, "bg-indigo-500/20 text-indigo-500")}
          {getStatCard("Total Likes", "31,642", 8.1, <Heart size={20} />, "bg-pink-500/20 text-pink-500")}
          {getStatCard("Total Shares", "4,742", -2.5, <Share2 size={20} />, "bg-emerald-500/20 text-emerald-500")}
          {getStatCard("Engagement Rate", "16.8%", 5.2, <TrendingUp size={20} />, "bg-amber-500/20 text-amber-500")}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Growth Trends</CardTitle>
              <CardDescription className="text-gray-400">Followers over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={displayData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey={labelKey} stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="followers" 
                      stroke="#6366F1" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: "#6366F1" }} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Engagement Analysis</CardTitle>
              <CardDescription className="text-gray-400">Likes & shares breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={displayData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey={labelKey} stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="likes" name="Likes" fill="#EC4899" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="shared" name="Shares" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Gender Distribution</CardTitle>
              <CardDescription className="text-gray-400">Audience breakdown by gender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderData.map((entry, index: number) => (
                        <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Age Demographics</CardTitle>
              <CardDescription className="text-gray-400">Audience breakdown by age</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ageData.map((entry, index: number) => (
                        <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Top Followers</CardTitle>
              <CardDescription className="text-gray-400">Most engaged audience members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFollowers.map((follower, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                        {follower.avatar}
                      </div>
                      <div className="ml-3">
                        <p className="text-white font-medium">{follower.name}</p>
                        <p className="text-gray-400 text-sm">Engagement: {follower.engagement}%</p>
                      </div>
                    </div>
                    <div className="text-gray-300 font-medium">#{index + 1}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-1">Comprehensive overview of your social media performance</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 md:mt-0">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="daily" className="data-[state=active]:bg-indigo-600">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-indigo-600">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-indigo-600">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="data-[state=active]:bg-indigo-600">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {renderActiveContent()}
      </div>
    </div>
  );
};

export default Dashboard;