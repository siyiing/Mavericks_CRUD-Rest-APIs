/*
class CalorieTracker {
    constructor(maxCalories) {
        this.maxCalories = maxCalories;
        this.currentCalories = 0
    }

    trackCalories(calorieCount) {
        this.currentCalories += calorieCount
        if (this.currentCalories > this.maxCalories) {
            this.logCalorieSurplus()
        }
    }

    logCalorieSurplus() {
        console.log("max calories exceeded")
    }
} 

const caloriesTracker = new CalorieTracker(2000)
caloriesTracker.trackCalories(500)
caloriesTracker.trackCalories(1000)
caloriesTracker.trackCalories(700)


// the above code violates the Single Responsibility Principle in SOLID 

// Single Responsibility Principle: 
// - all classes, modules, functions, anything that we can put in a single part should only have 1 single responsibility 
// the calories can change the track calories and how we log the calories  
// thus we need to remove the logCalorieSurplus out of the class

// 1. we can create a new js file 'logger.js' and inside the file, we can add the following code: 
export default function logMessage(message) {
    console.log(message)
}


// 2. import the following in index.js
import logMessage from './logger.js'

*/
// 3. the final code is: 
class CalorieTracker {
    constructor(maxCalories) {
        this.maxCalories = maxCalories;
        this.currentCalories = 0
    }

    trackCalories(calorieCount) {
        this.currentCalories += calorieCount
        if (this.currentCalories > this.maxCalories) {
            console.log("max calories exceeded") // new code 
        }
    }
}

const caloriesTracker = new CalorieTracker(2000)
caloriesTracker.trackCalories(500)
caloriesTracker.trackCalories(1000)
caloriesTracker.trackCalories(700)

