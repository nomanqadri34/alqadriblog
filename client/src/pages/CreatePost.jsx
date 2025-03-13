import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    image: "",
  });
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  // Upload image to Cloudinary
  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image.");
      return;
    }

    setImageUploadError(null);
    setImageUploadProgress(0);

    const formDataImage = new FormData();
    formDataImage.append("file", file);
    formDataImage.append("upload_preset", "ml_default"); // Replace with your Cloudinary preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzhypofiv/image/upload",
        formDataImage,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setImageUploadProgress(progress);
          },
        }
      );

      if (response.data.secure_url) {
        setFormData((prevData) => ({ ...prevData, image: response.data.secure_url }));
        setImageUploadError(null);
      } else {
        throw new Error("Invalid response from Cloudinary.");
      }
    } catch (error) {
      setImageUploadError("Image upload failed. Please try again.");
      setImageUploadProgress(null);
      console.error("Upload Error:", error);
    }
  };

  // Submit Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Ensure token is retrieved

    // Check if required fields are filled
    if (!formData.title || !formData.category || !formData.content || !formData.image) {
      setPublishError("Please fill in all fields and upload an image.");
      return;
    }

    // Debugging
    console.log("Submitting Form Data:", formData);

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || "4F5GRGTBY6H"}`, // Fix: Ensure token is included
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Server Response:", data); // Debugging

      if (!res.ok) {
        setPublishError(data.message || "Failed to publish post.");
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setPublishError("Something went wrong. Check console for details.");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value='Development'>Web& App Development</option>
              <option value='AI'>Artificial Intelligence</option>
              <option value='Islamic'>Islamic Blog</option>
          </Select>
        </div>

        {/* Image Upload Section */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded"
            className="w-full h-72 object-cover"
          />
        )}

        {/* Content Editor */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          value={formData.content}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        {/* Publish Button */}
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>

        {/* Error Messages */}
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}


