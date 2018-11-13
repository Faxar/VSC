(function(){
    if(sessionStorage.getItem('searchId')){
        get(sessionStorage.getItem('searchId'));
    }
})();

// Event listener attached to search button.
document.getElementById("search").addEventListener("click", () => {
    var searchText = document.getElementById("searchField").value;
    if(searchText !== ''){
        get(searchText);
    } 
});


// Requst API for searched value.
function get(searchText){
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+searchText)
    .then((response) => {
            let drinks = response.data.drinks;
            let output = '';
            $.each(drinks, (id, value) => {
                output += `
                <div class="box" id="${value.idDrink}">
                    <img src="${value.strDrinkThumb}">
                    <h4>${value.strDrink}</h4>
                </div>`   
            })
        $('#ent').html(output);
        sessionStorage.setItem('searchId', searchText);
    })
    .catch((error) => {
        console.log(error)
    })
}


// Change page and store search result on the page.
$(document).on('click', ".box", function() {
    var attr = $(this).attr('id');
    // var drinkObj = drinks.find(function(e){
    //     return e.idDrink === attr;
    // });
    sessionStorage.setItem('id', attr);
    document.location.href = "http://127.0.0.1:5500/details.html"
})


// window.onbeforeunload = function() {
//     localStorage.removeItem('boxes');
//     return '';
// }
