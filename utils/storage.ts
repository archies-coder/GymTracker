import { BACKEND_URL } from "@/consts";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

type Session = {
  [key: string]: any;
};

export const saveSession = (session: Session) => {
  const sessions = getSessions();
  sessions.push({ ...session, synced: false });
  storage.set("sessions", JSON.stringify(sessions));
};

export const syncData = async () => {
  const sessions = getSessions();
  const unsyncedSessions = sessions.filter(
    (session: Session) => !session.synced
  );

  for (const session of unsyncedSessions) {
    try {
      // POST session to backend
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });

      if (response.ok) {
        // Mark session as synced
        session.synced = true;
      }
    } catch (error) {
      console.error("Failed to sync session:", session, error);
    }
  }

  // Save updated sessions back to MMKV
  storage.set("sessions", JSON.stringify(sessions));
};

/**
 * Retrieve all sessions
 * @returns {Array} List of sessions
 */
function getSessions() {
  return JSON.parse(storage.getString("sessions") || "[]");
}
