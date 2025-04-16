import { useState, useRef } from "react";

export default function FileUploader({ fileName }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log(selectedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="bg-BackgroundColor rounded-md p-2.5 cursor-pointer"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <p className="text-sm text-AccentColor3 text-center">
        {file ? file.name : fileName}
      </p>
    </div>
  );
}
