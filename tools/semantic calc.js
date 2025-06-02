class Meme {
	constructor(label) {
		this.label = label;
	} 
	math() { return this.label;} 
	latex() {
		if(this.label == '1'){
			return '\\text{α}';
		}else{
			return '\\text{' + this.label + '}';
		}
	}
}
class Role {constructor(label) {this.label = label;}math() {return '_' + this.label;} latex() {return '_' + '\\text{' + this.label + '}';}}
class ArgRole extends Role{ }
class PredRole extends Role{ }
class Serial {
    constructor(role, meme) {
        if (!(role instanceof Role)) throw new TypeError('The first argument of a serial must be a role'); if (!(meme instanceof Meme)) throw new TypeError('The second argument of a serial must be a meme');
        this.role = role; this.meme = meme;
    }
    math() {return this.role.math() + this.meme.math();} latex() {return this.role.latex() + this.meme.latex();}
}
class argSerial extends Serial{ }
class predSerial extends Serial{ }
class Parallelizer {
    constructor(variable, upper, lower, key) {
        if (variable !== 'X') throw new TypeError('The input variable of a parallelizer must be X.');
		if (!(upper instanceof Side)) throw new TypeError('The upper side of a parallelizer must be a Side');
		if (!(lower instanceof Side)) throw new TypeError('The lower side of a parallelizer must be a Side');
		// variable is always X, so it is not a segment
		// upper and lower are sides
        this.variable = variable;
        this.upper = upper;
        this.lower = lower;
		this.key = key; 
    }
    math() {
		if(this.key == 'dakeo'){
			return this.variable + ': !(' + this.upper.bundle.math() + ')/' + this.lower.bundle.math();
		}else{
	        return this.variable + ':' + this.upper.math() + '/' + this.lower.math();
		}
    }
    latex() {
		if(this.key == 'dakeo'){
			return '\\text{' + this.variable + '} \\colon \\frac{\\neg \\left(' + this.upper.bundle.latex() + '\\right) }{' + this.lower.latex() + '}';
		}else{
			return '\\text{' + this.variable + '} \\colon \\frac{' + this.upper.latex() + '}{' + this.lower.latex() + '}'; 
		}
    }
}
class Segment{
	constructor(serial, primes){
		if(!(serial instanceof Serial)){throw new Error('Input is expected to be a serial');}
		if(primes !== '' && primes !== "'" && primes !== "''"){throw new TypeError("The primes of a segment must be zero to two apostrophes");}
		this.serial = serial; this.primes = primes;
	}
	math(){return this.serial.math() + this.primes;}
	latex(){
		if(this.primes == "''"){return this.serial.latex() + '\\prime \\prime';
		}else if(this.primes == "'"){return this.serial.latex() + '\\prime';
		}else{return this.serial.latex();
		}
	}
}
class Bundle{
	constructor(left, right){
		if (!(left instanceof Segment)) { throw new Error('Input is expected to be a Segment'); }
		this.left = left; this.right = right;
	}
	math(){if(this.right instanceof Segment){return this.left.math() + ', ' + this.right.math(); }else{return this.left.math();}}
	latex(){
		if(this.right instanceof Segment){
			return this.left.latex() + ', ' + this.right.latex();
		}else{
			return this.left.latex();
		}
	}
}
class Side{
	constructor(negator, bundle){
		if(negator !== '' && negator !== '!'){throw new TypeError('The negator of a side must be either "" or "!"');}
		this.bundle = bundle; this.negator = negator;
	}
	math(){return this.negator + this.bundle.math();}
	latex(){
		if(this.negator == '!'){
			return '\\neg' + this.bundle.latex();
		}else{
			return this.bundle.latex();
		}
	}
} 
class Parallel {
    constructor(upper, lower) {
        if (!(upper instanceof Side)) { throw new Error('Input is expected to be a Side'); }if (!(lower instanceof Side)) { throw new Error('Input is expected to be a Side'); }
        this.upper = upper;this.lower = lower;
    }
    math() {
        return this.upper.bundle.math() + '/' + this.lower.bundle.math();
    }
    latex() {
        return '\\frac{' + this.upper.latex() + '}{' + this.lower.latex() + '}';	
    }
}
class ArgParallel extends Parallel{ }
class PredParallel extends Parallel{ }
class Cserial {
    constructor(left, right) {
    	// both left and right are parallel
        this.left = left;
        this.right = right;
    }
    math() {
		if(this.left.upper.math().includes('0') || this.right.upper.math().includes('0')){
			return '(' + '0' + '/' +
				   this.left.lower.math() + '*' +
				   this.right.lower.math() + ')';
		}else if(this.left.lower.math().includes('0') || this.right.lower.math().includes('0')){
			return '(' + this.left.upper.math() + '/' + '0' + ')';
		}else{
			return   '(' + this.left.upper.math() + '*' + this.right.upper.math() + '/' +
					this.left.lower.math() + '*' + this.right.lower.math() + ')';
		}
    }
    latex() {
		if(this.left.upper.math().includes('0') || this.right.upper.math().includes('0')){
			return '\\left( \\frac{\\text{0}}{' + this.left.lower.latex() + '\\cdot' + this.right.lower.latex() + '} \\right)';
		}
		else if(this.left.lower.math().includes('0') || this.right.lower.math().includes('0')){
			return '\\left( \\frac{' + this.left.upper.latex() + '\\cdot' + this.right.upper.latex() + '}{\\text{0}} \\right)';
		}else{
			return '\\left( \\frac{' + this.left.upper.latex() + '\\cdot' + this.right.upper.latex() + '}{' + this.left.lower.latex() + '\\cdot' + this.right.lower.latex() + '} \\right)';
		}
	}
}

