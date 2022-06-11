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
    }),
  });

export const withApollo = createWithApollo(createClient);