// if S is a subtype of T, then objects of type T may be replaced with object of type S
// e.g. class of animal, should be able to be replace with one of its sub-classes such as dog which inherit animal 

// e.g. square and rectangle 
// square class inherits rectangle class 
// but it is wrong, because when we use square, it will be wrong 
// thus, we need create another class call 'Shape' and then square and rectangle will inherit the 'Shape'

// e.g. duck and penguin inherit bird
// duck can fly and quack 
// penguin can swim
// bird can fly 
// but penguin will break because it cannot fly and it throw an error 
// thus we need use composite instead, meaning to say, we need to add swim and fly in for both duck and penguin and not create a new class for them to inherit because it will be too mafan in the future when we expand it. 

