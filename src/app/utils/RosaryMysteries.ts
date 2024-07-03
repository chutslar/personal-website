import OMysteryCategory from "../enums/OMysteryCategory";
import OMysteryName from "../enums/OMysteryName";
import { imageRecord } from "../types/ImageRecord";
import Mystery, { mystery } from "../types/Mystery";
import MysteryCategory from "../types/MysteryCategory";
import { isAdvent, isLent, startOfDay } from "./Dates";
import * as Assets from "../assets/index";
import dayjs from "dayjs";

export function getMysteryCategory(date: Date): MysteryCategory {
  switch (dayjs(date).day()) {
    // Sunday
    case 0: {
      const dayStart = startOfDay(date);
      if (isAdvent(dayStart)) {
        return OMysteryCategory.Joyful;
      }
      if (isLent(dayStart)) {
        return OMysteryCategory.Sorrowful;
      }
      return OMysteryCategory.Glorious;
    }
    // Monday
    case 1: {
      return OMysteryCategory.Joyful;
    }
    // Tuesday
    case 2: {
      return OMysteryCategory.Sorrowful;
    }
    // Wednesday
    case 3: {
      return OMysteryCategory.Glorious;
    }
    // Thursday
    case 4: {
      return OMysteryCategory.Luminous;
    }
    // Friday
    case 5: {
      return OMysteryCategory.Sorrowful;
    }
    // Saturday
    case 6: {
      return OMysteryCategory.Joyful;
    }
    // Should never happen:
    default: {
      return OMysteryCategory.Joyful;
    }
  }
}

