import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { PaginatedPosts } from "../generated/graphql";
import { NextPageContext } from "next";
import { offsetLimitPagination } from "@apollo/client/utilities";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:4000/graphql" as string,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Section: {
          fields: {
            lessons: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
      //   typePolicies: {
      //     Query: {
      //       fields: {
      //           courses: offsetLimitPagination()
      //         posts: {
      //           keyArgs: [],
      //           merge(
      //             existing: PaginatedPosts | undefined,
      //             incoming: PaginatedPosts
      //           ): PaginatedPosts {
      //             return {
      //               ...incoming,
      //               posts: [...(existing?.posts || []), ...incoming.posts],
      //             };
      //           },
      //         },
      //   },
      // },
      //   },
    }),
  });

export const withApollo = createWithApollo(createClient);

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         YOUR_FIELD: {
//           // shorthand
//           merge: true,
//         },
//       },
//     },
//   },
// });
