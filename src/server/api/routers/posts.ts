/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "y/server/api/trpc";
import { Account } from "@prisma/client";
import type { User } from "next-auth";
import { TRPCError } from "@trpc/server";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const users = (await ctx.prisma.user.findMany()).map(filterUserForClient);

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author Not Found",
        });

      return { post, author };
    });
  }),
});

const filterUserForClient = (user: User) => {
  return { id: user.id, image: user.image, name: user.name };
};
