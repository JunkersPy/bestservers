import { UserRole } from "@prisma/client";
import { Session } from "next-auth";

export function isMod(session?: Session | null): boolean {
    return session && (session.user.roles.includes(UserRole.ADMIN) || session.user.roles.includes(UserRole.MODERATOR));
}

export function isAdmin(session?: Session | null): boolean {
    return session && session.user.roles.includes(UserRole.ADMIN);
}