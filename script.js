document.getElementById("btn1").addEventListener("click", () => {
    get(document.getElementById("searchField").value);
});

$('')

function get(searchText){
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+searchText)
    .then((response) => {
        console.log(response);
        if(response.data.drinks.length > 0){
            let drinks = response.data.drinks;
            let output = '';
            for(var i = 0; i< drinks.length; i++){
                console.log(drinks[i].strDrink);
                output += `
                <div class="box">
                    <img src="${drinks[i].strDrinkThumb}">
                    <h4>${drinks[i].strDrink}</h4>
                </div>`
            }
        $('#ent').html(output);
        }
        
    })
    .catch((error) => {
        console.log(error)
    })
}
