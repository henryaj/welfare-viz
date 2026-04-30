---
title: Weighing animal minds
author: Henry Stanley
created: 2026-04-18
updated: 2026-04-18
---

It's hard to have a clear understanding of the experience of different farmed
animals. Do they feel pain, and how much? How much 'suffering' goes into each
animal's life, and how does that translate to what goes onto your plate? What
foods should you cut out first if you care about animal welfare?

The answers hinge on a number of assumptions. We're going to explore some of
them here. You can build your intuition, and see what assumptions your beliefs
hinge on.

# How much can animals suffer?

Different kinds of farmed animals are treated differently. They undergo
different procedures, they're kept in different conditions, they live for
different amounts of time. Each day of each animal's life might be better or
worse than others'. Not only this, but animals probably differ in their
internal experiences and their ability to feel pain.

There are many unanswered questions here. We're confident that vertebrates feel
pain, but how intensely? We're increasingly confident that crustaceans like
lobsters feel pain, and many countries have banned the practice of boiling them
animals alive[^1]. Can insects feel pain? How can we weigh up the pain a
chicken feels when it's being debeaked against a lamb being castrated?

[^1]: Switzerland banned the practice in 2018. The UK followed in 2022,
    recognising some crustaceans and cephalopods as sentient beings.

There are a few ways to tackle some of these questions.

# Comparing animal brains

Brain size is one proxy we can use to compare different animals' experiences.
If we assume that chickens and cows feel pain, we can use a few metrics to try
to establish how similar their experiences are.

A simple way to do this would be to compare the mass of each animal's brain.
Chickens have much smaller brains than cows -- we might assume then that
the amount they suffer would be proportionally smaller.

But the mass of a brain doesn't necessarily correlate to the number of neurons,
the basic machinery of the brain. A more sophisticated metric would be neuron
count -- twice as many neurons implies double the ability to feel pain.

But the parts of the brain that respond to pain are a small
proportion of the brain's overall mass. These parts of the brain are highly
conserved, as one would expect for something as important as sensing pain -- a
crucial function in keeping an animal alive and causing it to move away from
danger. The parts of the brain that evolved later might not be relevant in
considering an animal's capacity for pain.

But pain circuitry is a small, evolutionarily conserved sliver of the brain.
The structures that matter, like the brainstem, thalamus, and cingulate, are
broadly shared across vertebrates. Sensing injury is too useful to reinvent.
Most of the extra tissue in a cow's brain is running a larger body, not feeling
more pain. Counting every neuron treats all of it as pain-relevant, and it
almost certainly isn't.

Fish don't have a cortex like mammals[^2]. But there's increasing consensus that
they feel pain, too -- they have pain-like responses to things that might hurt
them, and they are intelligent enough to use tools, learn from their
experiences, and avoid locations where they've previously been hurt.

[^2]: Fish do have a pallium, sometimes treated as an analog to a cortex.

**Below you can explore some different ways to think about how different animals
might feel pain based on different assumptions** -- whether it's just neuron
count that matters, log neurons (which increases the weight given to smaller
animals), cortical neurons (which means that fish and shrimp don't count at
all).

