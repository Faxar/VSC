let ingredients = '';

(function() {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => {
        console.log(response)
        ingredients = response.data.drinks;
        let output = '';
        $.each(ingredients, (id, val) => {
            output += `
            <tr>
                <td>${val.strIngredient1}</td>
            </tr>
            `
        })

        $('#myTable').append(output);
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
            <tr>
                <td>${val.textContent}</td>
            </tr>
            `
        })

        $("#userTabl").append(output);
        console.log(output);

    })
    .catch((error) => {
        console.log(error)
    })
})();

$("input").click('click', function() {
    filter($(this).attr('id'));
})

function filter(inputF){
    var input, filter, table, tr, td;
    input = document.getElementById(inputF);
    filter = input.value.toUpperCase();
    table = (input.id === "myTable") ? document.getElementById("myTable") : document.getElementById("userTabl");
    tr = table.getElementsByTagName("tr");

    for(var i = 0; i< tr.length; i++){
        td = tr[i].getElementsByTagName("td")[0];
        if(td){
            if(td.innerHTML.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = '';
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
