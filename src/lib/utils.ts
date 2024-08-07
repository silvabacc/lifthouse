import getConfig from "@/config";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const { pageUrl } = getConfig();

export const redirectToHome = (router: AppRouterInstance) => {
  router.push(pageUrl);
};