We also include a weighting from the [Rethink Priorities Moral Weight
Project](https://rethinkpriorities.org/research-area/welfare-range-estimates/),
which combines evidence from across neuroscience and behavioural studies to
attempt to quantify different animals' moral weights.

{{widget:pain-model
  brain-mass: Implies double the brain size, double the amount of pain felt. But doesn't consider how many neurons are in the brain, or whether the extra parts of the brain in higher mammals are involved in feeling pain.
  linear-neurons: Twice as many neurons means twice as much potential suffering. More plausible than brain mass, but assumes that all neurons are involved in feeling pain. This would for example mean that cows suffer only 3% as much as humans for the same experience.
  cortical-neurons: Only the cortex (or its equivalent) matters for suffering. Fish and shrimp have no cortex, so they get no weight, although we know they respond to painful stimuli and learn to avoid them over time.
  neurons-squared: Pain capacity scales with the square of neuron count. A steep discount that makes small-brained animals nearly negligible.
  log-neurons: Pain capacity scales with the logarithm of neuron count. This gives a flatter curve that gives smaller-brained animals more moral weight. Plausible given that the brain structures involved in responding to pain represent a small amount of the total number of neurons.
  rp-welfare: Estimates from the Rethink Priorities Moral Weight Project, which combines neurophysiological and behavioural evidence into a weight for each animal.
}}


# Counting life-days per animal

Farmed animals are very different sizes -- shrimp are tiny, and you could
consume a dozen in a single meal. Cows are very large; you might consume only a
small fraction of a cow in a single meal. 

One way to think about this is 'life-days'. Two animals might live similar
lives for the same length of time -- but if one is much larger than another,
each meal you have will have fewer life-days in it. A cow is much larger than a
chicken; if each lived for a year, a hamburger might represent only 1% of that
cow's life-days, but a chicken breast might represent 25% of the chicken's
life-days.

This means different diets can represent very different numbers of life-days.
If you eat a lot of chicken, this number could be very large. If you only eat
beef, it'll be much smaller.

{{widget:life-days
  lifespan: Dairy cows live for six years on average. Chickens raised for meat live for just 42 days.
  edible: Dairy cows produce a large amount of milk over their lifetime. Salmon, shrimp and chickens are small, so provide a tiny amount of food per animal.
  lifedays: Combining the two, we see that shrimp, fish, eggs and chicken are by far the largest contributors to life-days.
}}

# How good are animals' lives?

We've counted how many 'days' of animal life go into different foods. But
animals aren't all treated the same. Pasture-raised cattle likely have a
better time than factory-farmed broiler chickens. We need to consider:

- **how good their lives are** - some animals are well-treated, others subject to
    painful procedures and poor conditions
- **how good their deaths are** - some animals die quickly, others slowly and
    painfully

Click an animal below to see a summary of how they live and die. We provide an
example weighting to compare how good or bad an animal's typical experience is,
normalized to beef cows (which likely have the best lives of all farmed
animals).

{{widget:animal-lives
  intro: Each animal's life and death can be given a rough numerical weight — how intense a typical day of their life is, and how bad the slaughter event is. Combined with their size, this gives us a "suffering-days per kg" figure that drives the final diet calculator below.
  chicken-life:
    Bred for unnaturally fast weight gain. Many are unable to walk as their legs
    break under their large weight, so they starve. Kept in cramped conditions,
    tens of thousands in a single shed. Ammonia-soaked litter causes chemical
    burns.
  chicken-death:
    Chickens are shackled upside-down on a conveyor. They pass through an
    electrified water bath to stun them, then their throats are slit causing
    them to bleed out. Finally they enter a scalding tank to remove feathers. If
    stunning fails then the chicken enters the scalding tank conscious.
  eggs-life:
    Layer hens have their beaks trimmed using a hot blade. They live in cages or
    barns in the case of cage-free eggs, usually with less than a square foot of
    space per bird. They can't stretch their wings or stand fully upright, and
    might have bone fractures or osteoporosis. Male chicks do not lay eggs so
    are destroyed when they hatch, either by gassing or maceration (grinding).
  eggs-death:
    When their egg production rate falls, layer hens are stunned in an
    electrified water bath and have their throats slit.
  pig-life:
    Pigs have their tails docked and teeth clipped in their first week of life.
    Males are castrated without anesthetic to ensure their meat does not taste
    'gamey'. Typically kept in concrete pens without bedding in crowded sheds.
    Sows are confined to gestation crates, although these are increasingly being
    banned. 
  pig-death:
    Stunned by electric prong or by CO₂ gassing. CO₂ causes a suffocating
    feeling, so the pigs thrash and vocalise for up to thirty seconds. They are
    then hoisted up and bled.
  beef-life:
    Most are born on pasture and move to feedlots for the final 3-6 months of
    life. Subjected to dehorning, branding, and castration without anesthetic.
    Often are transported long distances which causes distress.
  beef-death:
    Stunned by a captive bolt gun to the forehead, then hosted up and bled.
    Bolt misfires 1-5% of the time, requiring them to be re-stunned or ending
    with them bled while partly conscious.
  dairy-life:
    Cows are artificially inseminated to keep them pregnant so they continue to
    produce milk. Their calves are taken at birth. High lates of lameness and
    mastitis. Mostly confined to sheds, with some time at pasture.
  dairy-death:
    Stunned by a captive bolt gun to the forehead, then hosted up and bled.
    Bolt misfires 1-5% of the time, requiring them to be re-stunned or ending
    with them bled while partly conscious.
  salmon-life:
    Kept in sea cages with tens of thousands of fish per pen. Often afflicted by
    sea lice which eat through skin and flesh. High levels of mortality between
    stocking and harvest. Mass die-offs are common. Cannot express natural
    migration behaviours.
  salmon-death:
    Percussive or electrical stunning before bleed out. Some plants use
    CO₂-saturated water with fish actively try to escape.
  shrimp-life:
    Kept in crowded ponds or tanks. Eyestalk ablation used to force female shrimp
    to mature. Outbreaks of disease kill billions of shrimp annually. Sentience is
    uncertain, but increasingly accepted.
  shrimp-death:
    Pond is drained and shrimp scooped into ice slurries, causing suffocation
    and freezing. Pre-slaughter electrical stunning exists but is uncommon.
}}

# What's in a diet?

Eating a different diet means eating different animals. Combining the per-kg
weighting above with what people actually eat across the year shows which
products dominate the total — and which levers matter most if you're trying
to reduce your impact.

The two bars below show the same diet under two framings: raw **life-days**
(ignoring sentience or treatment) and Tomasik's **suffering-days** weighting,
which bakes in how intensely each species likely suffers and how bad the
slaughter event is.

{{widget:diet-calculator
  intro: Different diets translate into very different numbers. Pick a diet to see its totals, and use "Compare to" if you want to see two diets side by side.
  european: Fish consumption dominates the number of life-days in their diets -- 90% coming from fish alone. 
  american: Americans consume less fish than Europeans, but much more chicken -- 46kg per person per year. This makes chicken the single biggest source of suffering.
  uk: Brits eat slightly less fish than on the continent, and slightly less chicken than Americans.
  vegetarian: Vegetarians don't eat meat or fish, cutting out much of the suffering in their diets. But 300 eggs a year still produces over a thousand days of suffering. Replacing beef with eggs is probably bad on net from a welfare perspective, which isn't totally intuitive.
  vegan: Vegans don't consume animal products, so their numbers here are zero by definition. Like all diets, crop farming still has indirect impacts on animals (rodents, insects, displaced wildlife) that aren't modelled here.
}}

These are relatively simple models — they account for how many animals get
eaten in a given diet, how many days of each animal's life that corresponds
to, and how much those animals likely suffer.

There is a lot of uncertainty in these numbers. We haven't considered shrimp
(increasingly thought to feel pain), the wild fish caught and fed to farmed
fish, or the difference between how factory farmed, free range and
pasture-raised animals are treated.

{{break}}

<aside class="cta">

If the idea that animals' experiences might differ this much already changes
how you think, consider [donating to effective
organisations](https://animalcharityevaluators.org/) which seek to reform the
way we raise animals for food, [pay for
'offsets'](https://www.farmkind.giving/) to cover the animals you consume, or
think about where you could cut back.

</aside>


# Sources and methodology

**Pain weighting models.** We use neuron counts from [Herculano-Houzel
(2009)](https://doi.org/10.3389/neuro.09.031.2009). Salmon neuron counts are
extrapolated from zebrafish data and are highly uncertain.

**Rethink Priorities welfare ranges.** The RP welfare range estimates are
midpoint values from the [Rethink Priorities Moral Weight
Project](https://rethinkpriorities.org/research-area/an-introduction-to-the-moral-weight-project/)
(Fischer et al., 2022), which combines neurophysiological and behavioural
evidence to estimate different species' capacity for welfare. Cows were not
directly studied by RP so we use the pig estimate (0.55) per [this
comment](https://forum.effectivealtruism.org/posts/tnSg6o7crcHFLc395/the-welfare-range-table?commentId=qkrSRQY6kSwkDmXZB)
from Fischer.

**Lifespan and yield data.** Farmed animal lifespans and edible yields are
drawn from [Tomasik (2007, updated
2018)](https://reducing-suffering.org/how-much-direct-suffering-is-caused-by-various-animal-foods/)
and USDA statistics. Dairy cow "edible kg" represents total milk yield over a
six-year lifespan. Egg yield is measured in individual eggs (assuming one egg
weighs 55g).

**Diet composition.** Per-capita consumption figures vary in provenance. Fish
counts in particular carry factor-of-two uncertainty because FAO publishes
landings only in tonnes, and converting to kg-per-person relies on species-mix
assumptions (mean fish weight varies by approx. 1,000× across the species a
Westerner eats -- from 10 g sardines to 50 kg tuna). Numbers here are tentative.

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
  2025 edition (22.89 kg apparent seafood consumption, 2023).
  <!-- TODO(henry): confirm whether 22.89 kg is LWE per capita or edible weight. -->
- *British*: beef 17 kg, pork 22 kg, chicken 34 kg, fish 18 kg, eggs 200,
  milk 250 kg. From Defra's *[Agriculture in the United Kingdom 2024,
  Chapter 8](https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom-2024/chapter-8-livestock)*
  (1.18 billion broilers × approx. 1.9 kg edible weight, divided by 67m
  population); fish from FAO Food Balance Sheets UK supply-side estimate
  (approx. 18 kg/year).
  <!-- TODO(henry): FAO Food Balance Sheets UK link needs fixing. -->
- *Vegetarian*: eggs 300, milk 320. Rough estimate assuming protein
  substitution; the lacto-ovo intake literature is thin. EPIC-Oxford and
  NDNS both suggest vegetarian egg and dairy intake is modestly elevated
  over omnivores.
- *Vegan*: zero for all animal products by definition.
