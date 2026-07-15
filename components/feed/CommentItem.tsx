"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { formatPostTime } from "@/lib/utils";
import { commentsApi } from "@/lib/api";
import type { Comment } from "@/types";
import { ThumbUpIcon } from "@/components/shared/Icons";
import LikedByModal from "./LikedByModal";

interface CommentItemProps {
  comment: Comment;
  onReplyCreated?: (reply: Comment) => void;
  isReply?: boolean;
}

const CommentItem = ({
  comment,
  onReplyCreated,
  isReply = false,
}: CommentItemProps) => {
  const [liked, setLiked] = useState(comment.likedByMe);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [showLikedBy, setShowLikedBy] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  const [replies, setReplies] = useState<Comment[]>([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replyCursor, setReplyCursor] = useState<string | null>(null);
  const [loadingMoreReplies, setLoadingMoreReplies] = useState(false);

  const authorName = `${comment.author.firstName} ${comment.author.lastName}`;

  const toggleLike = async () => {
    try {
      if (liked) {
        await commentsApi.unlike(comment.id);
        setLikeCount((c) => c - 1);
      } else {
        await commentsApi.like(comment.id);
        setLikeCount((c) => c + 1);
      }
      setLiked(!liked);
    } catch {
      // silently fail
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setSubmittingReply(true);
    try {
      const res = await commentsApi.createReply(comment.id, {
        text: replyText.trim(),
      });
      const reply = (res.comment ?? res) as Comment;
      setReplyText("");
      setShowReplyInput(false);
      setReplies((prev) => [reply, ...prev]);
      setRepliesLoaded(true);
      onReplyCreated?.(reply);
    } catch {
      // silently fail
    } finally {
      setSubmittingReply(false);
    }
  };

  const fetchReplies = useCallback(
    async (c?: string) => {
      try {
        const data = await commentsApi.replies(comment.id, {
          limit: 5,
          cursor: c,
        });
        if (c) {
          setReplies((prev) => [...prev, ...data.items]);
        } else {
          setReplies(data.items);
        }
        setReplyCursor(data.nextCursor);
      } catch {
        // silently fail
      }
    },
    [comment.id],
  );

  const loadReplies = async () => {
    if (repliesLoaded) {
      setRepliesLoaded(false);
      setReplies([]);
      return;
    }
    setLoadingReplies(true);
    await fetchReplies();
    setRepliesLoaded(true);
    setLoadingReplies(false);
  };

  const loadMoreReplies = async () => {
    if (!replyCursor || loadingMoreReplies) return;
    setLoadingMoreReplies(true);
    await fetchReplies(replyCursor);
    setLoadingMoreReplies(false);
  };

  const timeAgo = formatPostTime(comment.createdAt);

  return (
    <div className="d-flex mb-3">
      <div className="flex-shrink-0 me-3">
        {comment.author.avatarUrl ? (
          <Image
            width={40}
            height={40}
            src={comment.author.avatarUrl}
            alt={authorName}
            className="avatar object-fit-cover border"
          />
        ) : (
          <div
            className="avatar bg-primary text-white d-flex align-items-center justify-content-center rounded-circle border"
            style={{ width: 40, height: 40, fontSize: 14 }}
          >
            {comment.author.firstName[0]}
            {comment.author.lastName[0]}
          </div>
        )}
      </div>

      <div className="flex-grow-1">
        <div className="bg-theme-comment-box rounded-4 py-2 px-3 position-relative">
          <span className="text-body fw-semibold">{authorName}</span>
          <p className="text-body small mt-1 mb-0">{comment.text}</p>

          {likeCount > 0 && (
            <div
              className="position-absolute bg-body border rounded-pill d-flex align-items-center px-2 py-1 shadow-sm"
              style={{ bottom: "-16px", right: "16px", cursor: "pointer" }}
              onClick={() => setShowLikedBy(true)}
            >
              <span
                className="text-primary d-flex align-items-center"
                style={{ marginLeft: "-4px" }}
              >
                <ThumbUpIcon />
              </span>
              <span className="ms-1 small text-body">{likeCount}</span>
            </div>
          )}
        </div>

        <div className="d-flex align-items-center ms-2">
          <button
            className={`btn btn-sm text-body ${liked ? "fw-semibold" : ""}`}
            onClick={toggleLike}
          >
            {liked ? "Liked" : "Like"}
          </button>
          {!isReply && (
            <button
              className="btn btn-sm text-body"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Reply
            </button>
          )}
          <span className="text-muted small">{timeAgo}</span>
        </div>

        {!isReply && comment.replyCount > 0 && (
          <button
            className="btn btn-sm text-muted ms-2 mb-2"
            onClick={loadReplies}
            disabled={loadingReplies}
          >
            {loadingReplies
              ? "Loading..."
              : repliesLoaded
                ? "Hide replies"
                : `View ${comment.replyCount} ${comment.replyCount === 1 ? "reply" : "replies"}`}
          </button>
        )}

        {repliesLoaded && replies.length > 0 && (
          <div className="ms-2">
            {replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
            {replyCursor && (
              <button
                className="btn btn-sm text-muted ms-5 mb-2"
                onClick={loadMoreReplies}
                disabled={loadingMoreReplies}
              >
                {loadingMoreReplies ? "Loading..." : "Load more replies"}
              </button>
            )}
          </div>
        )}

        {showReplyInput && (
          <div className="ms-2 mb-3">
            <div className="d-flex align-items-center">
              <input
                className="form-control form-control-sm"
                placeholder={`Reply to ${authorName}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleReply();
                  }
                }}
              />
              <button
                className="btn btn-sm btn-primary ms-2"
                onClick={handleReply}
                disabled={submittingReply || !replyText.trim()}
              >
                {submittingReply ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  "Reply"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <LikedByModal
        id={comment.id}
        type="comment"
        show={showLikedBy}
        onClose={() => setShowLikedBy(false)}
      />
    </div>
  );
};

export default CommentItem;
