# TODO

## Content / copy

- [ ] Review DRAFT prose in `src/data/farming.js` (life/death per animal)
- [ ] Resolve diet-composition TODOs in `copy.md` (UK FAO link, EUMOFA LWE-vs-edible, pescatarian eggs/milk proxy, fish conversion uncertainty)
- [ ] Full prose pass on `copy.md` — tighten sentences, fix flow between sections
- [ ] Rewrite the post-diet-widget prose in `copy.md` now that the diet widget is mode-toggleable (old "cut fish and eggs first" framing needs reconciling with the toggle)
- [ ] Get feedback from Itsi and Alec
- [ ] Address reader feedback on brain-based suffering measures:
  - Raw neuron/brain-mass measures imply elephants and blue whales top the suffering ranking; consider normalising by body size (Encephalization Quotient) since much of the brain controls the body rather than "feels"
  - Big caveat reader raised: capacity for suffering ≠ actual suffering — modern broiler chickens likely suffer less per-neuron but are "bred to suffer" (cite John Webster: chicken production "the single most severe example of man's inhumanity to another sentient animal"). Make sure the treatment/conditions axis is clearly separated from the capacity axis in the copy.
- [ ] Add a notes/methodology section at the bottom of the page for caveats and data uncertainty (e.g. salmon neuron count extrapolated from zebrafish)

## Modelling / extensions

- [ ] How do you weight the middle and end of an animal's life? (A single `suffering/day` number flattens the ramp-up near slaughter and the long stretches of routine confinement — need a way to reflect that.)
- [ ] Caveats widget or sidebar — how do you weigh e.g. the wild fish that are caught and fed to farmed fish? Indirect suffering isn't currently modelled.
- [ ] Another widget that displays a weighting for how enjoyable each animal's life is (positive-welfare side of the ledger, not just suffering — pasture-raised beef, free-range eggs, etc.)
- [x] Putting it together: final widget showing suffering-days in your diet, weighted by each animal's experience (combines pain-model × life-calendar × diet composition)
- [ ] Experiment with using the Rethink Priorities welfare ranges as the suffering-days weighting (the pre-Tomasik implementation). Compare side-by-side to see how the verdict shifts — and whether a toggle or a second card is worth it.

## Design

- [ ] Fix the hand-drawn animal icons in `src/data/farming.js` — current outlines are rough; find a proper icon set (Phosphor? custom commission?) or switch to photographic/illustrated badges

## Done

- [x] Fix `--` to en dash replacement in markdown processing (smartypants option not working with marked)
- [x] Add footnote support — Tufte-style sidenotes that appear alongside the text rather than at the bottom
- [x] Simplify widget placement in markdown — replace the multi-line `--- WIDGET: ... ---` blocks with something cleaner (e.g. `{{widget:pain-model}}`)
