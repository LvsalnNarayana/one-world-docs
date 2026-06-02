// Parent, Sibling, Index
import { type Visibility, VISIBILITY_OPTIONS } from "../base/visibility.types";

export interface PrivacySettings {
  profileVisibility: Visibility;
  messagePrivacy: Visibility;
  timelinePostPrivacy: Visibility;
}

export const generatePrivacySettings = (): PrivacySettings => {
  return {
    messagePrivacy: VISIBILITY_OPTIONS?.map(
      (option) => option.value
    )[0] as Visibility,
    profileVisibility: VISIBILITY_OPTIONS?.map(
      (option) => option.value
    )[0] as Visibility,
    timelinePostPrivacy: VISIBILITY_OPTIONS?.map(
      (option) => option.value
    )[0] as Visibility,
  };
};
