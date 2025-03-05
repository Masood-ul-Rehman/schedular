import React, { useState, useRef, ChangeEvent } from "react";
import { Upload, Image, X, Check, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MediaUploaderProps {
  onFileSelect?: (file: File) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in MB
  previewUrl?: string;
}

const MediaUploader = ({
  onFileSelect = () => {},
  acceptedFileTypes = "image/jpeg, image/png, image/jpg, video/mp4",
  maxFileSize = 10, // 10MB default
  previewUrl = "",
}: MediaUploaderProps) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>(previewUrl);
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(
        `File type not supported. Please upload ${acceptedFileTypes.replace(/,/g, " or ")}.`,
      );
      return false;
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`File size exceeds ${maxFileSize}MB limit.`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setError("");
    if (validateFile(file)) {
      setFileName(file.name);
      onFileSelect(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const clearPreview = () => {
    setPreview("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-background">
      <Card className="border-2 border-dashed rounded-lg">
        {!preview ? (
          <div
            className={`flex flex-col items-center justify-center p-12 ${dragActive ? "border-primary bg-primary/5" : "border-border"}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  Drag and drop your media
                </h3>
                <p className="text-sm text-muted-foreground">
                  Supports{" "}
                  {acceptedFileTypes
                    .replace(/image\//g, "")
                    .replace(/video\//g, "")
                    .replace(/,/g, ", ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Max file size: {maxFileSize}MB
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleButtonClick} variant="outline">
                  Browse Files
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload media for your Instagram post</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                ref={inputRef}
                type="file"
                accept={acceptedFileTypes}
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            {preview.startsWith("data:image") ? (
              <div className="aspect-square w-full overflow-hidden rounded-md">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square w-full overflow-hidden rounded-md bg-secondary flex items-center justify-center">
                <video
                  src={preview}
                  controls
                  className="max-h-full max-w-full"
                />
              </div>
            )}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
              onClick={clearPreview}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {error && (
          <CardContent className="pt-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        )}
        {fileName && (
          <CardFooter className="border-t p-4 flex justify-between">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm truncate max-w-[200px]">{fileName}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleButtonClick}>
              Change
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default MediaUploader;
