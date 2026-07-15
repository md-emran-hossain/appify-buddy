"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { commentsApi } from "@/lib/api";
import type { Comment } from "@/types";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
  postId: string;
  commentCount: number;
  showInput?: boolean;
}

const CommentSection = ({
  postId,
  commentCount,
  showInput = false,
}: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(
    async (c?: string) => {
      try {
        const data = await commentsApi.list(postId, { limit: 10, cursor: c });
        if (c) {
          setComments((prev) => [...prev, ...data.items]);
        } else {
          setComments(data.items);
        }
        setCursor(data.nextCursor);
      } catch {
        // silently fail
      }
    },
    [postId],
  );

  const loadComments = async () => {
    if (loaded) return;
    setLoading(true);
    await fetchComments();
    setLoaded(true);
    setLoading(false);
  };

  const loadMore = async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    await fetchComments(cursor);
    setLoadingMore(false);
  };

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const res = await commentsApi.create(postId, {
        text: commentText.trim(),
      });
      const comment = (res.comment ?? res) as Comment;
      setComments((prev) => [comment, ...prev]);
      setLoaded(true);
      setCommentText("");
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplyCreated = (parentIdx: number) => {
    setComments((prev) =>
      prev.map((c, i) =>
        i === parentIdx ? { ...c, replyCount: c.replyCount + 1 } : c,
      ),
    );
  };

  return (
    <>
      {commentCount > 0 && !loaded && (
        <button className="btn btn-sm text-muted mb-2" onClick={loadComments}>
          {loading
            ? "Loading..."
            : `View ${commentCount} comment${commentCount !== 1 ? "s" : ""}`}
        </button>
      )}

      {loaded && (
        <>
          {comments.map((comment, idx) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplyCreated={() => handleReplyCreated(idx)}
            />
          ))}

          {cursor && (
            <button
              className="btn btn-sm text-muted mb-2"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load more comments"}
            </button>
          )}
        </>
      )}

      {showInput && (
        <CommentInlineInput
          commentText={commentText}
          setCommentText={setCommentText}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </>
  );
};

function CommentInlineInput({
  commentText,
  setCommentText,
  onSubmit,
  submitting,
}: {
  commentText: string;
  setCommentText: (v: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  return (
    <div className="bg-theme-comment-box rounded-pill px-2 py-2">
      <div className="d-flex align-items-center justify-content-between flex-nowrap">
        <div className="d-flex align-items-center flex-grow-1">
          <div className="me-2 flex-shrink-0">
            <Image
              width={32}
              height={32}
              src="/assets/images/comment_img.png"
              alt="User"
              className="avatar object-fit-cover"
            />
          </div>
          <div className="position-relative flex-grow-1">
            <input
              className="form-control border-0 bg-transparent shadow-none p-0 ps-2"
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-sm btn-primary ms-2 rounded-pill px-3"
          onClick={onSubmit}
          disabled={submitting || !commentText.trim()}
        >
          {submitting ? (
            <span className="spinner-border spinner-border-sm" />
          ) : (
            "Comment"
          )}
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
