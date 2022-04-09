const correct = localStorage.getItem("correctans");
const wrong = localStorage.getItem("wrongans");
const skipped = localStorage.getItem("skippedans");

const element = document.getElementById("prog"); 
let text = element.getAttribute("data-percentage"); 

var resultPercentage = (correct/10)*100;

element.setAttribute("data-percentage",resultPercentage)



if(skipped==null){
    localStorage.setItem("skippedans",0);
    skipped = localStorage.getItem("skippedans");

}


(function( $ )
{
    $.fn.circlechart = function() 
    {
        this.each(function() 
        {
            var percentage = $(this).data("percentage");
            $(this).html(makesvg(percentage));
        });
        return this;
    };

}( jQuery ));

const correctans = document.querySelector("#correctans");
const wrongans = document.querySelector("#wrongans");
const skippedans = document.querySelector("#skippedans");




function makesvg(percentage)
{
  var abs_percentage = Math.abs(percentage).toString();
  var percentage_str = percentage.toString();
  var classes = ""

  if(percentage <= 25)
  {
    classes = "low-stroke circle-chart__circle--negative";
  } 
  else if(percentage > 25 && percentage <= 60)
  {
    classes = "medium-stroke";
  } 
  else
  {
    classes = "high-stroke";
  }

 var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
     + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
     + '<circle class="circle-chart__circle '+classes+'"'
     + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9" />'
     + '<g class="circle-chart__info">'
     + '   <text class="circle-chart__percent" x="17.9" y="19.5">'+percentage_str+'%</text>';
     svg += ' </g></svg>';
  return svg;
}



// Variables

const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
correctans.innerText='Correct Answers: ' + correct;
wrongans.innerText='Wrong Answers: ' + wrong;
skippedans.innerText='Skipped Answers: ' + skipped;



// functions

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value

});

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value,
    }

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score;
    })
    
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign('index.html');
}