class Tree{ 
	constructor(left, right){
		this.left = left; this.right = right; if (!this.right) {throw new Error('Tree node must have both left and right nodes');} 
		// All possible valid combinations
		if (this.left instanceof Meme && this.right instanceof Role) {
			if(this.right instanceof PredRole){this.result = new predSerial(this.right, this.left);}
            if(this.right instanceof ArgRole){this.result = new argSerial(this.right, this.left);}
		} else if (this.left instanceof Serial && this.right instanceof Parallelizer) {
			let zero = new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('0')), '')));
			if(this.right.key == 'neutral'){
				this.result = new ArgParallel(new Side('', new Bundle(new Segment(this.left, ''))), zero);
			}else if(this.right.key == 'unsupported'){
				throw new Error('The parallelizer ' + this.right.math() + ' is not supported.');
			}else if(this.right.key == 'wa'){
				this.result = new ArgParallel(new Side('', new Bundle(new Segment(this.left, ''))), new Side('', new Bundle(new Segment(this.left, "'"))));
			}else if(this.right.key == 'exhaustive'){
				this.result = new ArgParallel(new Side('', new Bundle(new Segment(this.left, ''))), new Side('', new Bundle(new Segment(this.left, "'"), new Segment(this.left, "''"))));
			}else if(this.right.key == 'shika'){
				this.result = new ArgParallel(new Side('', new Bundle(new Segment(this.left, "'"), new Segment(this.left, "''"))), new Side('', new Bundle(new Segment(this.left, ''))));
			}else if(this.right.key == 'negative'){
				this.result = new PredParallel(new Side('!', new Bundle(new Segment(this.left, ''))), new Side('', new Bundle(new Segment(this.left, ''))));
			}else if(this.right.key == 'affirmative'){
				this.result = new PredParallel(new Side('', new Bundle(new Segment(this.left, ''))), new Side('!', new Bundle(new Segment(this.left, ''))));
			}else if(this.right.key == 'dakeo'){
				this.result = new ArgParallel(new Side('!', new Bundle(new Segment(this.left, "'"), new Segment(this.left, "''"))), new Side('', new Bundle(new Segment(this.left, ''))));
			}
		} // parallel + parallel = Cserial
		else if(this.left instanceof ArgParallel && this.right instanceof PredParallel){
			this.result = new Cserial(this.left, this.right);
		} // Cserial + parallelizer = parallel
		else if(this.left instanceof Cserial && this.right instanceof Parallelizer){
			// make upper
			// if the parallelizer has a negator
			let upper; 
			if(this.right.upper.math().includes('!')){
				upper = new Side('!', this.left);
			}// if it doesn't 
			else{
				upper = new Side('', this.left);
			}
			
			// make lower
			let lower;
			if(this.right.lower.math().includes('!')){
				lower = new Side('!', this.left);
			}// if it doesn't 
			else{
				lower = new Side('', this.left);
			}
			
			// make parallel
			this.result = new PredParallel(upper, lower);

		} // if both left and right are Tree
		else if(this.left instanceof Tree && this.right instanceof Tree){
			let tree = new Tree(this.left.result, this.right.result);
			this.result = tree.result;
		}else if(this.left instanceof Tree){
			let tree = new Tree(this.left.result, this.right);
			this.result = tree.result;
		}else if(this.right instanceof Tree){
			let tree = new Tree(this.left, this.right.result);
			this.result = tree.result;
		}
	}
	draw(){
		let tree = '';
		if(this.left instanceof Tree && this.right instanceof Tree){
			tree = '\\underset{' + this.result.latex() + '}{' + this.left.draw() + '\\quad' + this.right.draw() + '}';
		}else if(this.left instanceof Tree){
			tree = '\\underset{' + this.result.latex() + '}{' + this.left.draw() + '\\quad' + this.right.latex() + '}';
		}else if(this.right instanceof Tree){
			tree = '\\underset{' + this.result.latex() + '}{' + this.left.latex() + '\\quad' + this.right.draw() + '}';
		}else {
            tree = '\\underset{' + this.result.latex() + '}{' + this.left.latex() + '\\quad' + this.right.latex() + '}';
        }
		return tree;
	}
}

