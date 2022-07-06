import { ReminderType } from "@utils/reminders";
import Store from "electron-store";

export interface PreferencesProps {
  reminders: Record<ReminderType, { frequency: number }>;
}

const defaults: Readonly<PreferencesProps> = {
  reminders: {
    eyes: { frequency: 18 * 1000 },
    fingers: { frequency: 38 * 1000 },
    arms: { frequency: 50 * 1000 },
    legs: { frequency: 60 * 1000 },
    neck: { frequency: 45 * 1000 },
    water: { frequency: 33 * 1000 },
    posture: { frequency: 27 * 1000 },
    breath: { frequency: 22 * 1000 },
  },
};

const Preferences = new Store<PreferencesProps>({ defaults });

export default Preferences;
