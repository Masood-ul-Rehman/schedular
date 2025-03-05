import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Hash, Plus, X } from "lucide-react";

interface HashtagSuggestionsProps {
  onSelectHashtag?: (hashtag: string) => void;
  selectedHashtags?: string[];
  onRemoveHashtag?: (hashtag: string) => void;
}

const HashtagSuggestions = ({
  onSelectHashtag = () => {},
  selectedHashtags = [
    "instagram",
    "socialmedia",
    "contentcreator",
    "marketing",
  ],
  onRemoveHashtag = () => {},
}: HashtagSuggestionsProps) => {
  const [customHashtag, setCustomHashtag] = useState("");

  // Sample hashtag suggestions based on common Instagram categories
  const suggestedHashtags = [
    "photography",
    "travel",
    "food",
    "fashion",
    "fitness",
    "beauty",
    "art",
    "nature",
    "lifestyle",
    "motivation",
    "business",
    "entrepreneur",
    "inspiration",
    "love",
    "happy",
  ];

  const handleAddCustomHashtag = () => {
    if (customHashtag && !selectedHashtags.includes(customHashtag)) {
      onSelectHashtag(customHashtag);
      setCustomHashtag("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomHashtag();
    }
  };

  return (
    <div className="w-full p-4 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center mb-3">
        <Hash className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-md font-medium">Hashtag Suggestions</h3>
      </div>

      {/* Selected hashtags */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Selected Hashtags:</p>
        <div className="flex flex-wrap gap-2">
          {selectedHashtags.length > 0 ? (
            selectedHashtags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1"
              >
                #{tag}
                <button
                  onClick={() => onRemoveHashtag(tag)}
                  className="ml-1 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">No hashtags selected</p>
          )}
        </div>
      </div>

      {/* Custom hashtag input */}
      <div className="flex mb-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-2.5 text-gray-500">#</span>
          <input
            type="text"
            value={customHashtag}
            onChange={(e) =>
              setCustomHashtag(e.target.value.replace(/\s+/g, ""))
            }
            onKeyDown={handleKeyDown}
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Add custom hashtag"
          />
        </div>
        <Button
          onClick={handleAddCustomHashtag}
          className="rounded-l-none"
          disabled={!customHashtag}
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      {/* Suggested hashtags */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Suggested Hashtags:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedHashtags.map((tag) => (
            <TooltipProvider key={tag}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`text-xs ${selectedHashtags.includes(tag) ? "bg-gray-100" : ""}`}
                    onClick={() => onSelectHashtag(tag)}
                    disabled={selectedHashtags.includes(tag)}
                  >
                    #{tag}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {selectedHashtags.includes(tag)
                    ? "Already added"
                    : "Click to add"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HashtagSuggestions;
