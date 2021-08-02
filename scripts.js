class Calculadora {

    constructor() {
        this.op = document.getElementById("operacao");
        this.calcularBtn = document.getElementById("calcular");
        this.limparBtn = document.getElementById("limpar");
        this.total = 0;
        this.n1 = "";
        this.n2 = "";
        this.n3 = "";

        this.createListeners();
    }

    createListeners() {
        this.calcularBtn.addEventListener("click", () => {
            this.calcular();
        });

        this.limparBtn.addEventListener("click", () => {
            this.limpar();
        });

        window.addEventListener("click", (event) => {

            let botoesCollection = document.getElementsByClassName("btn-secondary");

            let botoesArray = [].slice.call(botoesCollection);

            if (botoesArray.includes(event.target) &&
                event.target != this.limparBtn &&
                event.target != this.calcularBtn) {

                this.inserir(event.target.innerHTML);
            }
        });
    }

    calcular() {
        this.op = document.getElementById("operacao");

        if (this.op.value.includes("%") == true) {
            this.calculaPorcentagem();

        } else if (this.op.value.includes("^") == true) {
            this.calculaPotencia();

        } else if (this.op.value.charAt(0) == "√") {
            this.calculaRaiz();

        } else if (this.op.value == "") {
            this.total = "";

        } else {
            this.calculaOutros();
        }

        this.exibeResultado(this.total);
    }

    calculaPorcentagem() {
        this.n1 = "";
        this.n2 = "";
        this.n3 = "";
        let operador = "";
        let index = this.op.value.indexOf("%");

        for (let i = 0; !isNaN(this.op.value[i]); i++) {
            this.n1 += this.op.value[i];
        }
        
        for (let i = (index - 1); !isNaN(this.op.value[i]); i--) {
            this.n2 += this.op.value[i];            
        }
        let n2separado = this.n2.split(""); // ["0", "0", "1"] 
        let n2array = n2separado.reverse(); // ["1, "0", "0"]
        this.n2 = n2array.join(""); // "100"

        if (this.op.value.includes("-")) {
            operador = "-";
        }
        if (this.op.value.includes("+")) {
            operador = "+";
        }
        if (this.op.value.includes("x")) {
            operador = "*";
        }
        if (this.op.value.includes("/")) {
            operador = "/";
        }
  
        this.n3 = (this.n1 * this.n2 / 100);
        this.total = eval(this.n1 + operador + this.n3);      
    }

    calculaPotencia() {
        this.n1 = "";
        this.n2 = "";
        let index = this.op.value.indexOf("^");
        for (let i = 0; i < index; i++) {
            this.n1 += this.op.value[i];
        }
        for (index += 1; index < this.op.value.length; index++) {
            this.n2 += this.op.value[index];
        }
        this.total = Math.pow(this.n1, this.n2);
    }

    calculaRaiz() {
        this.op.value;
        let raiz = this.op.value.substring(1, this.op.value.length);
        this.total = Math.sqrt(raiz);
    }

    calculaOutros() {
        if (this.op.value.includes("x")) {
            this.op.value = this.op.value.replace("x", "*");
        }
        this.total = eval(this.op.value);
    }

    inserir(valorDoBotao) {
        this.op.value += valorDoBotao;
    }

    limpar() {
        this.op.value = "";
        document.getElementById("resultado").value = "";
    }

    exibeResultado(total) {
        document.getElementById("resultado").value = total;
    }

}

let calculadora = new Calculadora();