/**
 * Image URL helper.
 * Paths mirror the WordPress uploads folder of the old site, e.g. "2025/05/Komatsu.png".
 * All originals are self-hosted in /public/images. Set VITE_IMG_BASE to serve them from a CDN instead.
 */
const BASE = (import.meta.env.VITE_IMG_BASE as string | undefined)?.replace(/\/$/, "") ?? "/images";

export const img = (path: string) => `${BASE}/${path.replace(/^\//, "")}`;
