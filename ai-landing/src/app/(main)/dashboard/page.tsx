"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/Button";

const DashboardPage = () => {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    
    setIsGenerating(true);
    
    // This would be replaced with actual API call to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGeneratedContent({
        title: `Comprehensive Guide to ${topic}`,
        content: `This is a generated article about ${topic} in the ${category || "general"} category.`,
        seo: {
          metaTitle: `${topic} - Complete Guide | MindCMS.ai`,
          metaDescription: `Learn everything about ${topic} in our comprehensive guide. Expert insights and practical tips.`,
          keywords: `${topic}, guide, tutorial, ${category}`
        },
        socialMedia: {
          twitter: `Check out our new article about ${topic}! #${topic.replace(/\s+/g, '')} #${category}`,
          facebook: `We just published a comprehensive guide about ${topic}. Click to learn more!`
        }
      });
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">MindCMS.ai Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Content Generator</CardTitle>
            <CardDescription>
              Enter a topic and optional category to generate comprehensive content
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
                <label className="block text-sm font-medium mb-1">Category (Optional)</label>
                <Input 
                  placeholder="e.g., Technology, Health, Business" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={!topic || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Content...
                  </>
                ) : "Generate Content"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
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
                  <Textarea 
                    className="min-h-[300px]" 
                    value={generatedContent.content}
                    onChange={() => {}}
                  />
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
                    <label className="block text-sm font-medium mb-1">Meta Title</label>
                    <Input value={generatedContent.seo.metaTitle} onChange={() => {}} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Description</label>
                    <Textarea value={generatedContent.seo.metaDescription} onChange={() => {}} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Keywords</label>
                    <Input value={generatedContent.seo.keywords} onChange={() => {}} />
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
                    <label className="block text-sm font-medium mb-1">Twitter</label>
                    <Textarea value={generatedContent.socialMedia.twitter} onChange={() => {}} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Facebook</label>
                    <Textarea value={generatedContent.socialMedia.facebook} onChange={() => {}} />
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
                    <Button className="w-full">Publish Now</Button>
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