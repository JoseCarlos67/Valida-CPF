const formulario = document.querySelector('.formulario')

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const cpfInput = (e.target.querySelector('#displayCpf').value);
  const cpf = new ValidaCpf(cpfInput);
  console.log(cpf.valida());
})

function ValidaCpf(cpfRecebido) {
  Object.defineProperty(this, 'cpfLimpo', {
    enumerabel: true,
    get: function() {
      return cpfRecebido.replace(/\D+/g, '');
    }
  });
}

ValidaCpf.prototype.valida = function() {
  if(this.cpfLimpo === '') return false;
  if(this.cpfLimpo.length !== 11) return false;
  if(this.sequencia()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);
  
  const novoCpf = cpfParcial + digito1 + digito2;
  return novoCpf === this.cpfLimpo;
};

ValidaCpf.prototype.criaDigito = function(cpfParcial) {
  const cpfArray = Array.from(cpfParcial);
  
  let regresivo = cpfArray.length + 1;
  const total = cpfArray.reduce((acumulador, valorAtual) => {
    acumulador += (regresivo * Number(valorAtual));
    regresivo--;
    return acumulador;
  }, 0);
  const digito = 11 - (total % 11);
  return digito > 9 ? '0' : String(digito);
};

ValidaCpf.prototype.sequencia = function() {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
}
