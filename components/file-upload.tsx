"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import { FileIcon, Upload, X } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage"
}
export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if(value && fileType !=="rar") {
        return (
            <div className="relative h-20 w-20">
                <Image 
                fill
                src={value}
                alt="Upload"
                className="rounded-full"
                />
                <button
                  onClick={() => onChange("")}
                  className="bg-[#d1d1d1] text-black p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                  type="button">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    if (value && fileType === "rar") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-[#d1d1d1] stroke-neutral-900"/>
                <a 
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-[#d1d1d1] dark:text-[#d1d1d1]"
                >
                    {value}
                </a>
                <button
                  onClick={() => onChange("")}
                  className="bg-[#d1d1d1] text-black p-1 rounded-full absolute top-0 right-0 shadow-sm"
                  type="button">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone 
/*
content={{
    button({ ready }) {
      if (ready) return <div>Upload stuff</div>;

      return "Getting ready...";
    },
    allowedContent({ ready, fileTypes, isUploading }) {
      if (!ready) return "Checking what you allow";
      if (isUploading) return "Seems like stuff is uploading";
      return `Stuff you can upload: ${fileTypes.join(", ")}`;
    },
}}
*/

        className="custom-class"
        
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
            console.log(error)
        }}
        />
    )
}