export function getMysteries(mysteryCategory: MysteryCategory): Mystery[] {
  const mysteries: Mystery[] = [];
  mysteries.push(
    mystery(
      OMysteryName.OpeningPrayers,
      imageRecord(
        Assets.MaryIntroImage,
        "Saint Mary (the Blessed Virgin). Colour lithograph. - Wellcome Collection",
      ),
      [],
    ),
  );
  switch (mysteryCategory) {
    case OMysteryCategory.Joyful: {
      mysteries.push(
        mystery(
          OMysteryName.Annunciation,
          imageRecord(
            Assets.AnnunciationImage,
            "The Annunciation - Agostino Masucci",
          ),
          [
            {
              text: `...the angel said to her, "Do not be afraid, Mary, for you have found favor with God.
              And behold, you will conceive in your womb and bear a son, and you shall call his name Jesus.
              He will be great, and will be called the Son of the Most High;
              and the Lord God will give to him the throne of his father David,
              and he will reign over the house of Jacob for ever;
              and of his kingdom there will be no end."
              And Mary said to the angel, "How can this be, since I have no husband?" And the angel said to her,
              "The Holy Spirit will come upon you,
              and the power of the Most High will overshadow you;
              therefore the child to be born will be called holy,
              the Son of God. ... And Mary said, "Behold, I am the handmaid of the Lord;
              let it be to me according to your word."`,
              source: "Luke 1:30-38",
            },
            {
              text: `Espousing the divine will for salvation wholeheartedly, without a single sin to restrain her,
              she gave herself enteriely to the person and to the work of her Son; she did so in order
              to serve the mystery of redemption with him and dependent on him, by God's grace.`,
              source: "CCC 494",
            },
          ],
        ),
        mystery(
          OMysteryName.Visitation,
          imageRecord(
            Assets.VisitationImage,
            "Feast of the Visitation - Jerónimo Ezquerra",
          ),
          [
            {
              text: `In those days Mary arose and went with haste into the hill country, to a city of Judah, 
              and she entered the house of Zechari'ah and greeted Elizabeth. And when Elizabeth heard
              the greeting of Mary, the babe leaped in her womb; and Elizabeth was filled with the
              Holy Spirit and she exclaimed with a loud cry, "Blessed are you among women, and blessed
              is the fruit of your womb! And why is this granted me, that the mother of my Lord should
              come to me? For behold, when the voice of your greeting came to my ears, the babe in my womb
              leaped for joy. And blessed is she who believed that there would be a fulfilment of what was
              spoken to her from the Lord."`,
              source: "Luke 1:39-45",
            },
            {
              text: `Is this not also the joy of the Church, which ceaselessly welcomes Christ in the holy Eucharist
              and brings him into the world with the testimony of active charity, steeped in faith and hope?
              Yes, welcoming Jesus and bringing him to others is the true joy of Christians!`,
              source: "Pope Benedict XVI",
            },
          ],
        ),
        mystery(
          OMysteryName.Nativity,
          imageRecord(
            Assets.NativityImage,
            "The Nativity - Sir Edward Burne-Jones",
          ),
          [
            {
              text: `Joseph also went up from Galilee, from the city of Nazareth, to Judea, to the city of David, which
              is called Bethlehem, because he was of the house and lineage of David, to be enrolled with Mary,
              his betrothed, who was with child. And while they were there, the time came for her to be delivered.
              And she gave birth to her first-born son and wrapped him in swaddling cloths, and laid him in a manger,
              because there was no place for them in the inn.`,
              source: "Luke 2:4-7",
            },
            {
              text: `Jesus was born in a humble stable, into a poor family. Simple shepherds were the first witnesses to
              this event. In this poverty heaven's glory was made manifest... To become a child in relation to God
              is the condition for entering the kingdom. For this, we must humble ourselves and become little. Even
              more: to become "children of God" we must be "born from above" or "born of God". Only when Christ is
              formed in us will the mystery of Christmas be fulfilled in us.`,
              source: "CCC 525-526",
            },
          ],
        ),
        mystery(
          OMysteryName.PresentationInTheTemple,
          imageRecord(
            Assets.PresentationImage,
            "The Presentation of the Christ Child in the Temple - Ludovico Carracci",
          ),
          [
            {
              text: `And when the time came for their purification according to the law of Moses, they brought him up to
              Jerusalem to present him to the Lord... and to offer a sacrifice according to what is said in the law
              of the Lord, "a pair of turtledoves, or two young pigeons." Now there was a man in Jerusalem, whose 
              name was Simeon, and this man was righteous and devout, looking for the consolation of Israel, 
              and the Holy Spirit was upon him... And inspired by the Spirit he came into the temple; and when the
              parents brought in the child Jesus... he took him up in his arms and blessed God and said,<br/>
              "Lord, now lettest thou thy servant depart in peace,
              according to thy word;<br/>
              for mine eyes have seen thy salvation
              which thou hast prepared in the presence of all peoples,<br/>
              a light for revelation to the Gentiles,
              and for glory to thy people Israel.`,
              source: "Luke 2:22-32",
            },
            {
              text: `As the Son of God "became man, and was circumcised in the flesh, not for His own sake, but that He
              might make us to be God's through grace, and that we might be circumcised in the spirit; so, again,
              for our sake He was presented to the Lord, that we may learn to offer ourselves to God"
              [Athanasius, on Luke 2:23].`,
              source: "Thomas Aquinas",
            },
          ],
        ),
        mystery(
          OMysteryName.FindingInTheTemple,
          imageRecord(
            Assets.FindingImage,
            "Jesus Found in the Temple - James Tissot",
          ),
          [
            {
              text: `Now his parents went to Jerusalem every year at the feast of the Passover. And when he was twelve
              years old, they went up according to custom; and when the feast was ended, as they were returning,
              the boy Jesus stayed behind in Jerusalem. His parents did not know it, but supposing him to be in the
              company they went a day's journey, and they sought him among their kinsfolk and acquaintances; and when
              they did not find him, they returned to Jerusalem, seeking him. After three days they found him in the
              temple, sitting among the teachers, listening to them and asking them questions; and all who heard him
              were amazed at his understanding and his answers. And when they saw him they were astonished; and his
              mother said to him, "Son, why have you treated us so? Behold, your father and I have been looking for
              you anxiously." And he said to them, "How is it that you sought me? Did you not know that I must be
              in my Father's house?"`,
              source: "Luke 2:41-49",
            },
            {
              text: `Here Jesus lets us catch a glimpse of the mystery of his total consecration to a mission that flows
              from his divine sonship... Mary and Joseph did not understand these words, but they accepted them in
              faith. Mary "kept all these things in her heart" during the years Jesus remained hidden in the silence
              of an ordinary life.`,
              source: "CCC 534",
            },
          ],
        ),
      );
      break;
    }
    case OMysteryCategory.Sorrowful: {
      mysteries.push(
        mystery(
          OMysteryName.AgonyInTheGarden,
          imageRecord(
            Assets.AgonyImage,
            "The Agony in the Garden - Nicolas Poussin",
          ),
          [
            {
              text: `Then Jesus went with them to a place called Gethsem'ane, and he said to his disciples, "Sit here, 
              while I go yonder and pray." And taking with him Peter and the two sons of Zeb'edee, he began to be
              sorrowful and troubled. Then he said to them, "My soul is very sorrowful, even to death; remain here,
              and watch with me." And going a little farther he fell on his face and prayed, "My Father, if it be
              possible, let this cup pass from me; nevertheless, not as I will, but as thou wilt." And he came to 
              the disciples and found them sleeping; and he said to Peter, "So, could you not watch with me one hour?
              Watch and pray that you may not enter into temptation; the spirit indeed is willing, but the flesh is weak."
              Again, for the second time, he went away and prayed, "My Father, if this cannot pass unless I drink it,
              thy will be done." And again he came and found them sleeping, for their eyes were heavy. So, leaving them
              again, he went away and prayed for the third time, saying the same words. Then he came to the disciples and
              said to them, "Are you still sleeping and taking your rest? Behold, the hour is at hand, and the Son of man
              is betrayed into the hands of sinners. Rise, let us be going; see, my betrayer is at hand."`,
              source: "Matthew 26:36-46",
            },
            {
              text: `The cup of the New Covenant, which Jesus anticipated when he offered himself at the Last Supper, is
              afterwards accepted by him from his Father's hands in his agony in the garden at Gethsemani, making himself
              "obedient unto death". Jesus prays: "My Father, if it be possible, let this cup pass from me..." Thus he 
              expresses the horror that death represented for his human nature. Like ours, his human nature is destined
              for eternal life; but unlike ours, it is perfectly exempt from sin, the cause of death. Above all, his
              human nature has been assumed by the divine person of the "Author of life", the "Living One". By accepting
              in his human will that the Father's will be done, he accepts his death as redemptive, for "he himself bore
              our sins in his body on the tree."`,
              source: "CCC 612",
            },
          ],
        ),
        mystery(
          OMysteryName.ScourgingAtThePillar,
          imageRecord(
            Assets.ScourgingImage,
            "Flagellation of Christ - Jacques Blanchard",
          ),
          [
            {
              text: `Now the men who were holding Jesus mocked him and beat him; they also blindfolded him and asked him,
              "Prophesy! Who is it that struck you?" And they spoke many other words against him, reviling him.`,
              source: "Luke 22:63-65",
            },
            {
              text: `...Jesus gave both before and after his Passover: "Was it not necessary that the Christ should suffer
              these things and enter into his glory?" Jesus' sufferings took their historical, concrete form from
              the fact that he was "rejected by the elders and the chief priests and the scribes", who handed 
              "him to the Gentiles to be mocked and scourged and crucified".`,
              source: "CCC 572",
            },
          ],
        ),
        mystery(
          OMysteryName.CrowningWithThorns,
          imageRecord(
            Assets.CrowningImage,
            "The Head of Christ Crowned with Thorns - Sebald Beham",
          ),
          [
            {
              text: `Then the soldiers of the governor took Jesus into the praetorium, and they gathered the whole battalion
              before him. And they stripped him and put a scarlet robe upon him, and plaiting a crown of thorns they put
              it on his head, and put a reed in his right hand. And kneeling before him they mocked him, saying, "Hail,
              King of the Jews!" And they spat upon him, and took the reed and struck him on the head. And when they had
              mocked him, they stripped him of the robe, and put his own clothes on him, and led him away to crucify him.`,
              source: "Matthew 27:27-31",
            },
            {
              text: `By embracing in his human heart the Father's love for men, Jesus "loved them to the end", for "greater 
              love has no man than this, that a man lay down his life for his friends." In suffering and death his
              humanity became the free and perfect instrument of his divine love which desires the salvation of men.
              Indeed, out of love for his Father and for men, whom the Father wants to save, Jesus freely accepted his
              Passion and death: "No one takes [my life] from me, but I lay it down of my own accord." Hence the sovereign
              freedom of God's Son as he went out to his death.`,
              source: "CCC 609",
            },
          ],
        ),
        mystery(
          OMysteryName.CarryingOfTheCross,
          imageRecord(
            Assets.CrossImage,
            "Christ Carrying the Cross - El Greco",
          ),
          [
            {
              text: `Then Jesus told his disciples, "If any man would come after me, let him deny himself and take up his 
              cross and follow me. For whoever would save his life will lose it, and whoever loses his life for my sake
              will find it. For what will it profit a man, if he gains the whole world and forfeits his life? Or what
              shall a man give in return for his life? For the Son of man is to come with his angels in the glory of his
              Father, and then he will repay every man for what he has done."`,
              source: "Matthew 16:24-27",
            },
            {
              text: `The cross is the unique sacrifice of Christ, the "one mediator between God and men". But because in his
              incarnate divine person he has in some way united himself to every man, "the possibility of being made partners,
              in a way known to God, in the paschal mystery" is offered to all men. He calls his disciples to "take up [their]
              cross and follow (him)",454 for "Christ also suffered for (us), leaving (us) an example so that (we) should follow
              in his steps." In fact Jesus desires to associate with his redeeming sacrifice those who were to be its first
              beneficiaries. This is achieved supremely in the case of his mother, who was associated more intimately than any
              other person in the mystery of his redemptive suffering. Apart from the cross there is no other ladder by which we may get to heaven.`,
              source: "CCC 609",
            },
          ],
        ),
        mystery(
          OMysteryName.CrucifixionAndDeath,
          imageRecord(
            Assets.CrucifixionImage,
            "The Crucifixion - Bartolomé Estebán Murillo",
          ),
          [
            {
              text: `..Standing by the cross of Jesus were his mother, and his mother's sister, Mary the wife of Clopas,
              and Mary Magdalene. When Jesus saw his mother, and the disciple whom he loved standing near, he said to
              his mother, "Woman, behold, your son!" Then he said to the disciple, "Behold, your mother!" And from that
              hour the disciple took her to his own home. After this Jesus, knowing that all was now finished, said
              (to fulfil the scripture), "I thirst." A bowl full of vinegar stood there; so they put a sponge full of
              the vinegar on hyssop and held it to his mouth. When Jesus had received the vinegar, he said, "It is finished";
              and he bowed his head and gave up his spirit.`,
              source: "John 19:25-30",
            },
            {
              text: `It is love "to the end" that confers on Christ's sacrifice its value as redemption and reparation, as
              atonement and satisfaction. He knew and loved us all when he offered his life. Now "the love of Christ 
              controls us, because we are convinced that one has died for all; therefore all have died." No man, not even
              the holiest, was ever able to take on himself the sins of all men and offer himself as a sacrifice for all.
              The existence in Christ of the divine person of the Son, who at once surpasses and embraces all human persons,
              and constitutes himself as the Head of all mankind, makes possible his redemptive sacrifice for all.`,
              source: "CCC 616",
            },
          ],
        ),
      );
      break;
    }
    case OMysteryCategory.Glorious: {
      mysteries.push(
        mystery(
          OMysteryName.Resurrection,
          imageRecord(
            Assets.ResurrectionImage,
            "La Résurrection - James Tissot",
          ),
          [
            {
              text: `Now after the sabbath, toward the dawn of the first day of the week, Mary Magdalene and the other
              Mary went to see the sepulchre. And behold, there was a great earthquake; for an angel of the Lord descended
              from heaven and came and rolled back the stone, and sat upon it. His appearance was like lightning, and his
              raiment white as snow. And for fear of him the guards trembled and became like dead men. But the angel said
              to the women, "Do not be afraid; for I know that you seek Jesus who was crucified. He is not here; for he
              has risen, as he said. Come, see the place where he lay. Then go quickly and tell his disciples that
              he has risen from the dead, and behold, he is going before you to Galilee; there you will see him. Lo, I
              have told you." So they departed quickly from the tomb with fear and great joy, and ran to tell his
              disciples. And behold, Jesus met them and said, "Hail!" And they came up and took hold of his feet and
              worshiped him. Then Jesus said to them, "Do not be afraid; go and tell my brethren to go to Galilee, and
              there they will see me."`,
              source: "Matthew 28:1-10",
            },
            {
              text: `Christ's Resurrection is an object of faith in that it is a transcendent intervention of God himself
              in creation and history. In it the three divine persons act together as one, and manifest their own proper
              characteristics. the Father's power "raised up" Christ his Son and by doing so perfectly introduced his
              Son's humanity, including his body, into the Trinity. Jesus is conclusively revealed as "Son of God in
              power according to the Spirit of holiness by his Resurrection from the dead". St. Paul insists on the
              manifestation of God's power through the working of the Spirit who gave life to Jesus' dead humanity and
              called it to the glorious state of Lordship.`,
              source: "CCC 648",
            },
          ],
        ),
        mystery(
          OMysteryName.Ascension,
          imageRecord(
            Assets.AscensionImage,
            "The Ascension - John Singleton Copley",
          ),
          [
            {
              text: `Then he led them out as far as Bethany, and lifting up his hands he blessed them. While he
              blessed them, he parted from them and was carried up into heaven. And they worshiped him, and returned
              to Jerusalem with great joy, and were continually in the temple blessing God.`,
              source: "Luke 24:50-53",
            },
            {
              text: `Jesus' final apparition ends with the irreversible entry of his humanity into divine glory,
              symbolized by the cloud and by heaven, where he is seated from that time forward at God's right hand.`,
              source: "CCC 659",
            },
            {
              text: `"And I, when I am lifted up from the earth, will draw all men to myself." The lifting up of
              Jesus on the cross signifies and announces his lifting up by his Ascension into heaven, and indeed
              begins it. Jesus Christ, the one priest of the new and eternal Covenant, "entered, not into a sanctuary
              made by human hands. . . but into heaven itself, now to appear in the presence of God on our behalf."
              There Christ permanently exercises his priesthood, for he "always lives to make intercession" for "those
              who draw near to God through him".`,
              source: "CCC 662",
            },
          ],
        ),
        mystery(
          OMysteryName.DescentOfTheHolySpirit,
          imageRecord(
            Assets.DescentImage,
            "The Pentecost (The Descent of the Holy Spirit) - Cesare Nebbia",
          ),
          [
            {
              text: `When the day of Pentecost had come, they were all together in one place. And suddenly from
              heaven there came a sound like the rush of a violent wind, and it filled the entire house where they
              were sitting. Divided tongues, as of fire, appeared among them, and a tongue rested on each of them. 
              All of them were filled with the Holy Spirit and began to speak in other languages, as the Spirit gave
              them ability.`,
              source: "Acts 2:1",
            },
            // TODO add another
          ],
        ),
        mystery(
          OMysteryName.Assumption,
          imageRecord(
            Assets.AssumptionImage,
            "The Assumption of the Virgin - Studio of Peter Paul Rubens",
          ),
          [
            {
              text: `And Mary said, "My soul magnifies the Lord,
              and my spirit rejoices in God my Savior,<br/>
              for he has looked with favor on the lowliness of his servant.<br/>
              Surely, from now on all generations will call me blessed;<br/>
              for the Mighty One has done great things for me,
              and holy is his name."`,
              source: "Luke 1:46-49",
            },
            {
              text: `"Finally the Immaculate Virgin, preserved free from all stain of original sin, when the
              course of her earthly life was finished, was taken up body and soul into heavenly glory...<br/>
              The Assumption of the Blessed Virgin is a singular
              participation in her Son's Resurrection and an anticipation of the resurrection of other Christians:<br/>
              In giving birth you kept your virginity; in your Dormition you did not leave the world, O Mother of God,
              but were joined to the source of Life. You conceived the living God and, by your prayers, will deliver
              our souls from death.`,
              source: "CCC 966",
            },
          ],
        ),
        mystery(
          OMysteryName.CoronationOfMary,
          imageRecord(
            Assets.CoronationImage,
            "The Coronation of the Virgin - Annibale Carracci",
          ),
          [
            {
              text: `He has brought down the powerful from their thrones,
              and lifted up the lowly;<br/>
              he has filled the hungry with good things,
              and sent the rich away empty.<br/>
              He has helped his servant Israel,
              in remembrance of his mercy,<br/>
              according to the promise he made to our ancestors,
              to Abraham and to his descendants forever."`,
              source: "Luke 1:52-55",
            },
            {
              text: `Finally the Immaculate Virgin... [was] exalted by the Lord as Queen over all things, so that
              she might be the more fully conformed to her Son, the Lord of lords and conqueror of sin and death."`,
              source: "CCC 966",
            },
            {
              text: `"This motherhood of Mary in the order of grace continues uninterruptedly from the consent which
              she loyally gave at the Annunciation and which she sustained without wavering beneath the cross, until
              the eternal fulfilment of all the elect. Taken up to heaven she did not lay aside this saving office but
              by her manifold intercession continues to bring us the gifts of eternal salvation... Therefore the Blessed
              Virgin is invoked in the Church under the titles of Advocate, Helper, Benefactress, and Mediatrix.`,
              source: "CCC 969",
            },
          ],
        ),
      );
      break;
    }
    case OMysteryCategory.Luminous: {
      mysteries.push(
        mystery(
          OMysteryName.BaptismOfChristInTheJordan,
          imageRecord(
            Assets.BaptismImage,
            "The Baptism of Christ - Paolo Veronese",
          ),
          [
            {
              text: `Then Jesus came from Galilee to John at the Jordan, to be baptized by him. John
              would have prevented him, saying, "I need to be baptized by you, and do you come to me?"
              But Jesus answered him, "Let it be so now; for it is proper for us in this way to fulfill
              all righteousness." Then he consented. And when Jesus had been baptized, just as he came
              up from the water, suddenly the heavens were opened to him and he saw the Spirit of God
              descending like a dove and alighting on him. 17 And a voice from heaven said, "This is my
              Son, the Beloved, with whom I am well pleased."`,
              source: "Matthew 3:13-17",
            },
            {
              text: `The baptism of Jesus is on his part the acceptance and inauguration of his mission as
              God's suffering Servant. He allows himself to be numbered among sinners; he is already "the
              Lamb of God, who takes away the sin of the world". Already he is anticipating the "baptism"
              of his bloody death. Already he is coming to "fulfil all righteousness", that is, he is submitting
              himself entirely to his Father's will: out of love he consents to this baptism of death for the
              remission of our sins. The Father's voice responds to the Son's acceptance, proclaiming his entire
              delight in his Son. The Spirit whom Jesus possessed in fullness from his conception comes to
              "rest on him". Jesus will be the source of the Spirit for all mankind. At his baptism "the heavens
              were opened" - the heavens that Adam's sin had closed - and the waters were sanctified by the
              descent of Jesus and the Spirit, a prelude to the new creation.`,
              source: "CCC 536",
            },
          ],
        ),
        mystery(
          OMysteryName.WeddingFeastAtCana,
          imageRecord(
            Assets.WeddingImage,
            "The Wedding Feast at Cana - Lavinia Fontana",
          ),
          [
            {
              text: `On the third day there was a wedding in Cana of Galilee, and the mother of Jesus was there.
              Jesus and his disciples had also been invited to the wedding. When the wine gave out, the mother of
              Jesus said to him, "They have no wine." And Jesus said to her, "Woman, what concern is that to you
              and to me? My hour has not yet come." His mother said to the servants, "Do whatever he tells you."
              Now standing there were six stone water jars for the Jewish rites of purification, each holding twenty
              or thirty gallons. Jesus said to them, "Fill the jars with water." And they filled them up to the brim.
              He said to them, "Now draw some out, and take it to the chief steward." So they took it. When the steward
              tasted the water that had become wine, and did not know where it came from (though the servants who had
              drawn the water knew), the steward called the bridegroom and said to him, "Everyone serves the good
              wine first, and then the inferior wine after the guests have become drunk. But you have kept the good
              wine until now." Jesus did this, the first of his signs, in Cana of Galilee, and revealed his glory;
              and his disciples believed in him.`,
              source: "John 2:1-11",
            },
            {
              text: `At Cana, The mother of Jesus asks her son for the needs of a wedding feast; this is the sign of
              another feast - that of the wedding of the Lamb where he gives his body and blood at the request of the
              Church, his Bride. It is at the hour of the New Covenant, at the foot of the cross,90 that Mary is heard
              as the Woman, the new Eve, the true "Mother of all the living."`,
              source: "",
            },
          ],
        ),
        mystery(
          OMysteryName.JesusProclamationOfTheComingOfTheKingdomOfGod,
          imageRecord(
            Assets.SermonImage,
            "La sermon des béatitudes - James Tissot",
          ),
          [
            {
              text: `Now after John was arrested, Jesus came to Galilee, proclaiming the good news of God, and saying,
              "The time is fulfilled, and the kingdom of God has come near; repent, and believe in the good news."`,
              source: "Mark 1:14-15",
            },
            {
              text: `When Jesus saw the crowds, he went up the mountain; and after he sat down, his disciples came to him.
              Then he began to speak, and taught them, saying:<br/>
              Blessed are the poor in spirit, for theirs is the kingdom of heaven.<br/>
              Blessed are those who mourn, for they will be comforted.<br/>
              Blessed are the meek, for they will inherit the earth.<br/>
              Blessed are those who hunger and thirst for righteousness, for they will be filled.<br/>
              Blessed are the merciful, for they will receive mercy.<br/>
              Blessed are the pure in heart, for they will see God.<br/>
              Blessed are the peacemakers, for they will be called children of God.<br/>
              Blessed are those who are persecuted for righteousness' sake, for theirs is the kingdom of heaven.<br/>
              Blessed are you when people revile you and persecute you and utter all kinds of evil against you falsely
              on my account. Rejoice and be glad, for your reward is great in heaven, for in the same way they
              persecuted the prophets who were before you.`,
              source: "Matthew 5:1-12",
            },
            {
              text: `Jesus' invitation to enter his kingdom comes in the form of parables, a characteristic feature of
              his teaching. Through his parables he invites people to the feast of the kingdom, but he also asks for
              a radical choice: to gain the kingdom, one must give everything. Words are not enough, deeds are
              required. The parables are like mirrors for man: will he be hard soil or good earth for the word? What
              use has he made of the talents he has received? Jesus and the presence of the kingdom in this world are
              secretly at the heart of the parables. One must enter the kingdom, that is, become a disciple of Christ,
              in order to "know the secrets of the kingdom of heaven". For those who stay "outside", everything remains
              enigmatic.`,
              source: "CCC 546",
            },
          ],
        ),
        mystery(
          OMysteryName.Transfiguration,
          imageRecord(Assets.TransfigurationImage, "Transfiguration - Raphael"),
          [
            {
              text: `Six days later, Jesus took with him Peter and James and John, and led them up a high mountain apart,
              by themselves. And he was transfigured before them, and his clothes became dazzling white, such as no one
              on earth could bleach them. And there appeared to them Elijah with Moses, who were talking with Jesus.
              Then Peter said to Jesus, "Rabbi, it is good for us to be here; let us make three dwellings, one for you,
              one for Moses, and one for Elijah." 6 He did not know what to say, for they were terrified. Then a cloud
              overshadowed them, and from the cloud there came a voice, "This is my Son, the Beloved; listen to him!"
              Suddenly when they looked around, they saw no one with them any more, but only Jesus.`,
              source: "",
            },
            {
              text: `For a moment Jesus discloses his divine glory, confirming Peter's confession. He also reveals
              that he will have to go by the way of the cross at Jerusalem in order to "enter into his glory". Moses
              and Elijah had seen God's glory on the Mountain; the Law and the Prophets had announced the Messiah's
              sufferings.296 Christ's Passion is the will of the Father: the Son acts as God's servant; The cloud
              indicates the presence of the Holy Spirit. "The whole Trinity appeared: the Father in the voice;
              the Son in the man; the Spirit in the shining cloud."<br/>
              "You were transfigured on the mountain, and your disciples, as much as they were capable of it,
              beheld your glory, O Christ our God, so that when they should see you crucified they would understand
              that your Passion was voluntary, and proclaim to the world that you truly are the splendour of the Father."`,
              source: "CCC 555",
            },
          ],
        ),
        mystery(
          OMysteryName.InstitutionOfTheEucharist,
          imageRecord(
            Assets.EucharistImage,
            "The Last Supper, after Leonardo da Vinci - Rembrandt",
          ),
          [
            {
              text: `When it was evening, he took his place with the twelve; and while they were eating, he said,
              "Truly I tell you, one of you will betray me." And they became greatly distressed and began to say
              to him one after another, "Surely not I, Lord?" He answered, "The one who has dipped his hand into
              the bowl with me will betray me. The Son of Man goes as it is written of him, but woe to that one by
              whom the Son of Man is betrayed! It would have been better for that one not to have been born."
              Judas, who betrayed him, said, "Surely not I, Rabbi?" He replied, "You have said so."<br/>
              While they were eating, Jesus took a loaf of bread, and after blessing it he broke it, gave it to
              the disciples, and said, "Take, eat; this is my body." Then he took a cup, and after giving thanks
              he gave it to them, saying, "Drink from it, all of you; 28 for this is my blood of the covenant, which
              is poured out for many for the forgiveness of sins. I tell you, I will never again drink of this fruit
              of the vine until that day when I drink it new with you in my Father's kingdom."`,
              source: "Matthew 26:20-29",
            },
            {
              text: `The Eucharist that Christ institutes at that moment will be the memorial of his sacrifice.
              Jesus includes the apostles in his own offering and bids them perpetuate it.432 By doing so, the Lord
              institutes his apostles as priests of the New Covenant: "For their sakes I sanctify myself, so that they
              also may be sanctified in truth."`,
              source: "CCC 611",
            },
          ],
        ),
      );
      break;
    }
  }
  mysteries.push(
    mystery(
      OMysteryName.ClosingPrayers,
      imageRecord(
        Assets.MaryCloseImage,
        "Saint Mary (the Blessed Virgin). Coloured engraving by A. Schleich after Heinrich Hess - Wellcome Collection",
      ),
      [],
    ),
  );
  return mysteries;
}
