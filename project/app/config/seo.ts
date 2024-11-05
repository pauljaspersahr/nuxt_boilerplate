import { siteConfig } from "~/config/site";
import type { UseSeoMetaInput } from "@unhead/vue";

const seo: UseSeoMetaInput = {
  title: siteConfig.name,
  description: siteConfig.description,
  twitterCard: "summary_large_image",
};

export default seo;
