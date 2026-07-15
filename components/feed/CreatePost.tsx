"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { postsApi } from "@/lib/api";
import { useToast } from "@/components/shared/Toast";
import { useAuth } from "@/lib/auth-context";
import type { FeedPost } from "@/types";
import {
  ImageIcon,
  GlobeIcon,
  LockIcon,
} from "@/components/shared/Icons";

interface CreatePostProps {
  onCreated?: (post: FeedPost) => void;
}

const CreatePost = ({ onCreated }: CreatePostProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPEG, PNG, and WebP images are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5 MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!text.trim() && !imageFile) {
      setError("Please add text or an image");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      if (text.trim()) formData.append("text", text.trim());
      formData.append("visibility", visibility);
      if (imageFile) formData.append("image", imageFile);

      const res = await postsApi.create(formData);
      const post = (res.post ?? res) as FeedPost;
      if (!post?.id) throw new Error("Invalid response from server");
      onCreated?.(post);
      toast("Post published!");
      setText("");
      removeImage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-theme-card rounded-3 p-4 mb-3">
      <div className="d-flex align-items-start mb-3">
        <div className="flex-shrink-0 me-3" style={{ cursor: "pointer" }}>
          {user?.avatarUrl ? (
            <Image
              width={40}
              height={40}
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="avatar object-fit-cover"
              style={{ padding: "1px" }}
            />
          ) : (
            <div
              className="avatar bg-primary text-white d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: 40, height: 40, fontSize: 14, padding: "1px" }}
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
          )}
        </div>
        <div className="w-100 position-relative">
          <textarea
            className="form-control border-0 bg-transparent p-2 shadow-none shadow-none-focus"
            placeholder="Write something"
            style={{ height: "88px", resize: "none" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>

      {imagePreview && (
        <div className="mb-3 position-relative">
          <Image
            width={400}
            height={300}
            src={imagePreview}
            alt="Preview"
            className="img-fluid rounded-3 object-fit-cover"
            style={{ maxHeight: 300, width: "100%" }}
          />
          <button
            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
            style={{ width: 28, height: 28 }}
            onClick={removeImage}
            type="button"
          >
            &times;
          </button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger py-2 mb-3" role="alert">
          {error}
        </div>
      )}

      <div
        className="d-flex align-items-center justify-content-between px-1 px-md-3 rounded-2"
        style={{ height: "64px", background: "color-mix(in srgb, var(--bs-primary) 5%, transparent)" }}
      >
        <div className="d-flex align-items-center gap-0 gap-md-2">
          <button
            className="btn btn-link text-body-secondary d-flex align-items-center px-2"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            <ImageIcon />
            <span className="d-none d-md-inline ms-0 ms-md-1 text-body">Photo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="d-none"
            onChange={handleImageSelect}
          />
          <div className="dropdown">
            <button
              className="btn btn-link text-body-secondary d-flex align-items-center px-2 text-decoration-none"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {visibility === "PUBLIC" ? (
                <GlobeIcon className="me-0" />
              ) : (
                <LockIcon className="me-0" />
              )}
              <span className="d-none d-md-inline ms-1 text-body small">
                {visibility === "PUBLIC" ? "Public" : "Private"}
              </span>
              <svg className="ms-1" xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
                <path fill="currentColor" d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z" />
              </svg>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 py-1 rounded-3">
              <li>
                <button
                  className={`dropdown-item d-flex align-items-center py-2 small ${visibility === "PUBLIC" ? "active" : ""}`}
                  onClick={() => setVisibility("PUBLIC")}
                  type="button"
                >
                  <GlobeIcon className="me-2" />
                  Public
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item d-flex align-items-center py-2 small ${visibility === "PRIVATE" ? "active" : ""}`}
                  onClick={() => setVisibility("PRIVATE")}
                  type="button"
                >
                  <LockIcon className="me-2" />
                  Private
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center px-4 py-2 fw-medium border-0 rounded-pill"
          onClick={handleSubmit}
          disabled={submitting || (!text.trim() && !imageFile)}
        >
          {submitting ? (
            <span className="spinner-border spinner-border-sm" role="status" />
          ) : (
            <>
              <svg
                className="me-2"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="13"
                fill="none"
                viewBox="0 0 14 13"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z"
                  clipRule="evenodd"
                />
              </svg>
              Post
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
