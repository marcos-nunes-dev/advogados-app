import { Component } from 'preact';
import { route } from 'preact-router';
import styled from 'styled-components';
import get from 'lodash/get';
import container from './container';
import { Scene } from '../../components';

/**
|--------------------------------------------------
| Container
|--------------------------------------------------
*/

const Container = styled.div`
  height: ${window.innerHeight}px;
  background-color: #fafafa;
`;

/**
|--------------------------------------------------
| CloseButon
|--------------------------------------------------
*/

const CloseButton = styled.i`
  position: absolute;
  left: 15px;
  top: 15px;
  font-size: 30px;
  cursor: pointer;
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.div`
  padding: 15px;
  text-align: center;
  font-size: 22px;
  color: #7986cb;
  font-weight: 500;
`;

/**
|--------------------------------------------------
| Padding
|--------------------------------------------------
*/

const Padding = styled.div`
  padding: 15px;
  background: #fafafa;
`;

/**
|--------------------------------------------------
| Thumnail
|--------------------------------------------------
*/

// const Thumbnail = styled.div`
//   text-align: center;
//   padding: 70px 0px;
//   border: 1px solid #e8e8e8;
//   color: #969696;
//   font-size: 14px;
//   border-radius: 2px;
// `;

/**
|--------------------------------------------------
| Warning
|--------------------------------------------------
*/

// const Warning = styled.div`
//   font-size: 13px;
//   padding-left: 10px;
//   line-height: 1.2;
//   color: #7b7b7b;
// `;

// const Textarea = styled.textarea`
//   padding: 15px;
//   width: 100%;
//   height: 100px;
//   font-size: 13px;
//   outline: none;
//   -webkit-appearance: none;
//   border: none;
//   margin-bottom: 65px;
// `;

// const Label = styled.div`
//   margin: 20px 0px 20px;
//   font-size: 13px;
// `;

const Button = styled.div`
  text-align: center;
  background-color: #7e57c2;
  text-align: center;
  height: 55px;
  width: 100%;
  bottom: 0;
  color: white;
  line-height: 55px;
  cursor: pointer;
  margin-top: 5px;
`;

/**
|--------------------------------------------------
| NewRequest
|--------------------------------------------------
*/

class Payment extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render({ lawyerProfile, freePlanConfig, goldPlanConfig }) {
    return (
      <Scene sync private>
        <Container>
          <CloseButton className="material-icons" onClick={() => route('/profile')}>
            close
          </CloseButton>
          <Title>Assinatura</Title>
          <Padding>
            <If condition={!get(lawyerProfile, 'subscription')}>
              <p>Seu plano é gratuito.</p>
              <p>Você tem direito a:</p>
              <p style={{ marginBottom: 0 }}>
                - Inserir até
                {get(freePlanConfig, 'rules.maxAreas', 2)}
                áreas de atuação
              </p>
              <p style={{ margin: 0 }}>
                - Publicar
                {get(freePlanConfig, 'rules.maxArticles', 1)}
                artigos
              </p>
              <p style={{ margin: 0 }}>
                - Publicar
                {get(freePlanConfig, 'rules.maxVideos', 1)}
                vídeos
              </p>
              <p style={{ margin: 0 }}>- Visualizar as Dúvidas</p>
              <p style={{ marginTop: 0 }}>- Aguardar o contato do cliente</p>

              <br />

              <p>Você poderá fazer um upgrade para o plano Gold:</p>
              <p style={{ marginBottom: 0 }}>- 30 dias de gratuidade</p>
              <p style={{ margin: 0 }}>
                - Fazer até
                {get(goldPlanConfig, 'rules.maxMonthlyServices', 1)}
                atendimentos por mês
              </p>
              <p style={{ margin: 0 }}>
                - Inserir até
                {get(goldPlanConfig, 'rules.maxAreas', 2)}
                áreas de atuação
              </p>
              <p style={{ margin: 0 }}>
                - Publicar
                {get(goldPlanConfig, 'rules.maxArticles', 1)}
                artigos
              </p>
              <p style={{ margin: 0 }}>
                - Publicar
                {get(goldPlanConfig, 'rules.maxVideos', 1)}
                Vídeo
              </p>
              <p style={{ marginTop: 0 }}>- Entrar em contato com o Cliente</p>
            </If>
            <div style={{ maxWidth: 500, margin: 'auto' }}>
              <Button onClick={() => route('/plans')}>
                Sim, quero fazer Upgrade para o Plano Gold
              </Button>
              <Button onClick={() => route('/updatepayment')}> Alterar cartão de crédito </Button>
            </div>
          </Padding>
        </Container>
      </Scene>
    );
  }
}

export default container(Payment);
