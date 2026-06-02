// Parent, Sibling, Index
import { generateMockUser } from "./MockUserData.script";

// Generate a user with specific properties
const customUser = generateMockUser({
  isActive: true,
  lastName: "Doe",
  isVerified: true,
  firstName: "John",
  username: "johndoe123",
  // Override any other properties as needed
});

console.log("Custom User:", customUser);

// Generate a user with specific email
export const userWithCustomEmail = generateMockUser({
  email: [
    {
      id: "custom-email-id",
      verified: true,
      primary: false,
      visibility: "public",
      email: "john.doe@company.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
});

console.log("User with Custom Email:", userWithCustomEmail);
