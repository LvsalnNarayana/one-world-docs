const Single = "Single" as const;
const Married = "Married" as const;
const Divorced = "Divorced" as const;
const Widowed = "Widowed" as const;
const Separated = "Separated" as const;
const Complicated = "Complicated" as const;
export type RelationshipStatus =
  | typeof Single
  | typeof Married
  | typeof Divorced
  | typeof Widowed
  | typeof Separated
  | typeof Complicated;

export const RELATIONSHIP_OPTIONS = [
  { label: "Single", value: "single" as const },
  { label: "In a relationship", value: "relationship" as const },
  { label: "Married", value: "married" as const },
  { label: "Divorced", value: "divorced" as const },
  { label: "Widowed", value: "widowed" as const },
  { label: "It's complicated", value: "complicated" as const },
];
