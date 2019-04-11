/*
var name = document.querySelector('#exampleInputName');
var gender = document.querySelectorAll('#form-user-create [name=gender]:checked');
var birth = document.querySelector('#exampleInputBirth');
var country = document.querySelector('#exampleInputName');
var email = document.querySelector('#exampleInputCountry');
var password = document.querySelector('#exampleInputPassword');
var photo = document.querySelector('#exampleInputPhoto');
var admin = document.querySelector('#exampleInputAdmin');
*/

// Melhorando o código acima, deixando mais inteligente
// ForEach - É um laço que percorre uma array e para cada item ele executa uma ação
// let campos = document.querySelectorAll('#form-user-create [name]');

/*
campos.forEach(function(campo, index){

    console.log(campo);
    console.log(index);
    console.log(campo.name);
    console.log(campo.id);
    console.log(campo.value)
    console.log(campo.id, campo.name, campo.value, index);

});
*/
// console.log(user);

//--------------------------------------------------------------------------------------------------------------------//
let userController = new UserController('form-user-create', 'table-users');

