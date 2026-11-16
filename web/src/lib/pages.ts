import { tr, useT, type LanguageId, type UIKey } from "../i18n";
import type { Doc } from "./sanity";

/** Site pages: path (default language) + the UI key used for its name. */
export const pages = {
  home: { path: "/", label: "home" },
  portfolio: { path: "/portfolio", label: "portfolio" },
  contact: { path: "/contact", label: "contact" },
  course: { path: "/course", label: "course" },
  aiTool: { path: "/ai-tool", label: "aiTool" },
  // 404: the language switcher leads to the home page of each language
  notFound: { path: "/", label: "notFoundTitle" },
} as const satisfies Record<string, { path: string; label: UIKey }>;

export type PageKey = keyof typeof pages;

/**
 * Labels shown on the page-transition cover. Each one can be set in the dashboard
 * (Cài đặt chung → Chuyển trang, field siteSettings.transitionLabels.<key>);
 * an empty field falls back to the interface string with the same key.
 */
export const transitionKeys = ["home", "portfolio", "contact", "course", "aiTool", "workWithMe"] as const;
export type TransitionKey = (typeof transitionKeys)[number];

/** Label on the transition cover for a page (or the footer "Work with me" button). */
export const transitionLabel = (key: TransitionKey, lang: LanguageId, settings: Doc): string =>
  tr(settings?.transitionLabels?.[key], lang) || useT(lang)(key);

/** Label on the transition cover for an internal link, or undefined if the link is not a site page. */
export const transitionLabelFor = (href: string | undefined, lang: LanguageId, settings: Doc): string | undefined => {
  const key = transitionKeys.find((k) => k !== "workWithMe" && pages[k].path === href);
  return key ? transitionLabel(key, lang, settings) : undefined;
};
