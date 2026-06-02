// Parent, Sibling, Index
import type { Event } from "../event/event.types";
import type { Place } from "../place/place.types";
import type { PollData } from "../post/poll.types";
import type { Feeling } from "../base/feelings.type";
import type { PostPrivacy } from "../post/post.enums";
import type { PostMedia } from "../post/postMedia.types";
import type { Visibility } from "../base/visibility.types";
import type {
  PostUserInterface,
  PostAuthorInterface,
} from "../post/postUser.types";

export type PostScreen = "draft" | "location" | "tags" | "feelings";
export interface CreatePostInterface {
  visibility: Visibility;

  content: {
    text?: string;
    media: Omit<PostMedia, "id">[];
    poll?: PollData;
    event?: Event;
    link?: {
      url: string;
      title?: string;
      description?: string;
      image?: string;
      domain: string;
    };
  };

  feeling: {
    feeling: Feeling | "";
    image: string;
  };

  publishing: {
    privacy: PostPrivacy;
    allowed_users: string[];
    excluded_users: string[];
    allow_comments: boolean;
    allow_reactions: boolean;
    allow_sharing: boolean;
  };

  timeline?: {
    is_wall_post: boolean;
    timeline_owner_id?: string;
    timeline_owner?: PostUserInterface;
  };

  metadata: {
    hashtags: string[];
    location?: Omit<Place, "id" | "createdAt" | "updatedAt" | "isActive">;
    tagged_users: PostUserInterface[];
    mentioned_users: PostUserInterface[];
    language: string;
    content_warning?: string;
  };

  author: PostAuthorInterface;

  ui_state: {
    is_draft: boolean;
    show_preview: boolean;
    uploading_media: boolean;
    media_upload_progress: number;
    create_post_screen: PostScreen;
    show_create_post_dialog: boolean;
  };
  media: Omit<PostMedia, "id">[];
}
export interface CreatePostBuilderActions {
  setVisibility(visibility: Visibility): void;

  setText(text: string): void;
  addMedia(media: Omit<PostMedia, "id">[]): void;
  removeMedia(index: number): void;
  setPoll(poll: PollData): void;
  setEvent(event: Event): void;
  setLink(link: {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    domain: string;
  }): void;

  setFeeling(feelingItem: { feeling: Feeling; image: string }): void;

  setPrivacy(privacy: PostPrivacy): void;
  setAllowedUsers(users: string[]): void;
  setExcludedUsers(users: string[]): void;
  toggleAllowComments(allow: boolean): void;
  toggleAllowReactions(allow: boolean): void;
  toggleAllowSharing(allow: boolean): void;

  setWallPost(isWallPost: boolean): void;
  setTimelineOwner(owner: PostUserInterface): void;

  setHashtags(hashtags: string[]): void;
  setLocation(
    location: Omit<Place, "id" | "createdAt" | "updatedAt" | "isActive">
  ): void;
  setTaggedUsers(users: PostUserInterface[]): void;
  setMentionedUsers(users: PostUserInterface[]): void;
  setLanguage(language: string): void;
  setContentWarning(warning: string): void;

  setAuthor(author: PostAuthorInterface): void;

  setDraftState(isDraft: boolean): void;
  setShowPreview(show: boolean): void;
  setUploadingMediaState(uploading: boolean): void;
  setMediaUploadProgress(progress: number): void;
  setCreatePostScreen(screen: PostScreen): void;
  setShowCreatePostDialog(show: boolean): void;

  reset(): void;
  build?(): CreatePostInterface;
}
