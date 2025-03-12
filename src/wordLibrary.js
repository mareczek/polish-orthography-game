// Pełna lista słów z "rz" i "ż" wraz z zasadami ortograficznymi
const allWordsList = [
  // Słowa z "rz"
  { word: "rzecz", correctAnswer: "rz", rule: "RZ piszemy po spółgłoskach: p, b, t, d, k, g, ch, j, w." },
  { word: "rzeka", correctAnswer: "rz", rule: "RZ piszemy, gdy wymienia się na 'r' w innych formach wyrazu lub wyrazach pokrewnych." },
  { word: "rzut", correctAnswer: "rz", rule: "RZ piszemy, gdy wymienia się na 'r' w innych formach wyrazu lub wyrazach pokrewnych." },
  { word: "przyjaźń", correctAnswer: "rz", rule: "RZ piszemy w przedrostkach prze-, przy-." },
  { word: "przestrzeń", correctAnswer: "rz", rule: "RZ piszemy w przedrostkach prze-, przy-." },
  { word: "przyroda", correctAnswer: "rz", rule: "RZ piszemy w przedrostkach prze-, przy-." },
  { word: "przyszłość", correctAnswer: "rz", rule: "RZ piszemy w przedrostkach prze-, przy-." },
  { word: "brzeg", correctAnswer: "rz", rule: "RZ piszemy po spółgłoskach: p, b, t, d, k, g, ch, j, w." },
  { word: "brzoza", correctAnswer: "rz", rule: "RZ piszemy po spółgłoskach: p, b, t, d, k, g, ch, j, w." },
  { word: "chrzan", correctAnswer: "rz", rule: "RZ piszemy w wyrazach, których pisownię należy zapamiętać." },
  { word: "drzewo", correctAnswer: "rz", rule: "RZ piszemy po spółgłoskach: p, b, t, d, k, g, ch, j, w." },
  { word: "grzyb", correctAnswer: "rz", rule: "RZ piszemy w wyrazach, których pisownię należy zapamiętać." },
  { word: "krzyk", correctAnswer: "rz", rule: "RZ piszemy po spółgłoskach: p, b, t, d, k, g, ch, j, w." },
  { word: "marzenie", correctAnswer: "rz", rule: "RZ piszemy, gdy wymienia się na 'r' w innych formach wyrazu lub wyrazach pokrewnych (marzyć - mara)." },
  { word: "orzech", correctAnswer: "rz", rule: "RZ piszemy w wyrazach, których pisownię należy zapamiętać." },
  { word: "porzeczka", correctAnswer: "rz", rule: "RZ piszemy w wyrazach, których pisownię należy zapamiętać." },
  { word: "rzadko", correctAnswer: "rz", rule: "RZ piszemy, gdy wymienia się na 'r' w innych formach wyrazu lub wyrazach pokrewnych (rzadko - rarytas)." },
  { word: "rzeźba", correctAnswer: "rz", rule: "RZ piszemy, gdy wymienia się na 'r' w innych formach wyrazu lub wyrazach pokrewnych (rzeźbić - rzeźbiarz)." },
  { word: "rzodkiewka", correctAnswer: "rz", rule: "RZ piszemy w wyrazach, których pisownię należy zapamiętać." },
  { word: "trzy", correctAnswer: "rz", rule: "RZ piszemy w liczebnikach zawierających 'trzy'." },
  // ... more "rz" words would be here

  // Słowa z "ż"
  { word: "żebro", correctAnswer: "ż", rule: "Ż piszemy w wielu wyrazach, których pisownię należy zapamiętać." },
  { word: "żeton", correctAnswer: "ż", rule: "Ż piszemy w wielu wyrazach, których pisownię należy zapamiętać." },
  { word: "żeglować", correctAnswer: "ż", rule: "Ż piszemy w wielu wyrazach, których pisownię należy zapamiętać." },
  { word: "żmudny", correctAnswer: "ż", rule: "Ż piszemy w wielu wyrazach, których pisownię należy zapamiętać." },
  { word: "żółtko", correctAnswer: "ż", rule: "Ż piszemy w wielu wyrazach, których pisownię należy zapamiętać." },
  { word: "nóż", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (nóż - noże)." },
  { word: "mąż", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (mąż - mężowie)." },
  { word: "straż", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (straż - strażnik)." },
  { word: "stróż", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (stróż - stróże)." },
  { word: "drażnić", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (drażnić - drażniący)." },
  { word: "grożenie", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (grozić - grożenie)." },
  { word: "mrożony", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (mrozić - mrożony)." },
  { word: "nieznośny", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (nosić - znoszę)." },
  { word: "poważać", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (waga - poważać)." },
  { word: "pożar", correctAnswer: "ż", rule: "Ż piszemy w wielu wyrazach, których pisownię należy zapamiętać." },
  { word: "pożyczka", correctAnswer: "ż", rule: "Ż piszemy w wielu wyrazach, których pisownię należy zapamiętać." },
  { word: "rażący", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (razić - rażący)." },
  { word: "sążeń", correctAnswer: "ż", rule: "Ż piszemy w wielu wyrazach, których pisownię należy zapamiętać." },
  { word: "świeżo", correctAnswer: "ż", rule: "Ż piszemy w zakończeniach przymiotników -eży." },
  { word: "wiążący", correctAnswer: "ż", rule: "Ż piszemy, gdy wymienia się na 'g', 'dz', 'h', 'z', 's' w innych formach wyrazu lub wyrazach pokrewnych (wiązać - wiążący)." }
];

export default allWordsList;