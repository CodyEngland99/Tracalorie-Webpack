import "@fortawesome/fontawesome-free/js/all";
import { Modal, Collapse } from "bootstrap";
import CalorieTracker from "./Tracker";
import FitnessAndDiet from "./Item";

import "./css/bootstrap.css";
import "./css/style.css";
class App {
	constructor() {
		this._tracker = new CalorieTracker();
		document
			.getElementById("meal-form")
			.addEventListener("submit", this._newMeal.bind(this));
		document
			.getElementById("workout-form")
			.addEventListener("submit", this._newWorkout.bind(this));

		// DELETE BUTTONS LISTENER
		document
			.getElementById("meal-items")
			.addEventListener("click", this._removeMeal.bind(this));
		// DELETE BUTTONS LISTENER
		document
			.getElementById("workout-items")
			.addEventListener("click", this._removeWorkout.bind(this));

		document
			.getElementById("reset")
			.addEventListener("click", this._resetDay.bind(this));

		document
			.getElementById("limit-form")
			.addEventListener("submit", this._setLimit.bind(this));

		document
			.getElementById("filter-meals")
			.addEventListener("input", this._filterItems.bind(this, "meal"));
		document
			.getElementById("filter-workouts")
			.addEventListener("input", this._filterItems.bind(this, "workout"));

		this._tracker.loadItems();
	}

	_newMeal(event) {
		event.preventDefault();

		const mealName = document.getElementById("meal-name");
		const mealCalories = document.getElementById("meal-calories");

		if (mealName.value === "" && mealCalories.value === "") {
			alert("Please fill out both meal name and calories of meal");
			return;
		} else if (mealName.value === "") {
			alert("Please fill out meal name");
			return;
		} else if (mealCalories.value === "") {
			alert("Please fill out meal calories");
		}

		const meal = new FitnessAndDiet(mealName.value, mealCalories.value);

		this._tracker.addMeal(meal);

		mealName.value = "";
		mealCalories.value = "";
	}

	_newWorkout(event) {
		event.preventDefault();

		const workoutName = document.getElementById("workout-name");
		const workoutCalories = document.getElementById("workout-calories");

		if (workoutName.value === "" && workoutCalories.value === "") {
			alert("Please fill out both meal name and calories of meal");
			return;
		} else if (workoutName.value === "") {
			alert("Please fill out meal name");
			return;
		} else if (workoutCalories.value === "") {
			alert("Please fill out meal calories");
		}

		const workout = new FitnessAndDiet(
			workoutName.value,
			workoutCalories.value
		);

		this._tracker.addWorkout(workout);

		workoutName.value = "";
		workoutCalories.value = "";
	}

	_removeMeal(event) {
		if (
			event.target.classList.contains("delete") ||
			event.target.classList.contains("fa-solid")
		) {
			this._tracker.removeMeal(event.target);
		}
	}

	_removeWorkout(event) {
		if (
			event.target.classList.contains("delete") ||
			event.target.classList.contains("fa-solid")
		) {
			this._tracker.removeWorkout(event.target);
		}
	}

	_resetDay() {
		this._tracker.resetDay();
	}

	_setLimit(event) {
		event.preventDefault();

		const userLimit = document.getElementById("limit");

		if (userLimit.value === "") {
			alert("Please fill out field for Calorie Limit");
		} else {
			this._tracker.setLimit(userLimit.value);
			userLimit.value = "";
		}

		const modalEle = document.getElementById("limit-modal");
		const modal = Modal.getInstance(modalEle);
		modal.hide();
	}

	_filterItems(type, e) {
		const text = e.target.value.toLowerCase();

		document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
			const name = item.firstElementChild.firstElementChild.textContent;

			if (name.toLowerCase().indexOf(text) !== -1) {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
		});
	}
}

function init() {
	new App();
}

init();
