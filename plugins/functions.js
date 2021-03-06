module.exports = {
    createToken: function(length = 5) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let token = '';

        for(let i = 0; i < length; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }

        return token;
    },
    getMultiplayerIdFromUrl: function(url) {
        const regularExpression = new RegExp(/https:\/\/osu\.ppy\.sh\/community\/matches\/([0-9]+)/).exec(url);

        if(regularExpression) {
            return regularExpression[1];
        }

        return false;
    },
    getBeatmapIdFromUrl: function(url) {
        const beatmapValidOld = new RegExp(/https:\/\/osu\.ppy\.sh\/(b|s)\/([0-9]+)/).exec(url);
        const beatmapValidNew = new RegExp(/https:\/\/osu\.ppy\.sh\/beatmapsets\/[0-9]+\#[a-zA-Z]+\/([0-9]+)/).exec(url);

        if(beatmapValidOld) {
            if(beatmapValidOld[1] === 's') {
                return false;
            }
            else if(beatmapValidOld[1] === 'b') {
                return beatmapValidOld[2];
            }
        }
        else if(beatmapValidNew) {
            if(beatmapValidNew) {
                return beatmapValidNew[1];
            }
            else {
                return false;
            }
        }
        else if(!isNaN(url)) {
            return url;
        }
    },
    getAccuracyOfScore: function(score) {
        return (((parseInt(score.count50) + parseInt(score.count100) + parseInt(score.count300)) / (parseInt(score.count50) + parseInt(score.count100) + parseInt(score.count300) + parseInt(score.countmiss) + parseInt(score.countkatu))) * 100).toFixed(2);
    },
    addDot: function(nStr, splitter) {
        nStr += '';
        const x = nStr.split('.');
        const x1 = x[0];
        const x2 = x.length > 1 ? '.' + x[1] : '';
        const rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + splitter + '$2');
        }

        return x1 + x2;
    },
    calculateAccuracyPlayerScore: function(score) {
        score = parseFloat(score);

        return (score * 0.2);
    },
    calculateScorePlayerScore: function(score, accuracy, modifier) {
        score = parseFloat(score);
        accuracy = parseFloat(accuracy);
        
        return (score * (Math.pow((100 - ((100 - accuracy) / 5)) / 100, modifier)));
    },
    calculateTeamScore: function(score_player_one, score_player_two, score_player_three, accuracy_player_one, modifier) {
        score_player_one = parseFloat(score_player_one);
        score_player_two = parseFloat(score_player_two);
        score_player_three = parseFloat(score_player_three);

        accuracy_player_one = parseFloat(accuracy_player_one);

        return (((score_player_one) + (score_player_two) + (score_player_three)) * (Math.pow(accuracy_player_one / 100, modifier))).toFixed();
    }
};