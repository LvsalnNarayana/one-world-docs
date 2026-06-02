// External
import { faker } from "@faker-js/faker";

export interface AccountSettings {
  language: string;
  timezone: string;
  smsNotifications: boolean;
  emailNotifications: boolean;
  twoFactorEnabled: boolean;
}

export const generateAccountSettings = (): AccountSettings => {
  return {
    timezone: faker.location.timeZone(),
    language: faker.location.language().name,
    smsNotifications: faker.datatype.boolean(),
    twoFactorEnabled: faker.datatype.boolean(),
    emailNotifications: faker.datatype.boolean(),
  };
};
