export const searchCep = async (e) => {
  if (e === '_____-___') return 'vazio';
  let cep = e.replace(/\D/g, '');

  let validacep = /^[0-9]{8}$/;

  if (validacep.test(cep)) {
    const localization = await fetch(
      'https://viacep.com.br/ws/' + cep + '/json'
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    if (!localization.erro) {
      const resp = {
        city: localization.localidade,
        uf: localization.uf,
        address: localization.logradouro,
        neighborhood: localization.bairro,
        complement: localization.complemento,
        number: localization.gia,
      };
      return resp;
    }
  } else {
    return false;
  }
};

export const searchUf = (e) => {
  if (e === '') return false;
  e = e.toUpperCase();
  const states = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

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
};

export const isNotEmpty = (e) => {
  if (e.length <= 3) {
    return true;
  } else {
    return false;
  }
};
export const isNotEmpty2 = (e) => {
  if (e < 2) {
    return true;
  } else {
    return false;
  }
};

export const isNotEmpty3 = (e) => {
  if (e === '') {
    return true;
  } else {
    return false;
  }
};

export const checkNeighborhood = (e) => {
  if (e.length <= 3) {
    return true;
  } else {
    return false;
  }
};

export const checkEmail = (e) => {
  if (e === '') return false;
  let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (validEmail.test(e)) {
    return false;
  } else {
    return true;
  }
};

export const checkDesciption = (e) => {
  if (e.length <= 5) {
    return true;
  } else {
    return false;
  }
};

export const checkWhatapp = (e) => {
  if (e === '(__) _ ____-____') return false;
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
};

export const unformat = (e) => {
  e = e.replace('-', '');
  e = e.replace(' ', '');
  e = e.replace(' ', '');
  return e;
};

export const format = (e) => {
  const ddd = e.slice(0, 2);
  const part9 = e.slice(2, 3);
  const part1 = e.slice(3, 7);
  const part2 = e.slice(7, 11);
  const formated = `(${ddd}) ${part9} ${part1}-${part2}`;
  return formated;
};
