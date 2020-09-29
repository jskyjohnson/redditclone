import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
  const intId = useGetIntId();
  return usePostQuery({
    pause: intId === -1, //pause query if bad request ID
    variables: {
      id: intId,
    },
  });
};
