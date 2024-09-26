'use client';
import { BsFiletypePdf } from "react-icons/bs";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: "ResumePdf";
    value: string | undefined;
    disabled?: boolean;
}

const FileUpload = ({
    disabled = false,
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);

    
    useEffect(() => {
        if (!value) {
            setFileInfo(null);  
        }
    }, [value]);

    const handleRemoveFile = () => {
        onChange("");  
        setFileInfo(null); 
    };

    return (
        <div className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {fileInfo ? ( // Show uploaded file info if it exists
                <div className={`h-25 w-25 relative flex items-center gap-3 p-2 mt-2 rounded-md border`}>
                    <BsFiletypePdf size={24} />
                    <div>
                        <a
                            className="truncate"
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p className="truncate w-40">{fileInfo.name}</p>
                        </a>
                        <span className="text-xs text-gray-500">
                            {Math.round(fileInfo.size / 1024)} Kb
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemoveFile}
                        className={`absolute top-5 right-4 text-gray-600 p-1 rounded-full`}
                    >
                        <X size={20} />
                    </button>
                </div>
            ) : ( // Show dropzone when no file is uploaded
                <UploadDropzone
                    endpoint={endpoint}
                    onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                            setFileInfo({ name: res[0].name, size: res[0].size }); // Set file info
                            onChange(res[0].url); // Pass the URL to the parent component
                        }
                    }}
                    onUploadError={(error: Error) => {
                        console.log(`ERROR! ${error.message}`);
                    }}
                />
            )}
        </div>
    );
};

export default FileUpload;
