// Parent, Sibling, Index
import type { User } from "../user/user.types";

export interface MeetingRoom {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  participants: number;
  isActive: boolean;
}
export type MeetingUser = Pick<
  User,
  "id" | "username" | "firstName" | "lastName"
>;

export interface MeetDashboardState {
  roomId: string;
  isCreatingMeeting: boolean;
  isJoiningMeeting: boolean;
  error: string | null;
  recentMeetings: MeetingRoom[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isHost: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  joinedAt: Date;
  connectionStatus: "connected" | "connecting" | "disconnected";
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: "text" | "system";
}

export interface MeetingSettings {
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  isChatOpen: boolean;
  isParticipantsOpen: boolean;
  isFullScreen: boolean;
  layout: "grid" | "spotlight" | "sidebar";
  backgroundBlur: boolean;
}

export interface MeetingInfo {
  id: string;
  title: string;
  startTime: Date;
  duration: number;
  hostId: string;
  isRecording: boolean;
  recordingUrl?: string;
}
