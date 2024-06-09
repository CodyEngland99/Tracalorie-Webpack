class FitnessAndDiet {
	constructor(name, calories) {
		this.id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
		this.name = name;
		this.calories = Number(calories);
	}
}

export default FitnessAndDiet;
