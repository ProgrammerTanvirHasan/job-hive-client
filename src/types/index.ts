
export type UserRole = "USER" | "RECRUITER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;

  emailVerified: boolean;

  status: "ACTIVE" | "INACTIVE" | "BANNED";

  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type Job = {
  company: string;
  description: string;
};
