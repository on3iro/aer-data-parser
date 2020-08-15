const fs = require('fs')
const AERData = require("aer-data/dist/cjs/index.js");
const OTCSV = require("objects-to-csv");

const { normalizedData } = AERData.default;

const BASE_PATH = "./data";

const languageKeys = Object.keys(normalizedData);

languageKeys.forEach(langKey => {
  const language = normalizedData[langKey];
  const {
    expansions,
    expansionIds,
    nemeses,
    nemesisIds,
    mages,
    mageIds,
    cards,
    cardIds,
    treasures,
    treasureIds,
    basicNemesisCards,
    basicNemesisCardIds,
    upgradedBasicNemesisCards,
    upgradedBasicNemesisCardIds,
  } = language;

  expansionIds.forEach((expansionId: any) => {
    const expansion = expansions[expansionId]
    const path = `${BASE_PATH}/${langKey}/${expansion.id}`;
    fs.mkdir(path, { recursive: true }, (err: any) => {
      if (err) throw err;
    });

    const nemesesByExpansion = nemesisIds.map((id: any) => nemeses[id]).filter((n: any) => n.expansion === expansion.id)
    const magesByExpansion = mageIds.map((id: any) => mages[id]).filter((m: any) => m.expansion === expansion.id)
    const cardsByExpansion = cardIds.map((id: any) => cards[id]).filter((c: any) => c.expansion === expansion.id)
    const treasuresByExpansion = treasureIds.map((id: any) => treasures[id]).filter((t: any) => t.expansion === expansion.id)
    const basicNemesisCardsByExpansion = basicNemesisCardIds.map((id: any) => basicNemesisCards[id]).filter((b: any) => b.expansion === expansion.id)
    const upgradedBasicNemesisCardsByExpansion = upgradedBasicNemesisCardIds.map((id: any) => upgradedBasicNemesisCards[id]).filter((u: any) => u.expansion === expansion.id)

    new OTCSV(nemesesByExpansion).toDisk(`${path}/nemeses.csv`);
    new OTCSV(magesByExpansion).toDisk(`${path}/mages.csv`);
    new OTCSV(cardsByExpansion).toDisk(`${path}/cards.csv`);
    new OTCSV(treasuresByExpansion).toDisk(`${path}/treasures.csv`);
    new OTCSV(basicNemesisCardsByExpansion).toDisk(`${path}/basicNemesisCards.csv`);
    new OTCSV(upgradedBasicNemesisCardsByExpansion).toDisk(
      `${path}/upgradedBasicNemesisCards.csv`
    );
  });
});
