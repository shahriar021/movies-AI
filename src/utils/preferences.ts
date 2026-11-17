import type { LibraryState } from "../redux/slice/librarySlice";

// Per-user data stored in this browser: favourite genres, watch later, recently viewed.
const genresKey = (uid: string) => `moviesai:genres:${uid}`;
const libraryKey = (uid: string) => `moviesai:library:${uid}`;
const PENDING = "moviesai:genres:pending";

/** Saved right before the account is created, because the uid doesn't exist yet. */
export function savePendingGenres(genres: number[]) {
  try {
    localStorage.setItem(PENDING, JSON.stringify(genres));
  } catch {}
}

export function clearPendingGenres() {
  try {
    localStorage.removeItem(PENDING);
  } catch {}
}

export function loadGenres(uid: string): number[] {
  try {
    let raw = localStorage.getItem(genresKey(uid));
    if (!raw) {
      // First login after sign-up: attach the pending picks to this user
      raw = localStorage.getItem(PENDING);
      if (raw) {
        localStorage.setItem(genresKey(uid), raw);
        localStorage.removeItem(PENDING);
      }
    }
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadLibrary(uid: string): LibraryState {
  try {
    const parsed = JSON.parse(localStorage.getItem(libraryKey(uid)) || "{}");
    return {
      watchLater: Array.isArray(parsed.watchLater) ? parsed.watchLater : [],
      recent: Array.isArray(parsed.recent) ? parsed.recent : [],
    };
  } catch {
    return { watchLater: [], recent: [] };
  }
}

export function saveLibrary(uid: string, library: LibraryState) {
  try {
    localStorage.setItem(libraryKey(uid), JSON.stringify(library));
  } catch {}
}
