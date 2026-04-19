# Part 2 draft (parked — not rendered)

Content cut from `copy.md` when Part 1 was shipped. Source numbers for the diet
composition are provisional and need sourcing work before this goes live:

- FAO Food Balance Sheets link for the UK is wrong (replace)
- EUMOFA 22.89 kg figure is **LWE per capita**, not edible weight — verify at
  https://marketac.eu/wp-content/uploads/2026/02/EUMOFA-Presentation-The-EU-Fish-Market-2025.pdf
- Pescatarian eggs/milk (300/320) are copied from vegetarian — no direct source
- Factor-of-two uncertainty on all fish-individual conversions

See `dietnumbers.md` for fuller research notes.

---

## Markdown body (dropped from copy.md)

Now that we know how many days of life different foods represent, what does a
whole year's diet look like?

# What's in a diet?

Eating a different diet will mean eating different animals. If some animals are smaller and live less long than others, what does that mean for how many animal life-days go into our diets?

Because some animals are so small, and each one makes a very slight contribution to our diets, most life-days are accounted for by smaller animals like shrimp, fish and chicken. The average American, European and British diets differ in their composition, which means different numbers of life-days for each.

{{widget:diet-calculator
  intro: Different diets translate to very different numbers of life-days per year. Brits and Europeans consume more fish than Americans, which translates into more life-days.
}}

The numbers here are surprising – because fish and chickens are so small, they make up almost all of the life-days in our diets. Cows make up a much smaller amount, and dairy almost none.

This has some counterintuitive implications. Those aspiring to reduce their
animal consumption should cut out fish and eggs first -- per kg these cause by
far the most amount of suffering. Cutting out beef should be done second last;
eliminating milk is the lowest-impact diet intervention.

# Putting it together

A more sophisticated model would include both _how much_ each animal can
suffer, and _how many_ of them are in your diet.

{{widget:suffering-days
  european: European diets are dominated by the poor welfare of farmed fish and their small size.
  american: Americans eat more chickens and fish, with chickens the largest source of suffering.
  uk: Brits are similar to Europeans, but score slightly better due to eating less fish.
  pescatarian: A typical pescatarian diet relies heavily on fish.
  vegetarian: Vegetarian diets cause drastically less suffering than diets which include meat or fish.
  vegan: Vegan diets cut out most animal suffering, although crop farming inevitably causes some small mammals to be killed (not modelled here).
}}

These are relatively simple models -- considering how many animals get eaten in
a given diet, how many days of each animal's life that corresponds to, and how
much those animals suffer, giving us a final accounting of how much suffering
our diets cause.

There is a lot of uncertainty in these numbers. We haven't considered shrimp,
which increasingly are thought to feel pain, or the fish that are farmed to be
fed to the fish we eat, for example.

Of course, animals are treated very differently. It's plausible that
pasture-raised cattle, for example, have enjoyable lives until they are
slaughtered. Dairy cows are also relatively well-treated, although they go
through regular cycles of artificial insemination, pregnancy, and having their
calves taken away. Pigs and chickens are subject to the most painful procedures
-- debeaking, castration without anesthetic, restrictions on movement. These
are not captured in the above models.

---

*If the idea that animals' experiences might differ this much already changes
how you think, consider [donating to effective
organisations](https://animalcharityevaluators.org/) which seek to reform the
way we raise animals for food, [pay for
'offsets'](https://www.farmkind.giving/) to cover the animals you consume, or
think about where you could cut back.*

{{break}}

## Sources bullet list (dropped from copy.md)

**Diet composition.** Per-capita consumption figures vary in provenance. Fish
counts in particular carry factor-of-two uncertainty because FAO publishes
landings only in tonnes, and converting to kg-per-person relies on species-mix
assumptions (mean fish weight varies by approx. 1,000× across the species a Westerner
eats -- from 10 g sardines to 50 kg tuna).

- *American*: beef 26 kg, pork 23 kg, chicken 46 kg, fish 9 kg, eggs 264,
  milk 297 kg. From [USDA ERS Food Availability data](https://www.ers.usda.gov/data-products/food-availability-per-capita-data-system/)
  and the 2024 USDA NASS *Livestock Slaughter Summary*, cross-referenced with
  Harish Sethu's *[How Many Animals Does a Vegetarian Save?](https://www.countinganimals.com/how-many-animals-does-a-vegetarian-save/)*
  (countinganimals.com, 2015).
- *European*: beef 15 kg, pork 32 kg, chicken 25 kg, fish 23 kg, eggs 220,
  milk 250 kg. Derived from Eurostat's *[Agricultural production --
  livestock and meat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Agricultural_production_-_livestock_and_meat)*
  2024 provisional carcass-weight totals divided by EU-27 population (448m);
  fish from EUMOFA's *[The EU Fish Market](https://eumofa.eu/the-eu-fish-market)*
  2025 edition (22.89 kg apparent seafood consumption, 2023). **[Check: this is
  LWE per capita, not edible weight.]**
- *British*: beef 17 kg, pork 22 kg, chicken 34 kg, fish 18 kg, eggs 200,
  milk 250 kg. From Defra's *[Agriculture in the United Kingdom 2024,
  Chapter 8](https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom-2024/chapter-8-livestock)*
  (1.18 billion broilers × approx. 1.9 kg edible weight, divided by 67m population);
  fish from FAO Food Balance Sheets UK supply-side estimate (approx. 18 kg/year).
  **[FAO link needs fixing.]**
- *Pescatarian*: fish 20 kg, eggs 300, milk 320. Fish intake from
  Papier, Tong, Appleby et al., *[Nutrients 2019;
  11(4): 824](https://www.mdpi.com/2072-6643/11/4/824)* -- EPIC-Oxford
  fish-eater group (n = 4,528), age-adjusted mean 57.5 g/day for men,
  54.1 g/day for women ≈ 20 kg/year. Eggs and dairy copied from the
  vegetarian preset, since no authoritative source separately reports
  pescatarian egg/dairy intake.
- *Vegetarian*: eggs 300, milk 320. Rough estimate assuming protein
  substitution; the lacto-ovo intake literature is thin. EPIC-Oxford and
  NDNS both suggest vegetarian egg and dairy intake is modestly elevated
  over omnivores.
- *Vegan*: zero for all animal products by definition.
