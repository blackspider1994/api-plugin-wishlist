import pkg from "../package.json";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";
import _ from "lodash";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutations.js";
import Subscription from "./resolvers/Subscription.js";
const mySchema = importAsString("./schema.graphql");

var _context = null;

const resolvers = {
  Query,
  Mutation,
  Subscription
 
};

function StartUp(context) {
  _context = context;
  const { app, collections, rootUrl } = context;
  // context.simpleSchemas.Profile.extend({
    
  //   slug: {
  //     type: String,
  //     optional: true,
  //   },
  // });
}

/**
 *
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "bidding",
    name: "bidding",
    version: pkg.version,
    //to create new collection
    // collections: {
    //   CollectionName Here: {
    //     name: "CollectionName Here",
    //     updatedAt: { type: Date, default: Date.now },
    //     createdAt: { type: Date, default: Date.now },
    //     indexes: [
    //       // Create indexes. We set specific names for backwards compatibility
    //       // with indexes created by the aldeed:schema-index Meteor package.
    //       
    //     ],
    //   },
    // },
    functionsByType: {
      startup: [StartUp],
    },
    graphQL: {
      schemas: [mySchema],
      resolvers,
    },
  });
}
