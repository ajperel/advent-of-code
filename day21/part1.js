/**
 * Solutions for Advent of Code 2020, Day 21, Part 1.
 * Original problem: https://adventofcode.com/2020/day/21
 */


let testInput = [
  'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
  'trh fvjkl sbzzf mxmxvkd (contains dairy)',
  'sqjhc fvjkl (contains soy)',
  'sqjhc mxmxvkd sbzzf (contains fish)',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let FOOD_REGEX = /^(?<ingredients>[\w\s]+)(?: \(contains (?<allergens>[\w\s,]+)\))?$/;

let foodTuples = input.map(foodSpec => {
  let {ingredients, allergens} = FOOD_REGEX.exec(foodSpec).groups;

  return {
    ingredientsWithAllergens: new Set(),
    ingredients: new Set(ingredients.split(' ')),
    allergens: new Set(allergens.split(', ')),
  };
});

let set = {
  intersection: (set1, set2) => new Set([...set1].filter(x => set2.has(x))),
  difference: (set1, set2) => new Set([...set1].filter(x => !set2.has(x))),
};

let ingredientAllergenMap = new Map();

let allergenFoodsMap = new Map();
foodTuples.forEach(food => {
  food.allergens.forEach(allergen => {
    let list = allergenFoodsMap.get(allergen) || [];
    list.push(food);
    allergenFoodsMap.set(allergen, list);
  })
});

let lastSize = 0;
do {
  lastSize = ingredientAllergenMap.size;

  allergenFoodsMap.forEach((foodList, allergen) => {
    let knownBadFoods = new Set(ingredientAllergenMap.keys());

    let intersection = new Set(set.difference(foodList[0].ingredients, knownBadFoods));

    for (let i = 1; i < foodList.length; i++) {
      intersection = set.intersection(intersection,
        set.difference(foodList[i].ingredients, knownBadFoods));
    }

    if (intersection.size == 1) {
      ingredientAllergenMap.set([...intersection][0], allergen);
    }
  });

  foodTuples.forEach(food => {
    let knownBadFoods = new Set(ingredientAllergenMap.keys());
    let knownAllergens = new Set(ingredientAllergenMap.values());

    let testIngredients = set.difference(food.ingredients, knownBadFoods);
    let testAllergens = set.difference(food.allergens, knownAllergens);

    if (testAllergens.size == 1 && testIngredients.size == 1) {
      ingredientAllergenMap.set([...testIngredients][0], [...testAllergens][0]);
    }
  });
} while (lastSize != ingredientAllergenMap.size);

let allIngredients = foodTuples.reduce((allIngredients, tuple) => new Set([...allIngredients, ...tuple.ingredients]), new Set());
let allergenIngredients = new Set(ingredientAllergenMap.keys());
let noAllergenIngredients = set.difference(allIngredients, allergenIngredients);

let numOccurencesNoAllergenIngredients = foodTuples.reduce((sum, tuple) => {
  return sum + set.intersection(tuple.ingredients, noAllergenIngredients).size;
}, 0);

// console.log(foodTuples);
// console.log(ingredientAllergenMap);
// console.log(noAllergenIngredients);

console.log(numOccurencesNoAllergenIngredients);





