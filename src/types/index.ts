// export interface SessionResponse {
//   data: ApiResponse | null;
//   error: unknown;
// }
// export interface ApiResponse {
//   success: boolean;
//   data: {
//     id: string;
//     name: string;
//     email: string;
//     role: UserRole;
//     status: string;
//   };
// }
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
