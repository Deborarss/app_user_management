class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();     
    }

    getValues(){
        
        let user = {};
        console.log(...this.formEl.elements);
        //console.log(typeof(this.formEl.elements);
        // Usando Spread pega todos os indices que forem criados nesse array
        [...this.formEl.elements].forEach((campo, index)=>{
            
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
               console.log(user[campo.name]);
        });
    
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
                <td>${dataUser.register}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
        `;

        this.tableEl.appendChild(tr);
    
    }
}