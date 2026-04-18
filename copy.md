---
title: Weighing animal minds
author: Henry Stanley
created: 2026-04-14
updated: 2026-04-14
---

It's hard to have a clear understanding of the experience of different farmed
animals. How much can they feel pain? How much 'suffering' goes into each
animal's life, and how does that translate to what goes onto your plate? What
foods should you cut out first if you care about animal welfare?

The answers hinge on a number of assumptions. We're going to explore some of
them here. You can build your intuition, and see what assumptions your beliefs
hinge on.

# How much can animals suffer?

Different kinds of farmed animals are treated differently. They undergo
different procedures, they're kept in different conditions, they live for
different amounts of time. Not only this, but animals probably differ in their
internal experiences and their ability to feel pain.

There are many unanswered questions here: we're confident that vertebrates feel
pain, but how intensely? We're increasingly confident that cephalopods like
lobsters feel pain -- many countries have banned the practice of boiling these
animals alive[^1]. Can insects feel pain? How can we weigh up the pain a chicken
feels when it's being debeaked against a lamb being castrated?

[^1]: Switzerland banned the practice in 2018. The UK followed in 2022,
    recognising some crustaceans and cephalopods as sentient beings.

There are a few ways to tackle some of these questions.

Brain size is one proxy we can use to compare different animals' experiences.
If we assume that chickens and cows feel pain, we can use a few metrics to try
to establish how similar their experiences are.

A simple way to do this would be to compare the mass of each animal's brain.
Clearly chickens have much smaller brains than cows -- we might assume then that
the amount they suffer would be proportionally smaller.

One issue is that the mass of a brain doesn't necessarily correlate to the
number of neurons, the basic machinery of the brain. A more sophisticated
metric would be neuron count -- twice as many neurons implies double the
ability to feel pain.

But the parts of the brain that respond to pain are a small
proportion of the brain's overall mass. These parts of the brain are highly
conserved, as one would expect for something as important as sensing pain -- a
crucial function in keeping an animal alive and causing it to move away from
danger. The parts of the brain that evolved later might not be relevant in
considering an animal's capacity for pain.

Fish, for example, don't have a cortex. But there's increasing consensus that
they feel pain, too -- they have pain-like responses to things that might hurt
them, and they are intelligent enough to use tools, learn from their
experiences, and avoid locations where they've previously been hurt[^2].

[^2]: Fish can navigate mazes, navigate mazes, remember specific people, and
    learn to avoid areas where they previously encountered painful experiences.

Below, you can explore some different ways to think about how different animals
might feel pain based on different assumptions -- whether it's just neuron
count that matters, log neurons (which increases the weight given to smaller
animals), cortical neurons (which means that fish and shrimp don't count at
all).

We also include a weighting from the Rethink Priorities Moral Weight
Project, which combines evidence from across neuroscience and behavioural
studies to attempt to quantify different animals' moral weights.

{{widget:pain-model
  brain-mass: Implies double the brain size, double the amount of pain felt. But doesn't consider how many neurons are in the brain, or whether the extra parts of the brain in higher mammals are involved in feeling pain.
  linear-neurons: Twice as many neurons means twice as much potential suffering. More plausible than brain mass, but assumes that all neurons are involved in feeling pain. This would for example mean that cows suffer only 3% as much as humans for the same experience.
  neurons-squared: Pain capacity scales with the square of neuron count. A steep discount that makes small-brained animals nearly negligible, ignoring their ability to learn from pain to avoid it.
  cortical-neurons: Only the cortex (or its equivalent) matters for suffering. Fish and shrimp have no cortex, so they get no weight, although we know they respond to painful stimuli and learn to avoid them over time.
  log-neurons: Pain capacity scales with the logarithm of neuron count. This gives a flatter curve that gives smaller-brained animals more moral weight, implying that there are common brain structures involved in feeling pain (which is likely; sensing pain is important for an animal's survival and is probably evolutionarily conserved).
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

Now that we know how many days of life different foods represent, what does a
whole year's diet look like?

# What's in a diet?

Eating a different diet will mean eating different animals. If some animals are smaller and live less long than others, what does that mean for how many animal life-days go into our diets?

Because some animals are so small, and each one makes a very slight contribution to our diets, most life-days are accounted for by smaller animals like shrimp, fish and chicken. The average American, European and British diets differ in their composition, which means different numbers of life-days for each.

{{widget:diet-calculator
  intro: Different diets translate to very different numbers of life-days per year. Brits and Europeans consume more fish than Americans, which translates into more life-days.
}}

The numbers here are surprising – because fish and chickens are so small, they make up almost all of the life-days in our diets. Cows make up a much smaller amount, and dairy almost none.

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

**If this changed your mind about animal welfare, consider [donating to effective
organisations](https://animalcharityevaluators.org/) which seek to reform the
way we raise animals for food, [pay for
'offsets'](https://www.farmkind.giving/) to cover the animals you consume, and
consider changing your diet to reduce the amount of suffering it causes.**

{{break}}

# Sources and methodology

**Pain weighting models.** The neuron-based models (linear, log, squared,
cortical) use neuron counts from [Herculano-Houzel
(2009)](https://doi.org/10.3389/neuro.09.031.2009). Salmon neuron counts are
extrapolated from zebrafish data and are highly uncertain. Shrimp neuron counts
are rough estimates from the literature.

**Rethink Priorities welfare ranges.** The RP welfare range estimates are
midpoint values from the [Rethink Priorities Moral Weight
Project](https://rethinkpriorities.org/research-area/moral-weight/) (Fischer et
al., 2022), which combines neurophysiological and behavioural evidence to
estimate different species' capacity for welfare. Cows were not directly
studied by RP -- we use the pig estimate (0.55) as a proxy.

**Lifespan and yield data.** Farmed animal lifespans and edible yields are
drawn from [Tomasik (2007, updated
2018)](https://reducing-suffering.org/how-much-direct-suffering-is-caused-by-various-animal-foods/)
and USDA statistics. Dairy cow "edible kg" represents total milk yield over a
six-year lifespan. Egg yield is measured in eggs rather than kg (one egg ≈
55g).

**Diet composition.** Per-capita consumption figures for European, American,
and British diets are based on FAOSTAT and USDA food availability data. The
vegetarian preset assumes eggs and dairy only; the vegan preset is zero for all
animal products.
