(function(){
    let ourArray = db();
})();


function db() {
    let dbEntries = [];
    axios.get('https://my-json-server.typicode.com/Faxar/demo/db')
        .then((response) => {
                $.each(response.data.posts, (i, val) => {
                    dbEntries.push(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${val.title}`)
                })
            })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            dbEnt(dbEntries);
        })    
}

function dbEnt(arr){
    axios.all(arr.map(l => axios.get(l)))
    .then(axios.spread((...rest) => {
            console.log(rest);
    }))
    .catch((error) => {
        console.log(error);
    })
}


/*
1.Get user ingredient names
2.Find drinks that contain these ingredients
3.Compare arrays for duplicates
4.Filter arrays that it will show only cocktails that have user ingredient (not show if there is more ingredients that user have)
*/
