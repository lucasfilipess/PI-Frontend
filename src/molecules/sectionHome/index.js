import React, { useState, useEffect } from 'react';
import homeImg from '../../assets/home.jpg';
import styled from 'styled-components';
import fertilizer from '../../assets/fertilizer.svg';
import foodDonation from '../../assets/foodDonation.svg';
import users from '../../assets/users.svg';
import hands from '../../assets/hands.svg';
import FormRegister from '../../molecules/formRegister';
import api from '../../services/api';
import ScrollAnimation from 'react-animate-on-scroll';
import FormLogin from '../../molecules/formLogin';
import Logo from '../../atoms/logo';
const ContainerImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 741px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${homeImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin-bottom: 60px;
  font-family: 'Roboto Slab', serif;
  & > h1 {
    color: #fff;
    font-size: 42px;
    font-weight: 200;
    text-align: center;
    text-transform: uppercase;
  }
`;

const SubText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Slab', serif;

  & > h2 {
    color: #f9ad81;
    font-size: 30px;
    font-weight: 300;
    strong {
      font-size: 30px;
      color: #fff;
    }
  }
`;

const LoginConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 741px;
  width: 100%;
  background: #eeeeee;
  -webkit-box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);
  p {
    font-size: 24px;
    text-align: center;
    line-height: 40px;
    & > strong {
      /* color: #f9ad81; */
      color: #4caf50;
      font-size: 40px;
      margin: 10px;
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      & > img + p {
        font-weight: 300;
        font-size: 32px;
        margin-bottom: 16px;
      }
      & > div {
        display: flex;
        padding: 20px;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 350px;
        border-radius: 4px;
        background: #f5f5f5;
        max-height: 300px;
        box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 100px 40px;
  background: #e0e0e0;
  -webkit-box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);

  height: 741px;
`;
const Description = styled.div`
  display: flex;
  width: 50%;
  margin-right: 40px;
  justify-content: center;

  p {
    font-size: 24px;
    text-align: justify;
    line-height: 40px;
    & > strong {
      /* color: #f9ad81; */
      color: #4caf50;
      font-size: 40px;
      margin: 10px;
    }
  }
`;
const Steps = styled.div`
  width: 50%;
  & > div {
    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding: 20px;
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
      border: 1px solid #757575;
      border-radius: 10px;
      background: #eeeeee;
      justify-content: space-between;
      & > img {
        margin: 0 20px 0 15px;
        max-height: auto;
        max-width: 60px;
      }
      & > p {
        font-size: 16px;
        font-weight: bold;
        text-align: justify;
        margin: 0;
      }
      & > p + p {
        margin-left: 15px;
      }
    }
  }
`;

const Number = styled.p`
  &&& {
    color: #4caf50;
    padding: 10px;
    font-weight: bold;
    font-size: 24px;
  }
`;

const Register = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 40px;

  background: #bdbdbd;
  box-shadow: 0 2px 2px red;
  height: 950px;
  -webkit-box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 40px -15px rgba(0, 0, 0, 0.3);
`;

const Card = styled.div`
  max-width: 500px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  background: #e0e0e0;
`;

const RegisterText = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 40px;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  p {
    font-size: 24px;
    text-align: justify;
    line-height: 40px;
    & > strong {
      /* color: #f9ad81; */
      color: #4caf50;
      font-size: 40px;
      margin: 10px;
    }
  }
  img {
    width: 250px;
    height: auto;
  }
`;
function SectionHome() {
  const [countDonations, setCountDonations] = useState(0);
  useEffect(() => {
    async function getDonationsCount() {
      try {
        api.get('/home').then((response) => setCountDonations(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    getDonationsCount();
  }, []);

  return (
    <>
      <ContainerImg>
        {/* <ScrollAnimation
          animateIn="fadeInDown"
          initiallyVisible={false}
          duration={2}
          animateOut="fadeOutUp"
        > */}
        <Text>
          <h1>Tornando o mundo verde novamente</h1>
        </Text>
        {/* </ScrollAnimation> */}
        {/* <ScrollAnimation
          animateIn="fadeInUp"
          initiallyVisible={false}
          duration={2}
          animateOut="fadeOutDown"
        > */}
        <SubText>
          <h2>
            <strong> &#60;</strong> Já foram feitas
            <strong> {countDonations} </strong>doações
            <strong> /&#62;</strong>
          </h2>
        </SubText>
        {/* </ScrollAnimation> */}
      </ContainerImg>

      <LoginConatiner>
        <div>
          <p>
            <strong> &#60;</strong>A cada nova doação estamos um passo mais
            próximo de um futuro brilhante. E tudo isso só será possível coma a
            sua ajuda, obrigado por apoiar um mundo mais verde.
            <strong> /&#62;</strong>
          </p>
        </div>
        <ScrollAnimation
          animateIn="fadeInRight"
          initiallyVisible={false}
          duration={2}
          animateOut="fadeOutRight"
        >
          <div>
            <Logo />
            <p>Faça seu Login</p>
            <div>
              <FormLogin />
            </div>
          </div>
        </ScrollAnimation>
      </LoginConatiner>

      <Container>
        <Description>
          <p>
            <strong> &#60;</strong>
            “Todos os anos, cerca de 1,3 bilhão de toneladas de alimentos são
            desperdiçadas ou perdidas em todo o mundo. Ou seja, cerca de um
            terço de tudo que produzimos acaba na lata do lixo.” O desperdício
            de alimentos em restaurantes, bares, Fast-Foods e até mesmo nas
            residências, gera um grande impacto ambiental, hoje existem diversas
            empresas que utilizam desse alimento descartado para transforma-lo
            em adubo. Com o objetivo de reduzir esse impacto a RE ALIMENTE visa
            unir empresas que necessitem descartar alimentos até as empresas que
            utilizam do mesmo para ser transformado em adubo.
            <strong> /&#62;</strong>
          </p>
        </Description>
        <Steps>
          <ScrollAnimation
            animateIn="fadeIn"
            initiallyVisible={false}
            duration={2}
            animateOut="fadeOut"
          >
            <div>
              <Number>1.</Number>
              <img src={users} alt="Imagem de usuários" />
              <p>
                Pessosas interessadas em doar alimentos acessam a plataforma
                fazendo o cadastro com alguns dados pessoais necessários para as
                doações.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            animateIn="fadeIn"
            initiallyVisible={false}
            duration={2}
            animateOut="fadeOut"
          >
            <div>
              <Number>2.</Number>
              <p>
                Depois de se cadastrar o usuário insere sua doação no sistema
                descrevendo quantidade e dados para contato
              </p>
              <img src={foodDonation} alt="Imagem de doação de alimento" />
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            animateIn="fadeIn"
            initiallyVisible={false}
            duration={2}
            animateOut="fadeOut"
          >
            <div>
              <Number>3.</Number>
              <img src={foodDonation} alt="Imagem de doação de alimento" />
              <p>
                Empresas que utilizam os alimentos entram em contato com os
                doadores por meio da RE ALIMENTE com os dados sedidos pelo
                doador. Assim elas fazem a coleta do alimento.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="fadeIn"
            initiallyVisible={false}
            duration={2}
            animateOut="fadeOut"
          >
            <div>
              <Number>4.</Number>
              <p>
                O alimento coletado é transformado em adubo orgânico que é mais
                indicado por ser, e ter um processo mais natural. Com ele o solo
                fica mais enriquecido.
              </p>
              <img src={fertilizer} alt="Adubo" />
            </div>
          </ScrollAnimation>
        </Steps>
      </Container>
      <Register>
        <RegisterText>
          <p>
            <strong> &#60;</strong>
            Se gostou da nossa ideia e quer ajudar a tornar o mundo um lugar
            mais verde, você pode se cadastrar preenchendo od dados ao lado.
            Todos os dados são necessários para que as doaçoes ocorram da melhor
            forma possível.
            <strong> /&#62;</strong>
          </p>
          <img src={hands} alt="Mãos da esperança" />
        </RegisterText>
        <ScrollAnimation
          animateIn="fadeInRight"
          initiallyVisible={false}
          duration={2}
          animateOut="fadeOutRight"
        >
          <Card>
            <FormRegister />
          </Card>
        </ScrollAnimation>
      </Register>
    </>
  );
}

export default SectionHome;
