## Possible Hands

We can calculate the total number of possible 5 card draw hands in a standard deck of 52 cards with the combination formula.

nCr = n! / r!(n-r)!

n = total number of objects in the set
r = number of choosing objects from the set

Since we have 52 total cards, n=52
And we are making 5 card hands, so r=5;

This gives us

52! / (47! \* 5!)

52 _ 51 _ 50 _ 49 _ 48 _ 47! /
47! _ 5 _ 4 _ 3 \* 2

The 47! cancels out from the top and bottom.

52 _ 51 _ 50 _ 49 _ 48 /
5 _ 4 _ 3 \* 2

Further cancelling out comment denominators

We are left with

26 _ 17 _ 5 _ 49 _ 24

2,598,960 total possible 5 card poker hands.

## Royal Flush Odds

There are only 4 ways to make a royal flush -- One for each of the 4 suits.

10♣ J♣ Q♣ K♣ A♣
10♦ J♦ Q♦ K♦ A♦
10♥ J♥ Q♥ K♥ A♥
10♠ J♠ Q♠ K♠ A♠

These are the only 4 combinations for a Royal Flush. (In poker the order of the cards doesn't matter)

So the odds of a royal w/o drawing is

4 / 2,598,960

or 1 / 649740

.00000154

.000154%

## Straight Flush Odds

There are 9 ways to make a straight flush for each of the 4 suits.

A2345
23456
34567
45678
56789
6789T
789TJ
89TJQ
9TJQK

For a total of 36 possible Straight Flush combinations.

So the odds of a Straight Flush is

36 / 2,598,960

.0000139
.00139%

## Four of a kind

13 Different Ranks. So 13 differnt 4 of a kinds by rank value. But we also have to account for the 5th card.

4 of the cards must be the same rank. The last card can be any of the remaining 48 cards.

So we have

```
13 * 48
```

624 total 4-of-a-kind combinations.

624 / 2,598,960

.00024
.024%

4164 : 1

## Full House

This requires a 3-of-a-kind AND A pair

Our math starts to get a little trickier here.

13 ranks

13c1

There are 4 of each rank, but we only need 3.

4c3

Then for a pair, we have 12 remainign ranks to choose from.

12 ranks.

12c1

Again there exist 4 cards of each rank, but we only need 2.

4c2.

So we are left with.

```
13c1 * 4c3 * 12c1 * 4c2

This simplifies to

13 * 4 * 12 * 6 = 7488

```

3,744 / 2,598,960

.00144

.14%


## 3 of a kind
13 ranks, 3card combinatinos for that rank, any of the remaining 12 ranks
13c1 * 4c3 * 48 * 44

109824



