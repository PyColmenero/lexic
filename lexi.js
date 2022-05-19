class GameEngine {

    constructor() {

        // INPUTS
        this.inputs = $(".form-control")
        this.inputs.keyup(this.countScore);


    }
    loadSavedGame() {
        // for each letter
        for (let x = 0; x < 26; x++) {
            // stored game data
            let gamedata = localStorage.getItem("lexi" + x);
            if (gamedata != null) {

                gamedata = gamedata.split(",");

                $("#" + x + "-0").val(gamedata[0]);
                $("#" + x + "-1").val(gamedata[1]);

                this.countScore.bind($("#" + x + "-0"))();

            }
        }
    }
    countScore() {

        var tr = $(this).parent().parent();
        var char = tr.children().eq(0).text()[0];
        var input1 = tr.children().eq(1).children().eq(0);
        var input2 = tr.children().eq(2).children().eq(0);
        var scoreP = tr.children().eq(3).children().eq(0);

        var word1 = input1.val();
        var word2 = input2.val();
        var score1 = 10;
        var score2 = 10;

        if (word1.length >= 3) {
            if ((word1[0].toUpperCase() == char)) {
                score1 = parseInt(word1.length);
            }
        }
        if (word1.length >= 3) {
            if ((word1[0].toUpperCase() == char) && (word1[word1.length - 1].toUpperCase() == char)) {
                input2.attr("disabled", "true");
                score2 = 0;
            } else {
                input2.removeAttr("disabled");
                if (word2.length >= 3) {
                    if ((word2[word2.length - 1].toUpperCase() == char)) {
                        score2 = parseInt(word2.length);
                    }
                }
            }
        } else {
            input2.removeAttr("disabled");
            if (word2.length >= 3) {
                if ((word2[word2.length - 1].toUpperCase() == char)) {
                    score2 = parseInt(word2.length);
                }
            }
        }

        scoreP.html((score1 + score2) + " puntos");

        gameengine.getAllScores();

        let id = tr.attr("data-index");

        // save data
        gameengine.saveGame(id, input1.val(), input2.val())

    }
    saveGame(id, i1, i2) {
        localStorage.setItem("lexi" + id, i1 + "," + i2);
    }
    getAllScores() {
        var scoreDivs = $(".score");
        var score = 0;

        scoreDivs.each(function() {
            var scoreText = $(this).text();
            score += parseInt(scoreText.substring(0, scoreText.length - 7));
        });

        $("#scores").text(score + " puntos");
    }

}


let gameengine = new GameEngine()
gameengine.loadSavedGame()

// function simulateTab() {
//     jQuery.event.trigger({
//         type: 'keydown',
//         which: 77
//     });

// }