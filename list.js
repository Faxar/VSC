function getGitHubData() {
    return axios.get('https://my-json-server.typicode.com/Faxar/demo/db');
}

function getDBData(){
    return axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
}

axios.all([getGitHubData(), getDBData()])
    .then(axios.spread((user, db) => {
                let ingr = user.data.posts;
                let output = '';
                $.each(ingr, (id, val) => {
                    output += `
                    <tr>
                        <td>${val.textContent}</td>
                    </tr>
                    `
                })
                $("#userTabl").append(output);

                let ingredients = db.data.drinks;
                let outputI = '';
                $.each(ingredients, (id, val) => {
                outputI += `
                <tr>
                    <td>${val.strIngredient1}</td>
                </tr>
                `
        })
        $('#myTable').append(outputI);
        }))
        .catch((err) => {
            console.log('FAIL', err)
        })
        .finally(() => {
            //Remove DB ingredients that user already have.
            $.each($("#userTabl").children().find('td'), (id, val) => {
                $.each($('#myTable').children().find('td'),(id1, val1) => {
                    if(val.textContent.toUpperCase() === val1.textContent.toUpperCase()){
                        $(val1).parent().remove();
                    }
                })
        })});

$("input").keyup(function() {
    filter($(this).attr('id'));
    // console.log($(this).val());
})

$("#list").on('click', 'td', function (){
    let cloneItem = $(this).parent().clone();
    $(this).parent().remove();
    cloneItem.appendTo("#userTabl");
    pushToGit($(this).text());
    // console.log($(this).text());
    //find closest table entry and get it 'ID'
    // console.log($(this).closest('table').attr('id'));
});
    
function filter(inputF){
    var input, filter, table, tr, td;
    input = document.getElementById(inputF);
    filter = input.value.toUpperCase();
    table = (input.id === "myInput") ? document.getElementById("myTable") : document.getElementById("userTabl");
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

//Not working yet
function pushToGit(item) {
    console.log(item);
    axios.post('https://my-json-server.typicode.com/Faxar/demo/posts', {"title": "Rum", "textContent": item })
    .then((response)=>{
        console.log("posted", response)
    })
}
