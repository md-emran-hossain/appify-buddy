"use client";

import { useState, useCallback } from "react";
import { postsApi, commentsApi } from "@/lib/api";
import type { User } from "@/types";

interface LikedByModalProps {
  id: string;
  type: "post" | "comment";
  show: boolean;
  onClose: () => void;
}

const LikedByModal = ({ id, type, show, onClose }: LikedByModalProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchLikes = useCallback(
    async (c?: string) => {
      try {
        const data =
          type === "post"
            ? await postsApi.likes(id, { limit: 20, cursor: c })
            : await commentsApi.likes(id, { limit: 20, cursor: c });
        if (c) {
          setUsers((prev) => [...prev, ...data.items]);
        } else {
          setUsers(data.items);
        }
        setCursor(data.nextCursor);
      } catch {
        // silently fail
      }
    },
    [id, type]
  );

  const handleOpen = async () => {
    if (fetched) return;
    setLoading(true);
    await fetchLikes();
    setFetched(true);
    setLoading(false);
  };

  const handleClose = () => {
    setUsers([]);
    setCursor(null);
    setFetched(false);
    onClose();
  };

  const loadMore = async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    await fetchLikes(cursor);
    setLoadingMore(false);
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        onClick={handleClose}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
          ref={(el) => {
            if (el && !fetched) handleOpen();
          }}
        >
          <div className="modal-content bg-theme-card border-0 rounded-4">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-semibold">Liked</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              />
            </div>
            <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : users.length === 0 ? (
                <p className="text-center text-muted py-4 mb-0">No likes yet</p>
              ) : (
                <>
                  {users.map((user) => (
                    <div key={user.id} className="d-flex align-items-center py-2">
                      <div className="flex-shrink-0 me-3">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="avatar object-fit-cover rounded-circle"
                            style={{ width: 40, height: 40 }}
                          />
                        ) : (
                          <div
                            className="avatar bg-primary text-white d-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: 40, height: 40, fontSize: 14 }}
                          >
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-medium text-body small">{user.firstName} {user.lastName}</span>
                      </div>
                    </div>
                  ))}
                  {cursor && (
                    <div className="text-center py-2">
                      <button
                        className="btn btn-link btn-sm"
                        onClick={loadMore}
                        disabled={loadingMore}
                      >
                        {loadingMore ? "Loading..." : "Load more"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LikedByModal;
