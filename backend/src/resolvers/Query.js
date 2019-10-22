const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there is current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },

  async users(parent, args, ctx, info) {
    // Check if user is locked in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    // Check if the user has permission  to query all the users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    // If true then Query all the users
    return ctx.db.users({}, info);
  }
};

module.exports = Query;
