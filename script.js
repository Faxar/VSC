// Check if local storage exist.
// If "Yes", load previous search.
(()=> {
    if(localStorage.getItem('boxes')){
        $('.searchResults').html(window.localStorage.getItem('boxes'));
    }
})();

// Event listener attached to search button.
document.getElementById("btn1").addEventListener("click", () => {
    var searchText = document.getElementById("searchField").value;
    if(searchText !== ''){
        window.localStorage.removeItem('boxes')
        get(searchText);
    } 
});


// Requst API for searched value.
function get(searchText){
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+searchText)
    .then((response) => {
        console.log(response);
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
        var html = $('.searchResults').html();
        window.localStorage.setItem('boxes', html);       
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
