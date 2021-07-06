import { createClient } from "contentful";

export const makeClient = () => {
  return createClient({
    space: process.env.NEXT_PUBLIC_REACT_APP_CONTENTFUL_SPACE || "none",
    accessToken: process.env.NEXT_PUBLIC_REACT_APP_CONTENTFUL_TOKEN || "token",
  });
};
