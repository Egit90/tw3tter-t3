/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "y/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        user: true,
      },
      take: 100,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const post = await ctx.prisma.post.create({
        data: {
          userId,
          content: input.content,
        },
      });

      return post;
    }),
});
