const SESSION_STORAGE_KEY = "owdocs_session_id";

function createSessionId(): string {
  // Simple random id; real API can replace this with server-issued id
  return crypto.randomUUID();
}

export function getOrCreateEditorSessionId(): string {
  if (typeof window === "undefined") return "server-session";
  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
    const next = createSessionId();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, next);
    return next;
  } catch {
    // Fallback if sessionStorage is unavailable
    return createSessionId();
  }
}

