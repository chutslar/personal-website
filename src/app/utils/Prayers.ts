import PrayerRecord, { prayerRecord } from "../types/PrayerRecord";

const sign_cross = "The Sign of the Cross";
const sign_cross_text = "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.";

const apostles_creed = "The Apostles' Creed";
const apostles_creed_text = `I believe in God,
the Father almighty,
Creator of heaven and earth,
and in Jesus Christ, his only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
he descended into hell;
on the third day he rose again from the dead;
he ascended into heaven,
and is seated at the right hand of God the Father almighty;
from there he will come to judge the living and the dead.
I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting.
Amen.`;

const our_father = "Our Father";
const our_father_text = `Our Father, Who art in heaven,
Hallowed be Thy Name.
Thy Kingdom come.
Thy Will be done,
on earth as it is in Heaven.
Give us this day our daily bread.
And forgive us our trespasses,
as we forgive those who trespass against us.
And lead us not into temptation,
but deliver us from evil.
Amen.`;

const hail_mary = "Hail Mary";
const hail_mary_text = `Hail, Mary, full of grace,
the Lord is with thee.
Blessed art thou amongst women
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.
Amen.`;

const glory_be = "Glory Be";
const glory_be_text = `Glory be to the Father, and to the Son, and to the Holy Spirit;
as it was in the beginning, is now, and ever shall be,
world without end.
Amen.`;

const fatima_prayer = "The Fatima Prayer";
const fatima_prayer_text = "O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to Heaven, especially those in most need of Thy mercy.";

const hail_holy_queen = "Hail, Holy Queen";
const hail_holy_queen_text = `Hail Holy Queen, Mother of mercy,
Our life, our sweetness, and our hope.
To thee do we cry, poor banished children of Eve;
to thee do we send up our sighs,
mourning and weeping in this valley of tears.
Turn then, most gracious advocate,
thine eyes of mercy toward us.
And after this, our exile,
show unto us the blessed fruit of thy womb, Jesus.
O clement O loving O sweet Virgin Mary.
Pray for us oh holy mother of God,
that we may be made worthy of the promises of Christ.
Amen.`;

const concluding_prayer = "Concluding Prayer";
const concluding_prayer_text = `Let us pray.
O God, whose only begotten Son, by His life, death, and Resurrection,
has purchased for us the rewards of eternal salvation.
Grant, we beseech Thee,
that while meditating on these mysteries of the most holy Rosary of the Blessed Virgin Mary,
we may imitate what they contain
and obtain what they promise, through Christ our Lord.
Amen.`;

const signOfTheCross = prayerRecord(sign_cross, sign_cross_text);
const apostlesCreed = prayerRecord(apostles_creed, apostles_creed_text);
const ourFather = prayerRecord(our_father, our_father_text);
const gloryBe = prayerRecord(glory_be, glory_be_text);
const fatimaPrayer = prayerRecord(fatima_prayer, fatima_prayer_text);
const hailHolyQueen = prayerRecord(hail_holy_queen, hail_holy_queen_text);
const concludingPrayer = prayerRecord(concluding_prayer, concluding_prayer_text);
const mysteryPrayers = [
  [ourFather],
  Array.from(Array(10).keys()).map(i => hailMary(i)),
  [gloryBe, fatimaPrayer]
].flat();
export const fullRosary: PrayerRecord[][] = [
  [
    signOfTheCross,
    apostlesCreed,
    ourFather,
    hailMary(0),
    hailMary(1),
    hailMary(2),
    gloryBe
  ],
  mysteryPrayers,
  mysteryPrayers,
  mysteryPrayers,
  mysteryPrayers,
  mysteryPrayers,
  [
    hailHolyQueen,
    concludingPrayer
  ]
];


function hailMary(i: number): PrayerRecord {
  return prayerRecord(`${hail_mary} (${i + 1})`, hail_mary_text);
}

export function getTotalPrayerIndex(mysteryIndex: number, prayerIndex: number): number {
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