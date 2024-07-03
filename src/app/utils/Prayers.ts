import PrayerRecord, { prayerRecord } from "../types/PrayerRecord";

const sign_cross = "The Sign of the Cross";
const sign_cross_text =
  "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.";

const apostles_creed = "The Apostles' Creed";
const apostles_creed_text = `I believe in God,<br/>
the Father almighty,<br/>
Creator of heaven and earth,<br/>
and in Jesus Christ, his only Son, our Lord,<br/>
who was conceived by the Holy Spirit,<br/>
born of the Virgin Mary,<br/>
suffered under Pontius Pilate,<br/>
was crucified, died and was buried;<br/>
he descended into hell;<br/>
on the third day he rose again from the dead;<br/>
he ascended into heaven,<br/>
and is seated at the right hand of God the Father almighty;<br/>
from there he will come to judge the living and the dead.<br/>
I believe in the Holy Spirit,<br/>
the holy catholic Church,<br/>
the communion of saints,<br/>
the forgiveness of sins,<br/>
the resurrection of the body,<br/>
and life everlasting.<br/>
Amen.`;

const our_father = "Our Father";
const our_father_text = `Our Father, Who art in heaven,<br/>
Hallowed be Thy Name.<br/>
Thy Kingdom come.<br/>
Thy Will be done,<br/>
on earth as it is in Heaven.<br/>
Give us this day our daily bread.<br/>
And forgive us our trespasses,<br/>
as we forgive those who trespass against us.<br/>
And lead us not into temptation,<br/>
but deliver us from evil.<br/>
Amen.`;

const hail_mary = "Hail Mary";
const hail_mary_text = `Hail, Mary, full of grace,<br/>
the Lord is with thee.<br/>
Blessed art thou amongst women<br/>
and blessed is the fruit of thy womb, Jesus.<br/>
Holy Mary, Mother of God,<br/>
pray for us sinners,<br/>
now and at the hour of our death.<br/>
Amen.`;

const glory_be = "Glory Be";
const glory_be_text = `Glory be to the Father, and to the Son, and to the Holy Spirit;<br/>
as it was in the beginning, is now, and ever shall be,<br/>
world without end.<br/>
Amen.`;

const fatima_prayer = "The Fatima Prayer";
const fatima_prayer_text =
  "O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to Heaven, especially those in most need of Thy mercy.";

const hail_holy_queen = "Hail, Holy Queen";
const hail_holy_queen_text = `Hail Holy Queen, Mother of mercy,<br/>
Our life, our sweetness, and our hope.<br/>
To thee do we cry, poor banished children of Eve;<br/>
to thee do we send up our sighs,<br/>
mourning and weeping in this valley of tears.<br/>
Turn then, most gracious advocate,<br/>
thine eyes of mercy toward us.<br/>
And after this, our exile,<br/>
show unto us the blessed fruit of thy womb, Jesus.<br/>
O clement O loving O sweet Virgin Mary.<br/>
Pray for us oh holy mother of God,<br/>
that we may be made worthy of the promises of Christ.<br/>
Amen.`;

const concluding_prayer = "Concluding Prayer";
const concluding_prayer_text = `Let us pray.<br/>
O God, whose only begotten Son, by His life, death, and Resurrection,<br/>
has purchased for us the rewards of eternal salvation.<br/>
Grant, we beseech Thee,<br/>
that while meditating on these mysteries of the most holy Rosary of the Blessed Virgin Mary,<br/>
we may imitate what they contain<br/>
and obtain what they promise, through Christ our Lord.<br/>
Amen.`;

const signOfTheCross = prayerRecord(sign_cross, sign_cross_text);
const apostlesCreed = prayerRecord(apostles_creed, apostles_creed_text);
const ourFather = prayerRecord(our_father, our_father_text);
const gloryBe = prayerRecord(glory_be, glory_be_text);
const fatimaPrayer = prayerRecord(fatima_prayer, fatima_prayer_text);
const hailHolyQueen = prayerRecord(hail_holy_queen, hail_holy_queen_text);
const concludingPrayer = prayerRecord(
  concluding_prayer,
  concluding_prayer_text,
);
const mysteryPrayers = [
  [ourFather],
  Array.from(Array(10).keys()).map((i) => hailMary(i)),
  [gloryBe, fatimaPrayer],
].flat();
export const fullRosary: PrayerRecord[][] = [
  [
    signOfTheCross,
    apostlesCreed,
    ourFather,
    hailMary(0),
    hailMary(1),
    hailMary(2),
    gloryBe,
  ],
  mysteryPrayers,
  mysteryPrayers,
  mysteryPrayers,
  mysteryPrayers,
  mysteryPrayers,
  [hailHolyQueen, concludingPrayer],
];

function hailMary(i: number): PrayerRecord {
  return prayerRecord(`${hail_mary} (${i + 1})`, hail_mary_text);
}

export function getTotalPrayerIndex(
  mysteryIndex: number,
  prayerIndex: number,
): number {
  if (mysteryIndex == 0) {
    return prayerIndex;
  } else if (mysteryIndex >= 1 && mysteryIndex <= 5) {
    return 7 + (mysteryIndex - 1) * 13 + prayerIndex;
  } else if (mysteryIndex == 6) {
    return 72 + prayerIndex;
  } else {
    // Should never happen
    return 74;
  }
}
