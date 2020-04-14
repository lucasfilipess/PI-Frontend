
export const searchCep = async (e) => {

  let cep = e.replace(/\D/g, '');

  if (cep !== "") {

    let validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {

      const localization = await fetch('https://viacep.com.br/ws/' + cep + '/json')
        .then((response) => response.json())
        .then(data => {
          return data;
        });


      if (!localization.erro) {
        const resp = {
          city: localization.localidade,
          uf: localization.uf,
          address: localization.logradouro,
          neighborhood: localization.bairro
        };
        return resp;
      }
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
};



export const searchUf = (e) => {
  e = e.toUpperCase();
  const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  let verify = false;

  for (let i = 0; i < states.length; i++) {

    if (e === states[i]) {
      verify = true;
    }

  }

  if (verify) {
    return false;
  } else {
    return true;
  }

}




export const checkName = (e) => {
  if (e === '') {
    return true;
  } else {
    return false;
  }
}

export const checkTitle = (e) => {
  if (e === '') {
    return true;
  } else {
    return false;
  }
}

export const checkCity = (e) => {
  if (e.length <= 3) {
    return true;
  } else {
    return false;
  }
}

export const checkAddres = (e) => {
  if (e.length <= 3) {
    return true;
  } else {
    return false;
  }
}


export const checkNeighborhood = (e) => {
  if (e.length <= 3) {
    return true;
  } else {
    return false;
  }
}

export const checkEmail = (e) => {

  let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (validEmail.test(e)) {
    return false;
  } else {
    return true;
  }
}


export const checkDesciption = (e) => {
  if (e.length <= 5) {
    return true;
  } else {
    return false;
  }
}


export const checkWhatapp = (e) => {

  if (e === '') {
    return true;
  } else {

    let verify = false;

    for (let i = 0; i < e.length; i++) {

      if (e[i] === '_') {
        verify = true;
      }

    }

    if (verify) {
      return true;
    } else {
      return false;
    }

  }
}







