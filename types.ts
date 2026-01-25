
export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastTimestamp?: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
  type: 'contact' | 'ai' | 'group';
}

export interface User {
  id: string;
  name: string;
  status: string;
  avatar: string;
  stats: {
    streak: number;
    totalWorkouts: number;
    totalVolume: number;
  };
}

export enum AppTab {
  COMMUNITIES = 'communities',
  CHATS = 'chats',
  UPDATES = 'updates',
  REELS = 'reels',
  CALLS = 'calls',
  MAP = 'map'
}

export interface Community {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  followers: string;
  verified: boolean;
}

export interface Status {
  id: string;
  userName: string;
  avatar: string;
  time: string;
  isSeen: boolean;
}

export interface Reel {
  id: string;
  videoUrl: string;
  userName: string;
  userAvatar: string;
  caption: string;
  likes: string;
  comments: string;
}

export interface Set {
  reps: number;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  type: string;
  sets: Set[];
  date: string;
  notes?: string;
}

export interface WorkoutHistory {
  date: string;
  totalVolume: number;
}
