import Storage from "./Storage";

class CalorieTracker {
	constructor() {
		this._calorieLimit = Storage.getCalorieLimit();
		this._totalCalories = Storage.getTotalCalories();
		this._meals = Storage.getMeals();
		this._workouts = Storage.getWorkouts();
		this._displayCalorieLimit();
		this._render();
	}

	addMeal(meal) {
		this._meals.push(meal);
		this._totalCalories += meal.calories;
		Storage.setTotalCalories(this._totalCalories);
		Storage.saveMeal(meal);
		this._displayNewMeal(meal);
		this._render();
	}

	addWorkout(workout) {
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
		Storage.setTotalCalories(this._totalCalories);
		Storage.saveWorkout(workout);
		this._displayNewWorkout(workout);
		this._render();
	}

	removeMeal(item) {
		const parentElement = item.closest(".card");

		if (parentElement) {
			const id = parentElement.getAttribute("data-id");

			Storage.removeMeal(id);

			const mealToRemove = this._meals.find((meal) => meal.id === id);

			if (mealToRemove) {
				this._totalCalories -= mealToRemove.calories;

				Storage.setTotalCalories(this._totalCalories);

				this._meals = this._meals.filter((meal) => meal.id !== id);

				parentElement.remove();
			}
		}
		this._render();
	}

	removeWorkout(item) {
		const parentElement = item.closest(".card");

		if (parentElement) {
			const id = parentElement.getAttribute("data-id");

			Storage.removeWorkout(id);

			const mealToRemove = this._workouts.find(
				(workouts) => workouts.id === id
			);

			if (mealToRemove) {
				this._totalCalories += mealToRemove.calories;
				Storage.setTotalCalories(this._totalCalories);

				this._workouts = this._workouts.filter(
					(workouts) => workouts.id !== id
				);

				parentElement.remove();
			}
		}
		this._render();
	}

	resetDay() {
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];

		const mealItemsCont = document.getElementById("meal-items");

		const mealItemsKids = mealItemsCont.childNodes;

		mealItemsKids.forEach((item) => {
			item.remove();
		});

		const workoutItemsCont = document.getElementById("workout-items");

		const workoutItemsKids = workoutItemsCont.childNodes;

		workoutItemsKids.forEach((item) => {
			item.remove();
		});

		Storage.clearLocal();

		this._render();
	}

	setLimit(userValue) {
		this._calorieLimit = userValue;
		Storage.setCalorieLimit(userValue);
		this._render();
	}

	loadItems() {
		this._meals.forEach((meal) => {
			this._displayNewMeal(meal);
		});

		this._workouts.forEach((workout) => {
			this._displayNewWorkout(workout);
		});
	}

	_progressBar() {
		const bar = document.getElementById("calorie-progress");

		if (this._meals.length <= 0) {
			return;
		}

		const consumedCalories = this._meals.reduce(
			(total, meal) => total + meal.calories,
			0
		);

		const caloriesRemainingEle = document.getElementById("calories-remaining");

		const parentEle = caloriesRemainingEle.closest(".card-body");

		if (consumedCalories > this._calorieLimit) {
			parentEle.classList.add("bg-danger");
			bar.classList.add("bg-danger");
			parentEle.classList.remove("bg-light");
		} else {
			parentEle.classList.add("bg-light");
			parentEle.classList.remove("bg-danger");
			bar.classList.remove("bg-danger");
		}
		bar.style.width = `${(consumedCalories / this._calorieLimit) * 100}%`;
	}

	_displayCalorieTotal() {
		const calorieTotalEle = document.getElementById("calories-total");
		calorieTotalEle.innerText = this._totalCalories;
	}

	_displayCalorieLimit() {
		const calorieLimitEle = document.getElementById("calories-limit");
		calorieLimitEle.innerText = this._calorieLimit;
	}

	_displayCalorieConsumed() {
		const calorieConsumedEle = document.getElementById("calories-consumed");
		const consumedCalories = this._meals.reduce(
			(total, meal) => total + meal.calories,
			0
		);
		calorieConsumedEle.innerHTML = consumedCalories;
	}

	_displayCalorieBurned() {
		const calorieBurnedEle = document.getElementById("calories-burned");
		const burnedCalories = this._workouts.reduce(
			(total, workout) => total + workout.calories,
			0
		);
		calorieBurnedEle.innerText = burnedCalories;
	}

	_displayCaloriesRemaining() {
		const calorieRemainingEle = document.getElementById("calories-remaining");
		const calorieRemaining = this._meals.reduce(
			(total, meals) => total + meals.calories,
			0
		);

		calorieRemainingEle.innerText = this._calorieLimit - calorieRemaining;
	}

	_displayNewMeal(meal) {
		const mealContainerEle = document.getElementById("meal-items");

		const div = document.createElement("div");
		div.classList.add("card", "my-2");

		div.setAttribute("data-id", meal.id);

		div.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1 item-name">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
    `;

		mealContainerEle.appendChild(div);
	}

	_displayNewWorkout(workout) {
		const workoutContainerEle = document.getElementById("workout-items");

		const div = document.createElement("div");
		div.classList.add("card", "my-2");

		div.setAttribute("data-id", workout.id);
		div.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
    `;

		workoutContainerEle.appendChild(div);
	}
	_render() {
		this._displayCalorieConsumed();
		this._displayCalorieTotal();
		this._displayCalorieBurned();
		this._displayCaloriesRemaining();
		this._displayCalorieLimit();
		this._progressBar();
	}
}

export default CalorieTracker;
