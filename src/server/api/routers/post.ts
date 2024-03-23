import { z } from "zod";
import { faker, fakerEN } from "@faker-js/faker";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface post {
  id: string;
  name: string;
  selected: boolean;
}

let posts: post[] = Array.from({ length: 100 }, (_, i) => ({
  id: faker.database.mongodbObjectId(),
  name: faker.commerce.department(),
  selected: Math.random() < 0.5,
}));

export const postRouter = createTRPCRouter({
  getCategories: publicProcedure.query(() => {
    return posts;
  }),
});
