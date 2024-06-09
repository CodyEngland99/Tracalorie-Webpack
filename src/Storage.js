class Storage {
	static getCalorieLimit(defaultLimit = 2000) {
		let calorieLimit;
		if (localStorage.getItem("calorieLimit") === null) {
			calorieLimit = defaultLimit;
		} else {
			calorieLimit = +localStorage.getItem("calorieLimit");
		}

		return calorieLimit;
	}

	static setCalorieLimit(calorieLimit) {
		localStorage.setItem("calorieLimit", calorieLimit);
	}

	static getTotalCalories(defaultLimit = 0) {
		let totalCalorie;

		if (localStorage.getItem("totalCalorie") === null) {
			totalCalorie = defaultLimit;
		} else {
			totalCalorie = +localStorage.getItem("totalCalorie");
		}
		return totalCalorie;
	}

	static setTotalCalories(calories) {
		localStorage.setItem("totalCalorie", calories);
	}
	static getMeals() {
		let meals;

		if (localStorage.getItem("meals") === null) {
			meals = [];
		} else {
			meals = JSON.parse(localStorage.getItem("meals"));
		}

		return meals;
	}
	static saveMeal(meal) {
		let meals = Storage.getMeals();
		meals.push(meal);
		localStorage.setItem("meals", JSON.stringify(meals));
	}

	static getWorkouts() {
		let workouts;

		if (localStorage.getItem("workouts") === null) {
			workouts = [];
		} else {
			workouts = JSON.parse(localStorage.getItem("workouts"));
		}

		return workouts;
	}
	static saveWorkout(workout) {
		let workouts = Storage.getWorkouts();
		workouts.push(workout);
		localStorage.setItem("workouts", JSON.stringify(workouts));
	}

	static removeMeal(id) {
		const meals = Storage.getMeals();

		meals.forEach((meal, index) => {
			if (meal.id === id) {
				meals.splice(index, 1);
			}
		});

		localStorage.setItem("meals", JSON.stringify(meals));
	}

	static removeWorkout(id) {
		const workouts = Storage.getWorkouts();

		workouts.forEach((workout, index) => {
			if (workout.id === id) {
				workouts.splice(index, 1);
			}
		});

		localStorage.setItem("workouts", JSON.stringify(workouts));
	}

	static clearLocal() {
		localStorage.clear();
	}
}

export default Storage;
