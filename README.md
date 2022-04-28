# form-validation_petshop
<li> Make validations in the HTML itself using the required and type attributes;
<li> Use regex rules inside the pattern attribute to validate the password field;
<li> Send a custom error message in the browser balloon;
<li> Create functions for custom form validations;
<li> Define custom messages for validations outside of HTML;
<li> Using data attributes to work with JavaScript;
<li> Make the validation function more generic to work with any input;
<li> Installing and using the Liveserver plugin;
<li> Validating cpf with repeated numbers;
<li> The math behind validating the CPF;
<li> Function recursion;
<li> Another regex structure for CEP pre-validation;
<li> How to make a request to the ViaCEP API;
<li> Fill in other form fields with ViaCEP API response;
<li> How to add currency mask to price field.

## Hypertext References
<a href="https://stardusteight-d4c.github.io/form-validation_petshop/">Formulário</a><br>
<a href="https://stardusteight-d4c.github.io/form-validation_petshop/cadastro_produto">Cadastro de Produto</a>
  
When fetching the location information from the ViaCEP API we call the fetch() function passing two properties. 
One of them is the url that says where we should make the request and another property that is an object with options:
  
`method: 'GET'` is the type of request that will be made.
  
`mode: 'cors'` indicates that communication will be made between different applications.

`headers: {'content-type': 'application/json;charset=utf-8'}` tells us how we want to receive information from the API.
  
&copy; Alura