// Parser function
window.parser = function parser(input) {
    const parallelizers = [	["X:1/0", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('1')), ''))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('0')), ''))), 'unsupported')],
							["X:X/0", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('0')), ''))),'neutral')],
							["X:X/1", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('1')), ''))), 'unsupported')],
							["X:X/X'", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"))), 'wa')],
							["X:X/X',X''", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"), new Segment(new Serial(new Role(''), new Meme('X')), "''"))), 'exhaustive')],
							["X:X'/0", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('0')), ''))), 'unsupported')],
							["X:X'/1", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('1')), ''))), 'unsupported')],
							["X:X'/X", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), 'unsupported')],
							["X:X',X''/0", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"), new Segment(new Serial(new Role(''), new Meme('X')), "''"))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('0')), ''))), 'unsupported')],
							["X:X',X''/1", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"), new Segment(new Serial(new Role(''), new Meme('X')), "''"))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('1')), ''))), 'unsupported')],
							["X:X',X''/X", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"), new Segment(new Serial(new Role(''), new Meme('X')), "''"))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), 'shika')],
							["X:!X/X", new Parallelizer('X', new Side('!', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), 'negative')],
							["X:X/!X", new Parallelizer('X', new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), new Side('!', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), 'affirmative')],
							["X:!(X',X'')/X", new Parallelizer('X', new Side('!', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), "'"), new Segment(new Serial(new Role(''), new Meme('X')), "''"))), new Side('', new Bundle(new Segment(new Serial(new Role(''), new Meme('X')), ''))), 'dakeo')]]
							.sort((a, b) => b[0].length - a[0].length);
    const argRoles = ["_arg", "_by", "_to", "_for", "_with", "_in", "_on", "_at", "_from", "_about", "_as", 
                "_like", "_over", "_under", "_through", "_between", "_it"].sort((a, b) => b.length - a.length);
	const predRoles = ["_pred", "_of", "_as", "_do", "_is"].sort((a, b) => b.length - a.length);
    function isParallelizer(string){
		return parallelizers.map(subArray => subArray[0]).includes(string.replaceAll(" ", ""));
    }
	let parsedSeq = input.split(' ');
	// Remove spaces
	parsedSeq = parsedSeq.filter(char => char !== ' ');

	for (let i = 0; i < parsedSeq.length; i++) {
		if (argRoles.includes(parsedSeq[i])){
			parsedSeq[i] = new ArgRole(parsedSeq[i].substring(1));
		}else if (predRoles.includes(parsedSeq[i])){
			parsedSeq[i] = new PredRole(parsedSeq[i].substring(1));
		}
		// If the character is a parallelizer
		else if (isParallelizer(parsedSeq[i])) {
			// Find the corresponding parallelizer object
			for (let j = 0; j < parallelizers.length; j++) {
				if (parallelizers[j][0] === parsedSeq[i].replaceAll(" ", "")) {
					// Create a new Parallelizer object
					parsedSeq[i] = parallelizers[j][1];
					break;
				}
			}
		} 
		// If the character is a meme
		else {
			parsedSeq[i] = new Meme(parsedSeq[i]);
		}
	}

	return parsedSeq;
}


// Function to tell if two nodes can merge
function isMergeable(left, right){
	return (
		(left instanceof Meme && right instanceof Role) ||
		(left instanceof Serial && right instanceof Parallelizer) ||
		(left instanceof ArgParallel && right instanceof PredParallel) ||
		(left instanceof Cserial && right instanceof Parallelizer) 
	);
}

