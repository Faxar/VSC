(function() {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => {
        console.log(response)
        let ingredients = response.data.drinks;
        console.log(ingredients[65]);
        
    })
    .catch((error) => {
        console.log(error)
    })
    
    axios.get('https://my-json-server.typicode.com/Faxar/demo/db')
    .then((response) => {
        let ingr = response.data.posts;
        let output = '';
        $.each(ingr, (id, val) => {
            console.log(val.textContent);
            output += `
            <option>${val.textContent}</option>
            `
        })

        $("#list select").append(output);
        console.log(output);

    })
    .catch((error) => {
        console.log(error)
    })
})();
