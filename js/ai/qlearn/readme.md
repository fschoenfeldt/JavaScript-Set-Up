# qlearn

Do not use this library if a situation is not going to happen twice. Or if the possible actions is infinite.

The strength of qlearn is its simplicity, and its independence towards the decision taker.

## concepts

### hashedState

Hashed State is a string that uniquely idendifies a state and a set of action. What it means is that two situation where the possible actions are the same, and the observed state is the same, should have the same hashedState.

### actions

An action that is taken should have an effect on the state, and sometimes the reward. `.decide() and .learn()` take an array of action names, not the actions themselves.

### reward

Rewards will be used to correct the behaviour of the intelligence over time. Use negative rewards for punishment.


## install

```
npm i qlearn
```

## import

```
import {createIntelligence} from "qlearn";
import {createIntelligence} from "https://unpkg.com/qlearn@1.0.2/source/qlearn.js";
```

## usage

### creation

```
const intelligence = createIntelligence();
```

### override all options

```
Object.assign(intelligence, {
    defaultQuality: 0,
    learnFactor: 0.5,
    discountFactor: 0.9,
    exploreBonus: 0.04,
    qualityMap: {}
});
```

### `.decide()`

The actionName will be random if this hashedState was never encountered before.

Will use `.qualityMap`.


```
const actionName = intelligence(hashedState, actionNames);
```

### `.learn()`

Use it as soon as reward is available after `.decide()`.

previousHashedState and hashedStateAfter may be equal if the action taken had no effect.

Will update `.qualityMap`.

Note: It is possible to learn even if the decision of the `previousAction` did not come from `.decide()`, for example: If a human decides, the `.learn()` can still be used.

```
intelligence.learn(
    previousHashedState, hashedStateAfter,
    previousAction, actionNames, reward
);
```

### `.qualityMap`

Note: save() and load() is not provided.

```
const {qualityMap} = intelligence;
save(qualityMap);
```

```
intelligence.qualityMap = load(`qualityMap`);
```

### `.defaultQuality`

```
intelligence.defaultQuality = 0;
```

### `.learnFactor`

`0 < learnFactor < 1 `

```
intelligence.learnFactor = 0.5;
```

### `.discountFactor`


`0 < discountFactor < 1 `

```
intelligence.discountFactor = 0.9;
```

### `.exploreBonus`

A positive number to encourage exploration, a negative number to discourage exploration.
Ideally orders of magnitude smaller than a normal reward.

```
intelligence.exploreBonus = 0.04;
```

## Related

https://github.com/acupajoe/node-qlearning

 * full flow integrated (state, reward, etc)
 * includes state hasher
 * more opionated, less flexible

### License

[CC0](./license.txt)