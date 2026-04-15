import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

const authUserSelect = {
  id: true,
  email: true,
  displayName: true,
  avatarUrl: true
} satisfies Prisma.UserSelect;

export type AuthUser = Prisma.UserGetPayload<{
  select: typeof authUserSelect;
}>;

export type UpsertGoogleUserInput = {
  email: string;
  displayName?: string | null;
  googleId: string;
  avatarUrl?: string | null;
};

export async function findUserById(id: string): Promise<AuthUser | null> {
  return prisma.user.findUnique({
    where: { id },
    select: authUserSelect
  });
}

export async function upsertGoogleUser(
  input: UpsertGoogleUserInput
): Promise<AuthUser> {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ googleId: input.googleId }, { email: input.email }]
    }
  });

  if (existingUser) {
    return prisma.user.update({
      where: { id: existingUser.id },
      data: {
        email: input.email,
        displayName: input.displayName,
        googleId: input.googleId,
        avatarUrl: input.avatarUrl
      },
      select: authUserSelect
    });
  }

  return prisma.user.create({
    data: {
      email: input.email,
      displayName: input.displayName,
      googleId: input.googleId,
      avatarUrl: input.avatarUrl
    },
    select: authUserSelect
  });
}
