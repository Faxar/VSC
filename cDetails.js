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

document.getElementById("search").addEventListener("click", () => {
    sessionStorage.setItem('searchId', document.getElementById("searchField").value);
    document.location.href = "http://127.0.0.1:5500/index.html";
});
