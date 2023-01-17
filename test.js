const x = [{
    'name':'hamza',
    'age': 20,
    'url':'thisthis'
},
{
    'name':'bushra',
    'age': 20,
    'url':'thisthis'
},
{
    'name':'hunnain',
    'age': 20,
    'url':'thisthis'
}];


//exclude the url property from x
//const {url, ...y} = x;

for(var i = 0; i < x.length; i++){
    delete x[i].url;
}

console.log(x);
