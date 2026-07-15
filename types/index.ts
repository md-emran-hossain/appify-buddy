import React from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

export interface Post {
  id: string;
  author: User;
  timeAgo: string;
  privacy: "Public" | "Friends" | "Private";
  postText?: string;
  postImage?: string;
  reactCount: number;
  commentCount: number;
  shareCount: number;
}

export interface FeedPost {
  id: string;
  text: string | null;
  imageUrl: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  likedByPreview: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  }[];
}

export interface Comment {
  id: string;
  postId: string;
  parentId: string | null;
  text: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  likeCount: number;
  replyCount: number;
  likedByMe: boolean;
  likedByPreview: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  }[];
}

export interface Story {
  id: string;
  authorName: string;
  storyImage: string;
  authorMiniImage?: string;
  isUserStory?: boolean;
  isActive?: boolean;
}

export interface SuggestedPerson {
  id: number | string;
  name: string;
  title: string;
  image: string;
}

export interface Friend {
  id: number | string;
  name: string;
  title?: string;
  image: string;
  active: boolean;
  time?: string | null;
}

export interface EventReminder {
  id: number | string;
  dateDay: string;
  dateMonth: string;
  title: string;
  image: string;
  peopleGoing: number;
}

export interface NotificationItem {
  id: number | string;
  image: string;
  userName: string;
  actionText: string;
  targetName?: string;
  time: string;
}

export interface ToolbarButton {
  label: string;
  icon: React.ReactNode;
}
