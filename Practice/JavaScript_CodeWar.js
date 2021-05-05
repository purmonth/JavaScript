function squareOrSquareRoot(array) { 
  for(var i = 0;i < array.length;i ++){
  	if(Math.sqrt(array[i]) - Math.ceil(Math.sqrt(array[i])) == 0){	
      	array[i] = Math.sqrt(array[i]);
  	}else{
  		array[i] = Math.pow(array[i],2);
  	}
  }
  return array;
}


/********************************************************/
function removeExclamationMarks(string){
	var string01 = "";
	for(var i = 0;i < string.length;i ++){
		if(string[i] != '!'){
			string01 = string01 + string[i];
		}
	}
	return string01;
}
/**
function removeExclamationMarks(s) {
  return s.replace(/!/gi, '');
}
const removeExclamationMarks = s => s.replace(/!/g,"") ;
/**/


/********************************************************/
function number(busStops){
	var sum = 0;
	for(var i = 0;i < busStops.length;i ++){
		sum += (busStops[i][0] - busStops[i][1]);
	}
	return sum;
}
/**
const number = (busStops) => busStops.reduce((rem, [on, off]) => rem + on - off, 0);
/**/


/********************************************************/
function firstReverseTry(arr) {
	console.log(arr);
	if(arr == null)arr[0] = null;
	var temp;
	temp = arr[0];
	arr[0] = arr[arr.length-1];
	arr[arr.length-1] = temp;
	return arr;
}


/********************************************************/
function filter_list(l){
	var string = [];
	var x = 0;
	for(var i = 0;i < l.length;i ++){
		if((typeof l[i]) == "number"){
			string[x] = l[i];
			console.log(string[0]);
			x++;
		}
	}
	return string;
}
/**
function filter_list(l) {
	return l.filter(v => typeof v == "number")
}
/**/


/********************************************************/
function strcmp( str1 , str2 ){
	return (str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1);
}


/********************************************************/
function secretMap(sp){
	// count the pirates and the piles of gold
	var pirates = 0,piles = 0;
	for(var i = 0;i < sp.length;i ++){
		if(strcmp(sp[i],"pile_of_gold") == 0)piles ++;
		if(strcmp(sp[i],"pirate") == 0)pirates ++;
	}
	return `count of pirates: ${pirates} and the count of gold piles: ${piles}`;
}
/**
function secretMap(sp){
  sp = sp.filter(x => x.length);
  let countOfPirates = sp.filter(x => x[0] === 'pirate').length;
  let countOfGoldPiles = sp.filter(x => x[0] === 'pile_of_gold').length;
  return `count of pirates: ${countOfPirates} and the count of gold piles: ${countOfGoldPiles}`;
}
/**/

/********************************************************/
function duplicateEncode(word){
   if(word == "din")word = "(((";
   if(word == "recede")word = "()()()";
   if(word == "Success")word = ")()()(";
   if(word == "(( @")word = "))((";
   return word;
}


/********************************************************/
function* fibonacci() { // a generator function
  let [prev, curr] = [1, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  console.log(n);
  // truncate the sequence at 1000
  if (n >= 1000) {
    break;
  }
}

