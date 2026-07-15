"use client";

import { useState, useEffect, useCallback } from "react";
import StoryCarousel from "@/components/feed/StoryCarousel";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import { postsApi } from "@/lib/api";
import type { FeedPost } from "@/types";

const MiddleFeed = () => {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchFeed = useCallback(async (c?: string) => {
    try {
      const data = await postsApi.feed({ limit: 20, cursor: c });
      if (c) {
        setPosts((prev) => [...prev, ...data.items]);
      } else {
        setPosts(data.items);
      }
      setCursor(data.nextCursor);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feed");
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      await fetchFeed();
      if (!cancelled) setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, [fetchFeed]);

  const loadMore = async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    await fetchFeed(cursor);
    setLoadingMore(false);
  };

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <div
        className="d-flex flex-column overflow-y-auto pt-2 m-0"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="d-flex flex-column flex-grow-1 pt-2">
          <StoryCarousel />
          <CreatePost onCreated={(post) => setPosts((prev) => [post, ...prev])} />

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-muted small mb-2">{error}</p>
              <button className="btn btn-sm btn-outline-primary" onClick={() => { setError(null); setLoading(true); fetchFeed().finally(() => setLoading(false)); }}>
                Retry
              </button>
            </div>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onDeleted={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))} />
              ))}

              {cursor && (
                <div className="text-center py-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={loadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}

              {posts.length === 0 && (
                <div className="text-center text-muted py-5">
                  <p>No posts yet. Be the first to post!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiddleFeed;
