import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "src/generated/graphql";

export const useIsAuth = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.push("/login?next=" + router.pathname);
    }
  }, [data, loading]);
};


export const notAuth = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  useEffect(() => {
    if (!loading && data?.me) {
      router.push("/catalog");
    }
  }, [data, loading]);
};
