class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();     
    }

    getValues(){
        
        let user = {};
        let isValid = true;
        //console.log(...this.formEl.elements);
        //console.log(typeof(this.formEl.elements);
        // Usando Spread pega todos os indices que forem criados nesse array
        [...this.formEl.elements].forEach((campo, index)=>{
            
            // Validando formulário
            if(['name', 'email', 'password'].indexOf(campo.name) > -1 && !campo.value) {

                // Exibe os dados do objeto em forma de árvore com subniveis no console do navegador
                console.dir(campo)
                console.log(campo.name);
                
                // add uma nova classe para o parentElement(form-group)do campo
                campo.parentElement.classList.add('has-error');
                
                // Criando um novo elemento p para dar o erro
                let p = document.createElement('p');

                if(campo.name === 'name') {
                    p.innerHTML = '* Por favor, preencha o nome corretamente';
                    p.classList.add('help-block');
                    campo.parentElement.appendChild(p);
                }
                else if(campo.name === 'email') {
                    p.innerHTML = '* Por favor, preencha o email corretamente';
                    p.classList.add('help-block');
                    campo.parentElement.appendChild(p);
                }
                else if(campo.name === 'password') {
                    p.innerHTML = '* Por favor, preencha a senha corretamente';
                    p.classList.add('help-block');
                    campo.parentElement.appendChild(p);
                }
        
                isValid = false;
            }

            if(campo.name === 'gender') {    //o campo.checked já é automatico true para false usar o campo.checked === false
                
                if(campo.checked) {
                    user[campo.name] = campo.value;
                }
                
            } 
            else if(campo.name === 'admin') {
                user[campo.name] = campo.checked;
            } 
            else {
        
                // console.log('Não');  
                user[campo.name] = campo.value;
            }
            // console.log(campo.id, campo.name, campo.value, index);
              // console.log(user[campo.name]);
        });
        
        if(!isValid) {
            // Por conta do erro iremos retornar um false para sair da função
            return false;
        }
        // Objeto é uma instância de uma classe
        return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
    } 

    onSubmit(){
        // arrow Function
        this.formEl.addEventListener('submit', event => {

            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            // Desabilitando o botão submit enquanto processa as informações do formulário
            btn.disabled = true;
            
            let values = this.getValues();

            if(!values) return false;

            this.getPhoto().then(
                (content) => {

                values.photo = content;
                
                this.addLine(values);
                
                // Limpando o Formulário
                this.formEl.reset();
                
                // Habilitando o botão submit depois do processamento das informações
                btn.disabled = false;
                
                },
                (e) => {
                    console.error(e);
                }
            );  
        
        });
        
    }

    getPhoto() {

        return new Promise((resolve, reject) => {

        let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item => {
            if(item.name === 'photo') {

                return item;
            } 
        });

        let file = (elements[0].files[0]);
        //console.log(elements[0].files[0]);

        fileReader.onload = () => {
            
            resolve(fileReader.result);
        };

        fileReader.onerror = (e) => {

            reject(e);
        };

        if (file) {

            fileReader.readAsDataURL(file);
        } else {
            
            resolve('dist/img/boxed-bg.jpg');
        }       

        });
  
    }

    addLine(dataUser) {
        //console.log(dataUser)
        
        let tr = document.createElement('tr');

        tr.innerHTML = `
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin)?'Sim':'Não'}</td>       
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
        `;

        this.tableEl.appendChild(tr);
    
    }
}