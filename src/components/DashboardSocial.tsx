import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const dummyImages = [
  "/images1.jpeg",
  "/images2.jpg",
  "/images3.png",
  "/images4.jpg",
  "/LBS.jpg",
];

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("liked");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="flex justify-center space-x-4 border-b pb-2">
          <TabsTrigger value="liked">Liked</TabsTrigger>
          <TabsTrigger value="commented">Commented</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        {/* Liked Posts */}
        <TabsContent value="liked">
          <ImageGrid images={[...dummyImages]} />
        </TabsContent>

        {/* Commented Posts (Shuffled Order) */}
        <TabsContent value="commented">
          <ImageGrid
            images={[
              dummyImages[2],
              dummyImages[4],
              dummyImages[1],
              dummyImages[0],
              dummyImages[3],
            ]}
          />
        </TabsContent>

        {/* Saved Posts (Another Different Order) */}
        <TabsContent value="saved">
          <ImageGrid
            images={[
              dummyImages[4],
              dummyImages[0],
              dummyImages[3],
              dummyImages[2],
              dummyImages[1],
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ImageGrid({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="post"
          className="w-full h-48 object-cover rounded-md"
        />
      ))}
    </div>
  );
}
