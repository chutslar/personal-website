type PrayerRecord = {
  name: string;
  text: string;
};

export function prayerRecord(name: string, text: string): PrayerRecord {
  return {
    name,
    text,
  };
}

export default PrayerRecord;
