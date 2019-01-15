import { h } from 'preact';
import container from './container';
import { route } from 'preact-router';
import { Scene, Block } from '../../components';
import styled from 'styled-components';

const CloseIcon = styled.i`
  position: absolute;
  font-size: 30px !important;
  left: 10px;
  top: 10px;
`;

const Link = styled.a`
  color: #303f9f;
`;

const NotFound = () => (
  <Scene container sync>
    <CloseIcon className="material-icons" onClick={() => window.history.back()}>
      arrow_back
    </CloseIcon>
    <br />
    <Block>
      <h1>
        Como contratar corretamente um excelente advogado através do
        oiadvogado.com.br
      </h1>

      <h3>O que fazem, exatamente, os advogados no oiadvogado.com.br?</h3>
      <p>
        Os Advogados atuam como defensores de pessoas e organizações, portanto,
        representam os clientes nas mais diversas áreas do direito. São
        profissionais imprescindíveis em situações que que envolvam consultas
        jurídicas e litígios. Para isso, o cadastro profissional desenvolvido
        pelo oiadvogado.com.br foi elaborado por uma equipe multidisciplinar
        para que as informações prestadas pelos advogados sejam precisas,
        eletivas e as mais transparentes possível, possibilitando ao cliente,
        acessar detalhadamente as expertises, experiências e currículo do
        profissional.
      </p>

      <h3>Que tipo de advogado que eu devo contratar?</h3>
      <p>
        Muitos advogados tendem concentrar seu conhecimento apenas em uma área,
        ou em várias áreas relacionadas. Para pesquisar o advogado correto, você
        deve procurar um profissional que além de compreender sobre o assunto de
        interesse, possua experiência na área específica de seu problema. Por
        exemplo, um advogado de família provavelmente não será capaz de ajudá-lo
        se você estiver considerando um assunto sobre direito penal. Por outro
        lado, devido a criação de várias sub especialidades, o cliente, por
        vezes, não sabe exatamente que tipo de profissional buscar. Por isso, o
        oiadvogados.com.br disponibiliza uma ferramenta de pesquisa valiosa para
        localizar o advogado correto e sua área de atuação. Caso prefira, você
        também pode detalhar seu problema no campo determinado para aguardar o
        contato de um profissional.
        <Link onClick={() => route('/newrequest')}> Clique aqui</Link>
      </p>

      <h3>O que devo fazer para contratar um advogado com segurança?</h3>
      <p>
        Primeiramente você deve selecionar o advogado que tenha conhecimento na
        área em que está o seu problema, e, em seguida, verificar o perfil do
        advogado, além de levantar detalhadamente todas as informações contidas
        no perfil, tais como, apresentação pessoal, data de formação,
        experiência e qualificações, inclusive, avaliações de outros clientes,
        localização condizente com o problema e a situação profissional perante
        a Ordem dos Advogados do Brasil, se está ativa,. A missão principal do
        oiadvogados.com.br é fornecer ao cliente, através da clareza de
        informações, todas as condições para contratar o advogado correto para
        cada caso, com a segurança peculiar que o trabalho exige.
      </p>

      <h3>
        A localização é um fator importante na minha busca por um advogado?
      </h3>
      <p>
        Sim, pois o seu problema pode depender de leis e regulamentos regionais,
        além da proximidade para contatos pessoais, contudo, alguns advogados
        estão dispostos a viajar para conhecê-lo, mas também podem cobrar por
        tempo de viagem. Por outro lado, se o problema for específico e exigir o
        conhecimento de um especialista, sem dúvida, você deverá reconsiderar.
      </p>

      <h3>Como funcionam as avaliações dos clientes?</h3>
      <p>
        Uma das melhores maneiras de saber se um advogado é ideal para sua
        contratação é consultar as avaliações de outros clientes. Leia
        atentamente os comentários anteriores e se tiver alguma dúvida, não
        hesite em questionar. E se contratar, deixe também os seus comentários.
      </p>

      <h3>
        O que é um contrato de representação, honorários para reunião, taxa de
        sucesso, honorários fixos, honorários por hora trabalhada, despesas do
        processo, custas judicias e taxa de acompanhamento de processo? Leia
        abaixo a explicação.
      </h3>
      <p>
        O contrato de representação é um acordo de pagamento entre um advogado e
        o cliente. Ele pode ser elaborado de várias formas, e abrange questões
        fundamentais, como o quanto você vai ter que pagar por serviços
        prestados, como o advogado será pago, o cronograma de pagamento, e como
        o advogado vai trabalhar no caso. Certifique-se de ler cuidadosamente
        antes de assiná-lo, para desta forma, saber exatamente o que é esperado
        de seu advogado. <br />
        Honorários para Reunião: Não são todos os advogados que trabalham desta
        forma, mas é possível que um advogado queira cobrar para realizar a
        primeira reunião de consulta, portanto, certifique-se de conhecer as
        suas regras. Perguntar sobre os valores antes de fazer um compromisso, e
        como é calculado, é fundamental. Taxas de sucesso/contingência: A taxa
        de sucesso/contingência significa que o seu advogado só será pago se
        houver um resultado favorável no seu caso, uma vitória judicial ou um
        acordo em seu favor. Normalmente, mas não sempre, essas taxas consistem
        em até 30% do total de acordo, liquidação ou julgamento. Honorários
        fixos: Honorário fixo significa que o advogado cobra um preço para cada
        consulta, ou para um período fixo, como por exemplo, mensal, não
        importando quanto tempo demande o serviço. Por hora trabalhada:
        Advogados podem cobrar uma taxa hora pelo seu trabalho, ou pelo trabalho
        de seus assistentes. Nessa cobrança hora aplica-se o valor versus o
        tempo que o profissional irá se dedicar. Um bom advogado geralmente é
        capaz de estimar o número necessário de horas por cada caso. Despesas:
        Para dar andamento e celeridade ao processo é necessário extrair cópia,
        deslocar-se ao fórum, despachar com juiz, efetuar ligações telefônicas,
        utilizar correio, cartórios e outras e essas despesas costumeiramente
        são reembolsadas pelos clientes. Pergunte antecipadamente a previsão de
        gastos. Custas Judiciais: para ingressar em juízo você terá que pagar
        custas judiciais. Um bom advogado será capaz de estimar as custas
        judiciais, portanto, não deixe de questionar. Taxa de Acompanhamento do
        processo: Esta taxa normalmente é cobrada para o advogado acompanhar o
        processo em todo o seu curso. Esse acompanhamento é fundamental para o
        sucesso processual e material da demanda judicial.
      </p>

      <h3>Como um advogado pode entrar em contato comigo?</h3>
      <p>
        Se você descreveu o seu problema no campo específico e algum advogado
        lhe retornou oferecendo seus serviços, certifique-se do perfil do
        advogado e suas qualificações, pergunte sobre os seus métodos de
        comunicação, onde o advogado se encontra, se aceita ser contratado para
        consultas via e-mail. Certifique-se também sobre o prazo de respostas,
        como por exemplo, (dentro de 24 horas) e sua disponibilidade.
      </p>
    </Block>
  </Scene>
);

export default container(NotFound);
