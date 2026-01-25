
import { Chat, Message, User, Community, Channel, Status, Reel } from '../types';

const STORAGE_KEYS = {
  CHATS: 'wa_clone_chats',
  USER: 'wa_clone_user',
};

export const mockCommunities: Community[] = [
  { id: 'c1', name: 'Fitness Enthusiasts', avatar: 'https://i.pravatar.cc/150?u=fit', description: 'Everything about gym and nutrition.' },
  { id: 'c2', name: 'Neighborhood Watch', avatar: 'https://i.pravatar.cc/150?u=home', description: 'Stay safe and informed in our area.' }
];

export const mockChannels: Channel[] = [
  { id: 'ch1', name: 'Netflix', avatar: 'https://i.pravatar.cc/150?u=netflix', followers: '32.5M', verified: true },
  { id: 'ch2', name: 'Real Madrid C.F.', avatar: 'https://i.pravatar.cc/150?u=realmadrid', followers: '15.2M', verified: true },
  { id: 'ch3', name: 'WhatsApp', avatar: 'https://i.pravatar.cc/150?u=wa', followers: '100M', verified: true }
];

export const mockStatuses: Status[] = [
  { id: 's1', userName: 'My Status', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&h=150&fit=crop', time: 'Tap to add status update', isSeen: false },
  { id: 's2', userName: 'Brooklyn Simmons', avatar: 'https://i.pravatar.cc/150?u=brooklyn', time: '52 minutes ago', isSeen: false },
  { id: 's3', userName: 'Darrell Steward', avatar: 'https://i.pravatar.cc/150?u=darrell', time: '2 hours ago', isSeen: true }
];

export const mockReels: Reel[] = [
  {
    id: 'r1',
    videoUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60',
    userName: 'gym_beast',
    userAvatar: 'https://i.pravatar.cc/150?u=gymbeast',
    caption: 'Pushing limits today! 🏋️‍♂️ #fitness #motivation',
    likes: '12.4K',
    comments: '450'
  },
  {
    id: 'r2',
    videoUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&auto=format&fit=crop&q=60',
    userName: 'fit_mostafa',
    userAvatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&h=150&fit=crop',
    caption: 'Best pre-workout meal! 🥗 #healthylifestyle',
    likes: '8.2K',
    comments: '210'
  },
  {
    id: 'r3',
    videoUrl: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=800&auto=format&fit=crop&q=60',
    userName: 'travel_vibes',
    userAvatar: 'https://i.pravatar.cc/150?u=travel',
    caption: 'Morning jog with this view. 🌅 #cardio',
    likes: '15.9K',
    comments: '890'
  }
];

const DEFAULT_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Brooklyn Simmons',
    avatar: 'https://i.pravatar.cc/150?u=brooklyn',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm1', text: 'Photo', senderId: '1', timestamp: '10:53 AM', status: 'read' }
    ],
    type: 'contact',
    lastMessage: 'Photo',
    lastTimestamp: '10:53 AM'
  },
  {
    id: '2',
    name: 'Robert Fox',
    avatar: 'https://i.pravatar.cc/150?u=robert',
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: 'm2', text: "I'll see you in a bit", senderId: '2', timestamp: '10:53 AM', status: 'delivered' }
    ],
    type: 'contact',
    lastMessage: "I'll see you in a bit",
    lastTimestamp: '10:53 AM'
  },
  {
    id: '3',
    name: 'Darrell Steward',
    avatar: 'https://i.pravatar.cc/150?u=darrell',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm3', text: "I'll see you in a bit", senderId: '3', timestamp: '10:53 AM', status: 'read' }
    ],
    type: 'contact',
    lastMessage: "I'll see you in a bit",
    lastTimestamp: '10:53 AM'
  },
  {
    id: '4',
    name: 'Ronald Richards',
    avatar: 'https://i.pravatar.cc/150?u=ronald',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm4', text: "I'll see you in a bit", senderId: '4', timestamp: '10:53 AM', status: 'read' }
    ],
    type: 'contact',
    lastMessage: "I'll see you in a bit",
    lastTimestamp: '10:53 AM'
  },
  {
    id: '5',
    name: 'Marvin McKinney',
    avatar: 'https://i.pravatar.cc/150?u=marvin',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm5', text: "see you in a bit", senderId: '5', timestamp: '10:53 AM', status: 'read' }
    ],
    type: 'contact',
    lastMessage: "see you in a bit",
    lastTimestamp: '10:53 AM'
  },
  {
    id: 'ai-meta',
    name: 'Meta AI',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    unreadCount: 0,
    isOnline: true,
    messages: [],
    type: 'ai',
    lastMessage: 'Ask me anything!'
  }
];

export const storageService = {
  getChats: (): Chat[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHATS);
    return data ? JSON.parse(data) : DEFAULT_CHATS;
  },

  saveChats: (chats: Chat[]) => {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
  },

  getUser: (): User => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (data) return JSON.parse(data);
    
    const defaultUser: User = {
      id: 'me',
      name: 'Mostafa',
      status: 'Available',
      avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&h=150&fit=crop',
      stats: {
        streak: 5,
        totalWorkouts: 24,
        totalVolume: 85000
      }
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
    return defaultUser;
  },

  getGlobalStats: () => {
    return {
      totalUsers: 12450,
      globalVolume: 4500000,
      popularExercise: 'Bench Press'
    };
  }
};
