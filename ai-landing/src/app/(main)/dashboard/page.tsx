"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const platforms = [
    { value: "wordpress", label: "WordPress" },
    { value: "medium", label: "Medium" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "custom", label: "Custom Website" },
  ];

  const categories = [
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "health", label: "Health" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "education", label: "Education" },
  ];

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "technical", label: "Technical" },
    { value: "conversational", label: "Conversational" },
  ];

  const handleGenerate = async () => {
    if (!topic) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          category,
          platform,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      setGeneratedContent(data);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">MindCMS.ai Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Content Generator</CardTitle>
            <CardDescription>
              Enter a topic and optional category to generate comprehensive
              content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Topic</label>
                <Input
                  placeholder="e.g., Artificial Intelligence in Healthcare"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Platform
                </label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!topic || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  "Generate Content"
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><button onClick={()=> router.push("/analytics")}>Analytics</button></CardTitle>
            <CardDescription>Content performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-muted-foreground">No published content yet</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {generatedContent && (
        <div className="mt-8">
          <Tabs defaultValue="article">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="article">Article</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="publish">Publish</TabsTrigger>
            </TabsList>
            <TabsContent value="article" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{generatedContent.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platform === "wordpress" &&
                      generatedContent.platformSpecific && (
                        <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                          <h3 className="font-medium">WordPress Specifics</h3>
                          <div className="text-sm space-y-1">
                            {Object.entries(
                              generatedContent.platformSpecific
                            ).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium capitalize">
                                  {key}:{" "}
                                </span>
                                <span>{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    {platform === "medium" &&
                      generatedContent.platformSpecific && (
                        <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                          <h3 className="font-medium">Medium Specifics</h3>
                          <div className="text-sm space-y-1">
                            {Object.entries(
                              generatedContent.platformSpecific
                            ).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium capitalize">
                                  {key}:{" "}
                                </span>
                                <span>{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    {platform === "linkedin" &&
                      generatedContent.platformSpecific && (
                        <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                          <h3 className="font-medium">LinkedIn Specifics</h3>
                          <div className="text-sm space-y-1">
                            {Object.entries(
                              generatedContent.platformSpecific
                            ).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium capitalize">
                                  {key}:{" "}
                                </span>
                                <span>{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    <RichTextEditor
                      content={generatedContent.content}
                      onChange={(content) => {
                        setGeneratedContent((prev: any) => ({
                          ...prev,
                          content,
                        }));
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="seo" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Meta Title
                    </label>
                    <Input
                      value={generatedContent.seo.metaTitle}
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Meta Description
                    </label>
                    <Textarea
                      value={generatedContent.seo.metaDescription}
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Keywords
                    </label>
                    <Input
                      value={generatedContent.seo.keywords}
                      onChange={() => {}}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="social" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Twitter
                    </label>
                    <Textarea
                      value={generatedContent.socialMedia.twitter}
                      onChange={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Facebook
                    </label>
                    <Textarea
                      value={generatedContent.socialMedia.facebook}
                      onChange={() => {}}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="publish" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Publish Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Ready to publish your content across platforms?</p>
                    <Button>Publish Now</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
