document.addEventListener('DOMContentLoaded', () => {
    const dinnerEl = document.getElementById("randomDins");
    const listEl = document.getElementById("list");

    document.getElementById("button").addEventListener("click", () => {
        form.style.display = "block";
      generateIngredients();
    });

const proteins = ["chicken", "beef", "pork", "lamb", "cod", "egg", "chickpea", "sardines", "tofu", "shrimp", "mackerel", "crab", "scallops", "squid"];
const carbs = ["rice", "pasta", "quinoa", "potatoes", "sweet potato"];
const vegetables = ["carrots", "broccoli", "spinach", "cucumber", "onion", "celery", "peas", "kale", "okra", "squash", "celery", "cabbage", "peppers", "tomatoes", "zucchini", "avocado", "cauliflower", "cucumber", "celery", "peas", "kale", "okra", "squash", "celery", "cabbage", "peppers", "tomatoes", "zucchini", "avocado", "cauliflower"];
const fullRecipes = ["Spaghetti", "Mac 'n' cheese", "Lasagna", "Pad Thai", "Soup", "Nachos", "Stir fry", "Burritos", "Pancakes", "Quiche", "Risotto", "Quesadilla", "Enchilada", "Fajitas", "Chili", "Chowder", "Stir fry", "Pizza", "Crock Pot Mush"];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

let plate = [];

function generateIngredients() {
    let dinners = [];
    for (let day of days) {
        dinners.push(createMealFrom(proteins, carbs, vegetables, fullRecipes));
    }

    const shoppingList = createShoppingListFor(dinners);

    showDinners(dinners, dinnerEl);
    showShopping(shoppingList, listEl);
}

function randomFoodIngredients(ingredients) {
    return ingredients[Math.floor(Math.random() * ingredients.length)];
}

function createMealFrom(proteins, carbs, vegetables, fullRecipes) {
    const randomProtein = randomFoodIngredients(proteins);
    return [
        { name: randomFoodIngredients(fullRecipes), type: 'fullRecipe' },
        { name: 'with', type: 'connector' },
        { name: randomProtein, type: 'protein' },
        { name: randomFoodIngredients(carbs), type: 'carb' },
        { name: randomFoodIngredients(vegetables), type: 'vegetable' },
        { name: randomFoodIngredients(vegetables), type: 'vegetable' },
        { name: randomFoodIngredients(vegetables), type: 'vegetable' },
    ];
}

function createShoppingListFor(dinners) {
    let ingredients = [];

    dinners.forEach(dinner => {
        ingredients = [
         ...ingredients,
         ...dinner.filter(ingredient => ingredient.type!== 'fullRecipe')
        ];
    });

    let shoppingList = {};
    for (const ingredient of ingredients) {
        const ingredientName = ingredient.name.toLowerCase();
        shoppingList[ingredientName] = (shoppingList[ingredientName]? shoppingList[ingredientName] + 1 : 1);
    }
    return shoppingList;
}
function showDinners(dinners, dinnerEl) {
    const ul = document.createElement("ul");
    const label = document.createElement("h2");
    const label2 = document.createElement("h4");
    label2.innerText = "If you don't like the dinner, click the day to strike it out!";
    label.innerText = "Dinners:";
    dinnerEl.innerHTML = "";
    dinnerEl.appendChild(label2);
    dinnerEl.appendChild(label);

    dinners.forEach((dinner, index) => {
        const li = document.createElement("li");
        const day = index === 0? 'Monday' : index === dinners.length - 1? 'Friday' : days[index];
        let mealText = '  ';
        dinner.forEach(ingredient => {
            const ingredientEl = document.createElement("span");
            ingredientEl.innerText = ingredient.name + " ";
            if (ingredient.type === 'connector') {
                mealText += ingredient.name + ' ';
            } else {
                mealText += ingredientEl.outerHTML;
            }
        });
        li.innerHTML = `${day}: ${mealText}`;
        ul.appendChild(li);

        li.addEventListener('click', (event) => {
            if (event.target instanceof HTMLLIElement) {
                event.target.classList.toggle('strikethrough');
            }
        });
    });
    dinnerEl.appendChild(ul);
}



function showShopping(shopping, listEl) {
    const ul = document.createElement("ul");
    ul.className = "shopping-list"; // Add a class to the ul element
    const label = document.createElement("h2");
    label.innerText = "Shopping List: If you already have it in your fridge, remove it from the list.";
    listEl.innerHTML = "";
    
    listEl.appendChild(label);
  
    for (const [num, ingredient] of Object.entries(shopping)) {
      if (num!== "with") {
        const li = document.createElement("li");
        li.className = "shopping-item"; // Add a class to the li element
        const itemNameEl = document.createElement("span");
        itemNameEl.innerText = ingredient;
        const quantityEl = document.createElement("span");
        quantityEl.innerText = num;
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.addEventListener("click", () => {
          li.remove();
        });
        li.appendChild(itemNameEl);
        li.appendChild(quantityEl);
        li.appendChild(removeBtn);
        ul.appendChild(li);
      }
    }
  
    // Add proteins to the shopping list (without extra words)
    const proteinList = proteins.filter(protein =>!Object.keys(shopping).includes(protein.toLowerCase()));
    for (const protein of proteinList) {
      const li = document.createElement("li");
      li.innerText = `${1} ${protein}`;
      li.className = "shopping-item"; // Add a class to the li element
      const removeBtn = document.createElement("button");
      removeBtn.innerText = "Remove";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => {
        li.remove();
      });
      li.appendChild(removeBtn);
      ul.appendChild(li);
    }
  
    listEl.appendChild(ul);
  }



const dinnerForm = document.querySelector("#dinnerForm");

dinnerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const link = "mailto:youremail@example.com"; 
  window.open(link);
});

function validateEmail(evt) {
    let emailVal = email.value;
  
    const atpos = emailVal.indexOf("@");
    const dotpos = emailVal.lastIndexOf(".");
  
    if (atpos < 1) {
      alert(
        "Your email must include an @ symbol, which must not be at the beginning of the email."
      );
      email.focus();
      evt.returnValue = false;
      return false;
    }
  
    if (dotpos - atpos < 2) {
      alert(
        "Invalid structure: @.\nYou must include a domain name after the @ symbol."
      );
      email.focus();
      evt.returnValue = false;
      return false;
    }
  
    evt.returnValue = true;
    return emailVal;
  }
  
  form.addEventListener("submit", validateEmail);
});