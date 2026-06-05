import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get user profile purely from the database
export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("profile").first();
  }
});

// Mutation: Update profile elements
export const update = mutation({
  args: {
    name: v.string(),
    tagline: v.string(),
    photoUrl: v.string(),
    email: v.string(),
    linkedin: v.string(),
    otherLinks: v.array(v.object({ label: v.string(), url: v.string() }))
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db.query("profile").first();
    if (profile) {
      await ctx.db.patch(profile._id, args);
      return profile._id;
    } else {
      return await ctx.db.insert("profile", args);
    }
  }
});
