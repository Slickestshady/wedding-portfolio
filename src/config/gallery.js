/**
 * gallery.js — the single source of truth for the portfolio.
 *
 * HOW IMAGE SWAPPING WORKS (the "one-line change"):
 * Each collection below auto-imports every image inside its folder via
 * Vite's import.meta.glob. To use real photos, just copy them into
 *   src/assets/gallery/folder1 ... folder4
 * (jpg / jpeg / png / webp), rebuild, and they appear — in filename order,
 * so name them 01.jpg, 02.jpg, ... to preserve the Instagram order.
 * No code changes needed. While a folder is empty, that shoot renders
 * elegant placeholder frames instead (see placeholderPlan below).
 *
 * To rename a shoot or change its cover caption, edit `title` / `caption`.
 */

// Eagerly import whatever is in each folder at build time.
// (import.meta.glob paths must be static strings — hence four calls.)
const folders = [
  import.meta.glob("../assets/gallery/folder1/*.{jpg,jpeg,png,webp}", { eager: true }),
  import.meta.glob("../assets/gallery/folder2/*.{jpg,jpeg,png,webp}", { eager: true }),
  import.meta.glob("../assets/gallery/folder3/*.{jpg,jpeg,png,webp}", { eager: true }),
  import.meta.glob("../assets/gallery/folder4/*.{jpg,jpeg,png,webp}", { eager: true }),
];

/** Turn a glob result into a sorted array of { src, alt } objects. */
function toImages(globResult, shootTitle) {
  return Object.keys(globResult)
    .sort() // filename order == the order you saved them in
    .map((path, i) => ({
      src: globResult[path].default,
      alt: `${shootTitle} — photograph ${i + 1}`,
    }));
}

/**
 * Placeholder plan: while folders are empty, each shoot shows this many
 * frames in these aspect ratios (w/h), so the layout can be validated
 * with a realistic mix of portrait and landscape images.
 */
const placeholderPlan = [3 / 2, 2 / 3, 3 / 2, 4 / 5, 3 / 2, 2 / 3, 5 / 4, 2 / 3];

/** Editorial titles for the four shoots — rename to match his real events. */
const meta = [
  { title: "Mahnoor & Daniyal", caption: "A winter baraat in Lahore" },
  { title: "Zoya & Hamza", caption: "Garden nikkah, Islamabad" },
  { title: "Eshal & Rayyan", caption: "Mehndi by lamplight" },
  { title: "Anaya & Shahmir", caption: "Walima at the old haveli" },
];

export const collections = meta.map((m, i) => {
  const images = toImages(folders[i], m.title);
  return {
    id: `shoot-${i + 1}`,
    index: i + 1,
    title: m.title,
    caption: m.caption,
    images,                          // real images when the folder has files
    placeholders: images.length ? [] : placeholderPlan, // otherwise, frames
  };
});
