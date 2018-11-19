(function(){
    // readAndLoadUserData();
    axiosGet();
    console.log('IIFE');
}
)();

function getGitHubData() {
    return axios.get('https://my-json-server.typicode.com/Faxar/demo/db');
}

function getDBData(){
    return axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
}

$("#list").on('click', 'td', function (){
    let cloneItem = $(this).parent().clone();
    $(this).parent().remove();
    cloneItem.appendTo("#userTabl");
    // console.log(cloneItem.getElementsByTagName('td')[0]);
    // pushToGit(cloneItem.textContent);
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

function pushToGit(item) {
    axios.post('https://my-json-server.typicode.com/Faxar/demo/posts', {"title": "Rum", "textContent": "mmm" })
    .then((response)=>{
        console.log("posted", response)
    })
}

function safeUserEntries(){
    $.each($('#userTabl').children().find('td'), (index, val) => {
        console.log('saving');
        sessionStorage.setItem('uId' + index, val.textContent);
    })
}

function removeItemsExistInUserandDB() {
    //Remove DB ingredients duplicates that already user have.
    $.each($("#userTabl").children().find('td'), (id, val) => {
        $.each($('#myTable').children().find('td'),(id1, val1) => {
            if(val.textContent.toUpperCase() === val1.textContent.toUpperCase()){
                $(val1).parent().remove();
            }
        })
})}

$('#list').find('input').keyup(function() {
    filter($(this).attr('id'));
    // console.log($(this).val());
})

function axiosGet(){
    axios.all([getGitHubData(), getDBData()])
    .then(axios.spread((user, db) => {
            let ingredients = db.data.drinks;
            let outputI = '';
            let uniqueOutput = [];
            $.each(ingredients, (i, el) => {
                if($.inArray(el, uniqueOutput) === -1) uniqueOutput.push(el); 
            })
            $.each(uniqueOutput, (id, val) => {
                outputI += `
                <tr>
                    <td>${val.strIngredient1}</td>
                </tr>
                `
            })
            $('#myTable').append(outputI);
            let ingr = user.data.posts;
            let output = '';
            $.each(ingr, (id, val) => {
                output += `
                <tr>
                    <td>${val.textContent}</td>
                </tr>
                `
            })
            $('#userTabl').append(output);
            }))
    .catch((err) => {
        console.log('FAIL', err)
    })
    .finally(()=>{
        removeItemsExistInUserandDB();
    })
}

// window.addEventListener('beforeunload', function(event){
//     safeUserEntries();
//     event.return = 'something';
// })


/* 
Temporary workaround due to not possible to save data via JSON to GIT.
Only read available right now
*/

//Load user data from session storage and populate to user table
function readAndLoadUserData() {
    let sessionStorItem = sessionStorage.getItem('uId0');
    if(sessionStorItem !== null) {
        let output = '';
        for(let i=0; ;i++){
        sessionStorItem = sessionStorage.getItem('uId' + i);
        console.log(sessionStorItem);
        if(sessionStorItem !== null){
           output += `
           <tr>
               <td>${sessionStorItem}</td>
           </tr>
           `
        } else {
            break;
        }
        }
        $("#userTabl").append(output);
    }  
}

/*
Search.
Show search results on index page.
*/

$('#search').click(() => {
    sessionStorage.setItem('searchId', $('#searchField').val());
    document.location.href = "http://127.0.0.1:5500/index.html";
});



