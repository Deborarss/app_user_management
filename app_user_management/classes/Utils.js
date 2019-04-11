// Métodos Estáticos, não precisa criar uma instância da classe para utiliza-los 

class Utils {

    static dateFormat(date) {

        return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    }
}