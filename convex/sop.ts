import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get Statement of Purpose purely from the database
export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("sop").first();
  }
});

// Mutation: Update SOP
export const update = mutation({
  args: {
    content: v.string()
  },
  handler: async (ctx, args) => {
    const sop = await ctx.db.query("sop").first();
    if (sop) {
      await ctx.db.patch(sop._id, { content: args.content });
      return sop._id;
    } else {
      return await ctx.db.insert("sop", { content: args.content });
    }
  }
});
