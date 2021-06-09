(function () {

    ajax('GET', 'https://joxgit.github.io/DnD-Osnovna-Pravila/monsters.json', [], '', parseMonstersJson);

    function parseMonstersJson(response) {
//        try {
            let div = document.getElementById('container');
            let obj = JSON.parse(response.responseText);
            let i = 0;
            let template = document.getElementById('template-small').content;
            let cardsOnTemplate = 4;
            let cardsOnTemplateRemaining = 0;
            let templateInstance;

            for(let monster of obj){

                //checking if i have remaining cards on template
                if(cardsOnTemplateRemaining == 0){
                    //create new template instance
                    templateInstance = document.importNode(template, true);
                    cardsOnTemplateRemaining = cardsOnTemplate;
                }

                //spending one of cards on template
                cardsOnTemplateRemaining--;

                let currentCardOnTemplate = cardsOnTemplate - cardsOnTemplateRemaining

                //populating back of page
                templateInstance.querySelector(`.page-back .card-${currentCardOnTemplate} .name`).innerHTML = monster.name;
                templateInstance.querySelector(`.page-back .card-${currentCardOnTemplate} .picture`).src = monster.image;

                //populating front of page
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .name`).innerHTML = monster.name;
                //info
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .info`).innerHTML = `${monster.size} ${monster.type}, ${monster.alignament}`;
                //attributes
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .ac`).innerHTML = `${monster.attributes.ac[0]} (${monster.attributes.ac[1]})`;
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .hp`).innerHTML = `${monster.attributes.hp[0]} (${monster.attributes.hp[1]})`;
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .speed`).innerHTML = `${monster.attributes.speed.value} ${monster.attributes.speed.extra}`;
                //abbilities
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .str`).innerHTML = monster.abilities.str[1];
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .dex`).innerHTML = monster.abilities.dex[1];
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .con`).innerHTML = monster.abilities.con[1];
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .int`).innerHTML = monster.abilities.int[1];
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .wis`).innerHTML = monster.abilities.wis[1];
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .cha`).innerHTML = monster.abilities.cha[1];
                //properties
                if(monster.properties){
                    if(monster.properties.saving){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .saving`).innerHTML = monster.properties.saving.join(', ');
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .saving`).parentNode.classList.remove('hide')
                    }
                    if(monster.properties.skills){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .skills`).innerHTML = monster.properties.skills.join(', ');
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .skills`).parentNode.classList.remove('hide')
                    }
                    
                    if(monster.properties.immunities && monster.properties.immunities.damage){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .immunities-damage`).innerHTML = monster.properties.immunities.damage.join(', ');
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .immunities-damage`).parentNode.classList.remove('hide')
                    }
                    if(monster.properties.immunities && monster.properties.immunities.condition){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .immunities-condition`).innerHTML = monster.properties.immunities.condition.join(', ');
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .immunities-condition`).parentNode.classList.remove('hide')
                    }
                    if(monster.properties.resistances){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .resistances`).innerHTML = monster.properties.resistances.join(', ');
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .resistances`).parentNode.classList.remove('hide')
                    }
                    if(monster.properties.vulnerabilities){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .vulnerabilities`).innerHTML = monster.properties.vulnerabilities.join(', ');
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .vulnerabilities`).parentNode.classList.remove('hide')
                    }

                    if(monster.properties.senses){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .senses`).innerHTML = monster.properties.senses.join(', ');
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .senses`).parentNode.classList.remove('hide')
                    }
                    if(monster.properties.languages){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .languages`).innerHTML = monster.properties.languages.join(', ');
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .languages`).parentNode.classList.remove('hide')
                    }

                    if(monster.properties.cr){
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .cr`).innerHTML = `${monster.properties.cr[0]} (${monster.properties.cr[1]})`;
                        templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .cr`).parentNode.classList.remove('hide')
                    }
                }
                //source
                templateInstance.querySelector(`.page-front .card-${currentCardOnTemplate} .source`).innerHTML = monster.source.join(' ');

                if(cardsOnTemplateRemaining == 0){
                    //add page to document
                    div.appendChild(templateInstance);
                }

                i++;
                if (i > 25) {
                    break;
                }
            };

            //add remaining (not full) pages to document
            if(cardsOnTemplateRemaining > 0){
                //add page to document
                div.appendChild(templateInstance);
            }
/*
        } catch (error) {
            console.log(error);
        }
*/
    }

    /*
    function parseDndJson(response) {
        try {
            let div = document.getElementById('container');
            let obj = JSON.parse(response.responseText);
            let i = 0;
            let template = document.getElementById('card-template').content;

            for (let monster in obj.monsters) {

                let card = document.importNode(template, true);
                card.querySelector('.name').innerHTML = obj.monsters[monster].name;
                card.querySelector('.picture').src = obj.monsters[monster].image;
                
                card.querySelector('.ac').innerHTML = `${obj.monsters[monster].attributes[0].value} (${obj.monsters[monster].attributes[0].extra})`;
                card.querySelector('.hp').innerHTML = `${obj.monsters[monster].attributes[1].value} (${obj.monsters[monster].attributes[1].extra})`;
                card.querySelector('.speed').innerHTML = `${obj.monsters[monster].attributes[2].value} ${obj.monsters[monster].attributes[2].extra}`;
                
                card.querySelector('.str').innerHTML = obj.monsters[monster].abilities[0].modifier;
                card.querySelector('.dex').innerHTML = obj.monsters[monster].abilities[1].modifier;
                card.querySelector('.con').innerHTML = obj.monsters[monster].abilities[2].modifier;
                card.querySelector('.int').innerHTML = obj.monsters[monster].abilities[3].modifier;
                card.querySelector('.wiz').innerHTML = obj.monsters[monster].abilities[4].modifier;
                card.querySelector('.cha').innerHTML = obj.monsters[monster].abilities[5].modifier;
                
                if(i == 2 || i == 2){
                    card.querySelector('.card').classList.add('big');
                }
                
                div.appendChild(card);

                i++;
                if (i > 5) {
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    */

    function ajax(method, url, headers, data, callback, caller) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                callback(this, caller, false);
            }
        };

        xhttp.onerror = function () {
            callback(this, caller, true);
        }
        xhttp.open(method, url, true);

        for (header of headers) {
            s
            xhttp.setRequestHeader(header.key, header.value);
        }

        xhttp.send(JSON.stringify(data));
    }

})();