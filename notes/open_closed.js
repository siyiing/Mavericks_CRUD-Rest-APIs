// open-closed principle
// - classes modules and functions should be open for extension but closed for modification 
// - can allow its behaviour to be extended without modifying its source code 
/*
function printQuiz(questions) {
    questions.forEach(question => {
        console.log(question.description)
        switch (question.type) {
            case 'boolean':
                console.log('1. true')
                console.log('2. false')
                break
            case 'multipleChoice':
                question.options.forEach((option, index) => {
                    console.log(`${index + 1}.${option}`)
                })
                break
            case 'text':
                console.log('Answer: __________')
                break
        }
        console.log()
    })
}

const questions = [
    {
        type: 'boolean',
        description: 'this video is useful'
    },
    {
        type: 'multipleChoice',
        description: 'what is your favorite language?',
        options: ['css', 'html', 'js', 'python']
    },
    {
        type: 'text',
        description: 'describle your favourite js feature'
    }
]

printQuiz(questions)

// the above code violates
// usually if we see a 'switch' we know it violates open close principles
// or if we see alot of if else in the code 
// because if we want to expand our question, it is very hard 
// for example, if we want to add a new question such as a 'range' for min and max, thus to add the qn, we need make changes to another place too
// WE SHOULD NOT NEVER CHANGE CODE INSIDE  

// open-close should be like when i want to add new question, i can just add in the array and the program will know how to handle it. i should nvr be able to edit the code in the switch statement. 


{
    type: 'range',
        description: 'what is the speed limit in your city'
}

// and 

case 'range':
console.log('Min: __________')
console.log('Max: __________')
break


*/
// we should break the switch or if else statements into their own class.
// e.g. boolean, multiplechoice, text and range class 

// and then inside each class, it will handle its own printing 

// correct way is below:
class BooleanQuestion {
    constructor(description) {
        this.description = description
    }

    printQuestionChoices() {
        console.log('1. true')
        console.log('2. false')
    }
}

class MultipleChoiceQuestion {
    constructor(description, options) {
        this.description = description
        this.options = options
    }

    printQuestionChoices() {
        this.options.forEach((option, index) => {
            console.log(`${index + 1}.${option}`)
        })
    }
}

class TextQuestion {
    constructor(description) {
        this.description = description
    }

    printQuestionChoices() {
        console.log('Answer: __________')
    }
}

class RangeQuestion {
    constructor(description) {
        this.description = description
    }

    printQuestionChoices() {
        console.log('Min: __________')
        console.log('Max: __________')
    }
}

// will never touch on this code block
function printQuiz(questions) {
    questions.forEach(question => {
        console.log(question.description)
        question.printQuestionChoices()
        console.log('')
    })
}

const questions = [
    new BooleanQuestion('this video is useful'),
    new MultipleChoiceQuestion(
        'what is your favorite language?',
        ['css', 'html', 'js', 'python']
    ),
    new TextQuestion('describle your favourite js feature'),
    new RangeQuestion('what is the speed limit in your city'),
]

printQuiz(questions)