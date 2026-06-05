import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: List all artifacts purely from the database
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("artifacts").collect();
  }
});

// Query: Get specific artifact by key
export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("artifacts")
      .filter((q) => q.eq(q.field("key"), args.key))
      .first();
  }
});

// Mutation: Update specific artifact elements
export const updateArtifact = mutation({
  args: {
    key: v.string(),
    title: v.string(),
    documentBody: v.string(),
    reviewer1Name: v.string(),
    reviewer1Date: v.string(),
    reviewer1Feedback: v.string(),
    reviewer2Name: v.string(),
    reviewer2Date: v.string(),
    reviewer2Feedback: v.string(),
    revisionNarrative: v.string()
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("artifacts")
      .filter((q) => q.eq(q.field("key"), args.key))
      .first();

    const { key, ...patchData } = args;
    if (existing) {
      await ctx.db.patch(existing._id, patchData);
      return existing._id;
    } else {
      return await ctx.db.insert("artifacts", args);
    }
  }
});
