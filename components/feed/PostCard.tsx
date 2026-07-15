"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPostTime } from "@/lib/utils";
import { postsApi } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/shared/Toast";
import type { FeedPost } from "@/types";
import CommentSection from "./CommentSection";
import LikedByModal from "./LikedByModal";
import ConfirmModal from "@/components/shared/ConfirmModal";
import {
  MenuDotsIcon,
  SavePostIcon,
  TurnOnNotificationIcon,
  HideIcon,
  EditPostIcon,
  DeletePostIcon,
  CommentIcon,
  ShareIcon,
  ThumbUpIcon,
  GlobeIcon,
  LockIcon,
} from "@/components/shared/Icons";

const PostCard = ({
  post,
  onDeleted,
}: {
  post: FeedPost;
  onDeleted?: (id: string) => void;
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [showLikedBy, setShowLikedBy] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.text ?? "");
  const [postText, setPostText] = useState(post.text ?? "");
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isAuthor = user?.id === post.author.id;

  const toggleLike = async () => {
    try {
      if (liked) {
        await postsApi.unlike(post.id);
        setLikeCount((c) => c - 1);
      } else {
        await postsApi.like(post.id);
        setLikeCount((c) => c + 1);
      }
      setLiked(!liked);
    } catch {
      // silently fail
    }
  };

  const authorName = `${post.author.firstName} ${post.author.lastName}`;

  const handleDelete = async () => {
    setShowDeleteConfirm(false);
    try {
      await postsApi.remove(post.id);
      toast("Post deleted");
      onDeleted?.(post.id);
    } catch {
      toast("Failed to delete post");
    }
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;
    setSaving(true);
    try {
      await postsApi.update(post.id, { text: editText.trim() });
      setPostText(editText.trim());
      setEditing(false);
      toast("Post updated");
    } catch {
      toast("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-theme-card rounded-3 pt-4 mb-3">
      <div className="px-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            <div className="me-3 flex-shrink-0">
              {post.author.avatarUrl ? (
                <Image
                  width={48}
                  height={48}
                  src={post.author.avatarUrl}
                  alt={authorName}
                  className="avatar object-fit-cover"
                />
              ) : (
                <div
                  className="avatar bg-primary text-white d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: 48, height: 48, fontSize: 18 }}
                >
                  {post.author.firstName[0]}
                  {post.author.lastName[0]}
                </div>
              )}
            </div>
            <div>
              <h4 className="fs-6 fw-medium text-body mb-1 post-author-hover">
                {authorName}
              </h4>
              <p className="small text-muted d-flex align-items-center">
                {formatPostTime(post.createdAt)}
                <span
                  className="ms-2 text-muted"
                  title={post.visibility === "PUBLIC" ? "Public" : "Private"}
                >
                  {post.visibility === "PUBLIC" ? <GlobeIcon /> : <LockIcon />}
                </span>
              </p>
            </div>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-link text-body-secondary p-1 text-decoration-none"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <MenuDotsIcon />
            </button>
            <ul className="dropdown-menu dropdown-menu-end bg-theme-card shadow-sm border py-2 rounded-3">
              <li>
                <button
                  className="dropdown-item d-flex align-items-center py-2 text-body small"
                  type="button"
                >
                  <span className="me-3 text-body-secondary">
                    <SavePostIcon />
                  </span>
                  Save post
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center py-2 text-body small"
                  type="button"
                >
                  <span className="me-3 text-body-secondary">
                    <TurnOnNotificationIcon />
                  </span>
                  Turn on notification
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center py-2 text-body small"
                  type="button"
                >
                  <span className="me-3 text-body-secondary">
                    <HideIcon />
                  </span>
                  Hide
                </button>
              </li>
              {isAuthor && (
                <>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center py-2 text-body small"
                      type="button"
                      onClick={() => {
                        setEditing(true);
                        setEditText(postText);
                      }}
                    >
                      <span className="me-3 text-body-secondary">
                        <EditPostIcon />
                      </span>
                      Edit post
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center py-2 text-danger small"
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <span className="me-3">
                        <DeletePostIcon />
                      </span>
                      Delete post
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {editing ? (
          <div className="mb-4">
            <textarea
              className="form-control border bg-transparent mb-2"
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-primary rounded-pill px-3"
                onClick={handleSaveEdit}
                disabled={saving || !editText.trim()}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                onClick={() => {
                  setEditing(false);
                  setEditText(postText);
                }}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : postText ? (
          <h4 className="fs-6 fw-normal text-body mb-4">{postText}</h4>
        ) : null}

        {post.imageUrl && (
          <div className="mb-4 rounded-3 overflow-hidden">
            <Image
              width={500}
              height={500}
              src={post.imageUrl}
              alt="Post Image"
              loading="eager"
              className="img-fluid w-100 d-block object-fit-cover"
            />
          </div>
        )}
      </div>

      <div className="d-flex align-items-center justify-content-between px-4 mb-4">
        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => likeCount > 0 && setShowLikedBy(true)}
        >
          {(post.likedByPreview ?? []).length > 0 && (
            <>
              {(post.likedByPreview ?? []).slice(0, 3).map((user, i) => (
                <div
                  key={user.id}
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-white"
                  style={{
                    width: 32,
                    height: 32,
                    marginLeft: i === 0 ? 0 : -12,
                    fontSize: 11,
                    zIndex: (post.likedByPreview ?? []).length - i,
                  }}
                >
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
              ))}
            </>
          )}
          {likeCount > 0 && (
            <span className="ms-2 small text-muted">
              {likeCount} like{likeCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="d-flex align-items-center gap-3 small">
          <p className="mb-0">
            <span className="text-muted">
              <span className="text-body fw-medium">{post.commentCount}</span>{" "}
              Comment
            </span>
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mx-4 p-1 rounded-3 bg-theme-reaction">
        <button
          className={`btn d-flex align-items-center justify-content-center flex-grow-1 mx-1 post-action-btn ${liked ? "text-primary" : "text-body"}`}
          onClick={toggleLike}
        >
          <ThumbUpIcon />
          <span className="ms-2 fw-medium d-none d-sm-block">
            {liked ? "Liked" : "Like"}
          </span>
        </button>
        <button
          className="btn text-body d-flex align-items-center justify-content-center flex-grow-1 mx-1 post-action-btn"
          onClick={() => setShowComments(true)}
        >
          <CommentIcon />
          <span className="ms-2 fw-medium d-none d-sm-block">Comment</span>
        </button>
        <button className="btn text-body d-flex align-items-center justify-content-center flex-grow-1 mx-1 post-action-btn">
          <ShareIcon />
          <span className="ms-2 fw-medium d-none d-sm-block">Share</span>
        </button>
      </div>

      <div className="px-4 pt-4 pb-2">
        <CommentSection
          postId={post.id}
          commentCount={post.commentCount}
          showInput={showComments}
        />
      </div>

      <LikedByModal
        id={post.id}
        type="post"
        show={showLikedBy}
        onClose={() => setShowLikedBy(false)}
      />
      <ConfirmModal
        show={showDeleteConfirm}
        title="Delete post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

export default PostCard;
