import type { Edition } from "@/lib/types";
import genesis from "@/data/genesis";
import amos from "@/data/amos";

// The registry of Verbum editions. Add a book by importing its Edition and
// listing it here; the landing page and the [edition] route read from this.
export const EDITIONS: Edition[] = [genesis, amos];

export function editionBySlug(slug: string): Edition | undefined {
  return EDITIONS.find((e) => e.slug === slug);
}
