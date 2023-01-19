const x = [{
    'name':'espresso',
    'age': 20,
    'url':'thisthis',
    'ingredients': 'coffe beans'
},
{
    'name':'bushra',
    'age': 20,
    'url':'thisthis',
    'ingredients': 'coffe beans'

},
{
    'name':'hunnain',
    'age': 20,
    'url':'thisthis',
    'ingredients': 'coffe beans'
}];


//exclude the url property from x
//const {url, ...y} = x;

window.addEventListener('load', () => {
    document.getElementById('main_menu').innerHTML+=`<div class="col-lg-6 menu-item filter-specialty">

              
    <img src="assets/img/menu/bread-barrel.jpg" class="menu-img" alt="">
    <div class="menu-content">
      <a href="#">Bread Barrel</a><span>$6.95</span>
    </div>
    <div class="menu-ingredients">
      Lorem, deren, trataro, filede, nerada
    </div>
  </div>`;
});