import OMysteryCategory from "../enums/OMysteryCategory";
import OMysteryName from "../enums/OMysteryName";
import { imageRecord } from "../types/ImageRecord";
import Mystery, { mystery } from "../types/Mystery";
import MysteryCategory from "../types/MysteryCategory";
import { isAdvent, isLent } from "./Dates";
import * as Assets from "../assets/index";
import { format } from "date-fns";

export function getMysteryCategory(date: Date): MysteryCategory {
  switch (format(date, "iiii")) {
    case "Monday": {
      return OMysteryCategory.Joyful;
    }
    case "Saturday": {
      return OMysteryCategory.Joyful;
    }
    case "Tuesday": {
      return OMysteryCategory.Sorrowful;
    }
    case "Friday": {
      return OMysteryCategory.Sorrowful;
    }
    case "Wednesday": {
      return OMysteryCategory.Glorious;
    }
    case "Thursday": {
      return OMysteryCategory.Luminous;
    }
    case "Sunday": {
      if (isAdvent(date)) {
        return OMysteryCategory.Joyful;
      }
      if (isLent(date)) {
        return OMysteryCategory.Sorrowful;
      }
      return OMysteryCategory.Glorious;
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
          [],
        ),
        mystery(
          OMysteryName.Visitation,
          imageRecord(
            Assets.VisitationImage,
            "Feast of the Visitation - Jerónimo Ezquerra",
          ),
          [],
        ),
        mystery(
          OMysteryName.Nativity,
          imageRecord(
            Assets.NativityImage,
            "The Nativity - Sir Edward Burne–Jones",
          ),
          [],
        ),
        mystery(
          OMysteryName.PresentationInTheTemple,
          imageRecord(
            Assets.PresentationImage,
            "The Presentation of the Christ Child in the Temple - Ludovico Carracci",
          ),
          [],
        ),
        mystery(
          OMysteryName.FindingInTheTemple,
          imageRecord(
            Assets.FindingImage,
            "Jesus Found in the Temple - James Tissot",
          ),
          [],
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
          [],
        ),
        mystery(
          OMysteryName.ScourgingAtThePillar,
          imageRecord(
            Assets.ScourgingImage,
            "Flagellation of Christ - Jacques Blanchard",
          ),
          [],
        ),
        mystery(
          OMysteryName.CrowningWithThorns,
          imageRecord(
            Assets.CrowningImage,
            "The Head of Christ Crowned with Thorns - Sebald Beham",
          ),
          [],
        ),
        mystery(
          OMysteryName.CarryingOfTheCross,
          imageRecord(
            Assets.CrossImage,
            "Christ Carrying the Cross - El Greco",
          ),
          [],
        ),
        mystery(
          OMysteryName.CrucifixionAndDeath,
          imageRecord(
            Assets.CrucifixionImage,
            "The Crucifixion - Bartolomé Estebán Murillo",
          ),
          [],
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
          [],
        ),
        mystery(
          OMysteryName.Resurrection,
          imageRecord(
            Assets.ResurrectionImage,
            "The Ascension - John Singleton Copley",
          ),
          [],
        ),
        mystery(
          OMysteryName.DescentOfTheHolySpirit,
          imageRecord(
            Assets.DescentImage,
            "The Pentecost (The Descent of the Holy Spirit) - Cesare Nebbia",
          ),
          [],
        ),
        mystery(
          OMysteryName.Assumption,
          imageRecord(
            Assets.AssumptionImage,
            "The Assumption of the Virgin - Studio of Peter Paul Rubens",
          ),
          [],
        ),
        mystery(
          OMysteryName.CoronationOfMary,
          imageRecord(
            Assets.CoronationImage,
            "The Coronation of the Virgin - Annibale Carracci",
          ),
          [],
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
          [],
        ),
        mystery(
          OMysteryName.WeddingFeastAtCana,
          imageRecord(
            Assets.WeddingImage,
            "The Wedding Feast at Cana - Lavinia Fontana",
          ),
          [],
        ),
        mystery(
          OMysteryName.JesusProclamationOfTheComingOfTheKingdomOfGod,
          imageRecord(
            Assets.SermonImage,
            "La sermon des béatitudes - James Tissot",
          ),
          [],
        ),
        mystery(
          OMysteryName.Transfiguration,
          imageRecord(Assets.TransfigurationImage, "Transfiguration - Raphael"),
          [],
        ),
        mystery(
          OMysteryName.InstitutionOfTheEucharist,
          imageRecord(
            Assets.EucharistImage,
            "The Last Supper, after Leonardo da Vinci - Rembrandt",
          ),
          [],
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
