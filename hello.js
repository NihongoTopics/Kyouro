
var s = "Heyâ'ga Samû·idesu."

function Noun(spelling, meaning, animacy){
  this.spelling = spelling;
  this.meaning = meaning; 
  this.animacy = animacy; 
}

var heya = new Noun("Heyâ", "room", false); 

function ArticlePhrase(article, noun){
  this.article = article; 
  this.noun = noun; 
  this.spelling = noun.spelling + article.spelling; 
  this.definitiveness = article.definitiveness; 
  this.case = article.case; 
  this.animacy = noun.animacy; 
}
 
function ga(noun){
  var article = {
    spelling: "ga"; 
    definitiveness: "definitive"; 
    grammaticalCase: "doer"; 
  }
  return new ArticlePhrase(article, noun); 
}

function AdjectiveBase(spelling, meaning){
  this.spelling = spelling; 
  this.meaning = meaning; 
}

var samu = new AdjectiveBase("Samû", "cold"); 

function AdjectivePhrase(spelling, meaning){
  this.spelling = spelling; 
  this.meaning = meaning;
}  

function idesu(adjectiveBase, articlePhrase){
  var spelling = articlePhrase.spelling + " " + adjectiveBase.spelling + "·idesu";
  var meaning; 
  if (articlePhrase.definitiveness == "definitive"){
    meaning = "A room is cold"; 
  }else{
    meaning = "The room is cold";
  }
  return new AdjectivePhrase(spelling, meaning);
}
