(function(){
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+ sessionStorage.getItem('id'))
    .then((response) => {
        console.log(response);
        let drink = response.data.drinks[0];
        var ingredients = '';
        for(var i=0; i<15; i++){
            var ingredient = drink["strIngredient" + [i+1]];
            // var ingr = "strIngredient" + [i ];
            if(ingredient !== ""){
                console.log(ingredient);
                ingredients += `<li>${ingredient}</li>`
            }
            
        }
        console.log(ingredients);
        var dom = `
            <img src="${drink.strDrinkThumb}" id="detPic">
            <h4 id="drink">${drink.strDrink}</h4>
            <div id="ingredient">
                <ul>
                    ${ingredients}
                </ul>
            </div>
            <div id="instructions">
                ${drink.strInstructions}
            </div>
        `

        $('#detailsV').html(dom);
    })
    .catch((error) => {
        console.log(error)
    })
})();
