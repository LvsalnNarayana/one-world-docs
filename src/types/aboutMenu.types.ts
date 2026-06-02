// Parent, Sibling, Index
import type { Work } from "./user/work.types";
import type { Gender } from "./base/gender.types";
import type { Education } from "./user/education.types";
import type { Email, Phone } from "./user/userData.types";
import type { Place, UserPlace } from "./place/place.types";
import type { Birthdate, Relationship } from "./user/userInfo.types";

export type AboutMenuOptionType =
  | "overview"
  | "work_and_education"
  | "places"
  | "basic_info"
  | "lifeEvents";

export type AboutItemData =
  | Work
  | Education
  | Email
  | Phone
  | Gender
  | Birthdate
  | Relationship
  | UserPlace
  | Place
  | { userPlaceItem: UserPlace; placeItem?: Place };

export interface AboutItemProps {
  type: string;
  Icon: React.ElementType;
  data:
    | Work
    | Education
    | Email
    | Phone
    | Gender
    | Birthdate
    | Relationship
    | UserPlace
    | { userPlaceItem: UserPlace; placeItem?: Place };
}

export type AboutItemType =
  | "workplace"
  | "birthday"
  | "school"
  | "email"
  | "gender"
  | "phone"
  | "place"
  | "relationship";
