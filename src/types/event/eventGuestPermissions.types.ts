// Guest permissions and status

// External
import { faker } from "@faker-js/faker";

export interface EventGuestPermissions {
  canModify: boolean;
  canInviteOthers: boolean;
  canSeeGuestList: boolean;
  canAddAttachments: boolean;
  canViewAttachments: boolean;
}

export const generateEventGuestPermissions = (): EventGuestPermissions => {
  return {
    canModify: faker.datatype.boolean(),
    canInviteOthers: faker.datatype.boolean(),
    canSeeGuestList: faker.datatype.boolean(),
    canAddAttachments: faker.datatype.boolean(),
    canViewAttachments: faker.datatype.boolean(),
  };
};
