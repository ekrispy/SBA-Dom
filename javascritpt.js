// I saw this on google and other exapmles to add this Domcontentloaded event listener...
document.addEventListener('DOMContentLoaded', () => {
    const dinnerEl = document.getElementById("randomDins");
    const listEl = document.getElementById("list");
    

    document.getElementById("button").addEventListener("click", () => {
        form.style.display = "block";
      generateIngredients(); // this allows the button to generate the lists and full page
    });

const proteins = ["chicken", "beef", "pork", "lamb", "cod", "egg", "chickpea", "sardines", "tofu", "shrimp", "mackerel", "crab", "scallops", "squid"];
const carbs = ["rice", "pasta", "quinoa", "potatoes", "sweet potato"];
const vegetables = ["carrots", "broccoli", "spinach", "cucumber", "onion", "celery", "peas", "kale", "okra", "squash", "celery", "cabbage", "peppers", "tomatoes", "zucchini", "avocado", "cauliflower", "cucumber", "celery", "peas", "kale", "okra", "squash", "celery", "cabbage", "peppers", "tomatoes", "zucchini", "avocado", "cauliflower"];
const fullRecipes = ["Spaghetti", "Mac 'n' cheese", "Lasagna", "Pad Thai", "Soup", "Nachos", "Stir fry", "Burritos", "Pancakes", "Quiche", "Risotto", "Quesadilla", "Enchilada", "Fajitas", "Chili", "Chowder", "Stir fry", "Pizza", "Crock Pot Mush"];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


function generateIngredients() {
    try {
    let dinners = []; 
    for (let day of days) { // loops through the days to  add dinner to the array
        dinners.push(createMealFrom(proteins, carbs, vegetables, fullRecipes));
    }

    const shoppingList = createShoppingListFor(dinners);

    showDinners(dinners, dinnerEl); // calls the function to show the dinner list
    showShopping(shoppingList, listEl); // calls the function to show the shopping list
} catch (error) {
    console.log(error);
    alert("an error occured, please try again");
}
}

function randomFoodIngredients(ingredients) {
    // this function returns a random food ingredient
    return ingredients[Math.floor(Math.random() * ingredients.length)];
}

function createMealFrom(proteins, carbs, vegetables, fullRecipes) {
    const randomProtein = randomFoodIngredients(proteins); // had to add this because my initial code was not counting the protiens correcty and includiing words in the dinner list
    // returns an array of objects for the meals 
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
        // used the filter method to remove the full recipe from the dinner lists
        // spread operator is used to add the full recipe to the shopping list
        ingredients = [
         ...ingredients,
         ...dinner.filter(ingredient => ingredient.type!== 'fullRecipe')
        ];
    });

    let shoppingList = {};
    for (const ingredient of ingredients) {
        // used the toLowerCase method to make the shopping list case insensitive
        const ingredientName = ingredient.name.toLowerCase();
        // if the ingredient name is already in the shopping list then this will add one to the count or more if it already exists
        shoppingList[ingredientName] = (shoppingList[ingredientName]? shoppingList[ingredientName] + 1 : 1);
    }
    return shoppingList;
}
function showDinners(dinners, dinnerEl) {
    // create a ul element
    const ul = document.createElement("ul");
    ul.classList.add("dinner-list"); // create a class
    //create a lable
    const label = document.createElement("h2");
    //create another lable
    const label2 = document.createElement("h4");
    label2.innerText = "If you don't like the dinner, click the day to strike it out!";
    label.innerText = "Dinners:";
    dinnerEl.innerHTML = "";

    // append the lables to the dinner element
    dinnerEl.appendChild(label2);
    dinnerEl.appendChild(label);

    dinners.forEach((dinner, index) => { // lop through the dinner array
        const li = document.createElement("li");
        // this helped to the day to get where it needed it to be based on the index
        const day = index === 0? 'Monday' : index === dinners.length - 1? 'Friday' : days[index];
        let mealText = '  ';
        dinner.forEach(ingredient => { // lop through the dinner array
            const ingredientEl = document.createElement("span"); // create span element
            // set the text content of the span element for the name of the ingredient
            ingredientEl.innerText = ingredient.name + " ";
            // this helped used the connector (with) to add the with to the dinner list
            if (ingredient.type === 'connector') {
                mealText += ingredient.name + ' ';
            } else {
                mealText += ingredientEl.outerHTML;
            }
        });
        // the text will be displayed as the day and the meal text
        li.innerHTML = `${day}: ${mealText}`;
        ul.appendChild(li);

        li.addEventListener('click', (event) => {
            if (event.target instanceof HTMLLIElement) {
                // googled helped with this, this toggles the strikethrough
                // when i firt used it you could click anywhere where the dinner list was and it would strikethrough everything
                event.target.classList.toggle('strikethrough');
            }
        });
    });
    // append the ul to the dinner element
    dinnerEl.appendChild(ul);
}


// alot of the commmets above are almost the same for bellow
function showShopping(shopping, listEl) {
    const ul = document.createElement("ul");
    ul.className = "shopping-list"; // Add a class to the ul element
    const label = document.createElement("h2");
    label.innerText = "Shopping List: If you already have it in your fridge, remove it from the list.";
    listEl.innerHTML = "";
    
    listEl.appendChild(label);
  
    for (const [num, ingredient] of Object.entries(shopping)) {
        // if the ingredient is not with do not add it to the shopping list
      if (num!== "with") {
        const li = document.createElement("li");
        li.className = "shopping-item"; // Add a class to the li element
        const itemNameEl = document.createElement("span");
        itemNameEl.innerText = ingredient;
        const quantityEl = document.createElement("span");
        quantityEl.innerText = num; // used this to add the number of ingredients
        const removeBtn = document.createElement("button"); // helped create a button
        removeBtn.innerText = "Remove";
        removeBtn.className = "remove-btn"; // Add a class to the button
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
      // set the inner text for the protiens to 1, had to add this because initilly it was not working correctly
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


// this form is to submit the email and name for the dinner and shopping lists 
const dinnerForm = document.querySelector("#dinnerForm");

dinnerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const link = "mailto:youremail@example.com"; 
  window.open(link);
});

const email = form.elements["email"];
const name = form.elements["name"];
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

  function validateName() {
    if (name.value === "") {
      alert("Please provide a name.");
      name.focus();
      return false;
    }
    return name.value;
  }
  form.addEventListener("blur", validateName);

  // not to sure if this was the correct way to clone something, but added it to show how to do it
  const dinnerTempate = document.querySelector("#dinnerTemplate");
  const dinnerList = document.querySelector("#list");
  const clone = dinnerTempate.content.cloneNode(true);
  const button = document.querySelector("#button");
  button.addEventListener("click", () => {
    dinnerList.innerHTML = "";
    dinnerList.appendChild(clone);
    dinnerList.style.display = "block";
  });
  
});