// Function to convert parsed sequence to a tree structure
window.toTree = function toTree(parsedSeq) {
	let array = [];
	array = parsedSeq;
	let treeNode;
	// Iterate through leftArray. 
	// 1. Foer each element, check if it can merge with the next element.
	// 2. If they can, merge them and replace them with the resulting element.
	for (let i = 0; i < array.length - 1; i++) {
		// if both nodes are trees
		if (array[i] instanceof Tree && array[i + 1] instanceof Tree) {
			if (isMergeable(array[i].result, array[i + 1].result)) {
				// If they can merge, create a new Tree node
				treeNode = new Tree(array[i], array[i + 1]);
				// Replace the two elements with the new tree node
				array.splice(i, 2, treeNode);
				// Reset index to check from the start again
				i = -1; // Will be incremented to 0 in the next iteration
			}
		}else if (array[i] instanceof Tree) {
			if(isMergeable(array[i].result, array[i + 1])){
				// If they can merge, create a new Tree node
				treeNode = new Tree(array[i], array[i + 1]);
				// Replace the two elements with the new tree node
				array.splice(i, 2, treeNode);
				// Reset index to check from the start again
				i = -1; // Will be incremented to 0 in the next iteration
			}	
		}else if (array[i + 1] instanceof Tree) {
			if(isMergeable(array[i], array[i + 1].result)){
				// If they can merge, create a new Tree node
				treeNode = new Tree(array[i], array[i + 1]);
				// Replace the two elements with the new tree node
				array.splice(i, 2, treeNode);
				// Reset index to check from the start again
				i = -1; // Will be incremented to 0 in the next iteration
			}
		}else{
			if(isMergeable(array[i], array[i + 1])){
				// If they can merge, create a new Tree node
				treeNode = new Tree(array[i], array[i + 1]);
				// Replace the two elements with the new tree node
				array.splice(i, 2, treeNode);
				// Reset index to check from the start again
				i = -1; // Will be incremented to 0 in the next iteration
			}
		}
	}
	// for tree nodes, use draw() to get the latex representation. for other nodes, use latex() to get the latex representation.
	// concatenate all the latex representations of the nodes in the array and return the resulting string.
	let result = '';
	for (let i = 0; i < array.length; i++) {
		if (array[i] instanceof Tree) {
			result += array[i].draw();
		} else {
			result += array[i].latex();
		}
		if (i < array.length - 1) {
			result += ' \\quad ';
		}
	}
	return result;
}

window.toRoot = function toRoot(parsedSeq) {
	let array = [];
	array = parsedSeq;
	let treeNode;
	// Iterate through leftArray. 
	// 1. Foer each element, check if it can merge with the next element.
	// 2. If they can, merge them and replace them with the resulting element.
	for (let i = 0; i < array.length - 1; i++) {
		// if both nodes are trees
		if (array[i] instanceof Tree && array[i + 1] instanceof Tree) {
			if (isMergeable(array[i].result, array[i + 1].result)) {
				// If they can merge, create a new Tree node
				treeNode = new Tree(array[i], array[i + 1]);
				// Replace the two elements with the new tree node
				array.splice(i, 2, treeNode);
				// Reset index to check from the start again
				i = -1; // Will be incremented to 0 in the next iteration
			}
		}else if (array[i] instanceof Tree) {
			if(isMergeable(array[i].result, array[i + 1])){
				// If they can merge, create a new Tree node
				treeNode = new Tree(array[i], array[i + 1]);
				// Replace the two elements with the new tree node
				array.splice(i, 2, treeNode);
				// Reset index to check from the start again
				i = -1; // Will be incremented to 0 in the next iteration
			}	
		}else if (array[i + 1] instanceof Tree) {
			if(isMergeable(array[i], array[i + 1].result)){
				// If they can merge, create a new Tree node
				treeNode = new Tree(array[i], array[i + 1]);
				// Replace the two elements with the new tree node
				array.splice(i, 2, treeNode);
				// Reset index to check from the start again
				i = -1; // Will be incremented to 0 in the next iteration
			}
		}else{
			if(isMergeable(array[i], array[i + 1])){
				// If they can merge, create a new Tree node
				treeNode = new Tree(array[i], array[i + 1]);
				// Replace the two elements with the new tree node
				array.splice(i, 2, treeNode);
				// Reset index to check from the start again
				i = -1; // Will be incremented to 0 in the next iteration
			}
		}
	}
	
	let result = '';
	for (let i = 0; i < array.length; i++) {
		if (array[i] instanceof Tree) {
			result += array[i].result.latex();
		} else {
			result += array[i].latex();
		}
		if (i < array.length - 1) {
			result += ' \\quad ';
		}
	}
	return result;
}
