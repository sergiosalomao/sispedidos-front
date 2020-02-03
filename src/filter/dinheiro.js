
export default (valor) => {
  if (valor) {
    return `R$ ${(valor).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return valor;
};
