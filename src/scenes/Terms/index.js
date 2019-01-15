import { h } from 'preact';
import container from './container';
import styled from 'styled-components';

// const CloseIcon = styled.i`
//   position: absolute;
//   font-size: 30px !important;
//   left: 10px;
//   top: 10px;
// `;

/**
|--------------------------------------------------
| Wrapper
|--------------------------------------------------
*/

const Wrapper = styled.div`
  height: 350px;
  overflow-y: scroll;
  text-align: justify !important;
`;

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/

const NotFound = () => (
  <Wrapper>
    <div style={{ paddingRight: 10 }}>
      <p style="text-align: justify;">
        Ao acessar o aplicativo/website oiadvogado.com.br voc&ecirc; reconhece e
        concorda com todos os termos e condi&ccedil;&otilde;es aqui expostos,
        bem como, com a nossa Pol&iacute;tica de Privacidade. Caso n&atilde;o
        concorde inteiramente com estes instrumentos, voc&ecirc; n&atilde;o
        est&aacute; autorizado a acessar ou utilizar este Aplicativo/Site.
        Quando realizar a leitura das palavras, site ou aplicativo, os termos e
        condi&ccedil;&otilde;es aqui inseridos, dever&atilde;o ser compreendidos
        e estendidos para ambas as plataformas, Android e IOS.
      </p>

      <p style="text-align: justify;">
        Os Termos constituem um acordo legal que vincula voc&ecirc; aos
        ambientes oiadvogado.com.br, inclusive se utilizar qualquer outra
        plataforma oferecida por nossa empresa. Adicionalmente, e em certos
        casos, n&oacute;s poderemos celebrar contratos, termos e
        condiç&otilde;es adicionais de utiliza&ccedil;&atilde;o com os
        usu&aacute;rios deste site, e incorporando a este, um Termos de
        refer&ecirc;ncia.
      </p>

      <p style="text-align: justify;">
        NOSSAS PLATAFORMAS S&Atilde;O DE USO EXCLUSIVO PARA MAIORES DE 18 ANOS.
        CRIANÇAS MENORES DE 18 ANOS DEVEM OBTER CONSENTIMENTO EXPRESSO DE SEUS
        PAIS OU REPRESENTANTES LEGAIS ANTES DE ACESSAR E USAR ESTE
        APLICATIVO/SITE.
      </p>

      <p style="text-align: justify;">
        OS REPRESENTANTES LEGAIS SER&Atilde;O RESPONS&Aacute;VEIS POR TODOS E
        QUAISQUER ATOS IL&Iacute;CITOS COMETIDOS POR MENORES AO UTILIZAR ESTE
        SITE.
      </p>

      <p style="text-align: justify;">
        01. O Aplicativo/Site oiadvogados.com.br &eacute; uma p&aacute;gina de
        classificados, que n&atilde;o possui nenhuma responsabilidade sobre
        qualquer negociaç&atilde;o, transaç&atilde;o ou contrataç&atilde;o de
        serviços que venha a ser realizada entre seus usu&aacute;rios, dos quais
        advogados e clientes.
      </p>

      <p style="text-align: justify;">
        Desta forma, &eacute; fundamental que todos os usu&aacute;rios sejam
        respons&aacute;veis e diligentes na utilizaç&atilde;o deste
        Aplicativo/Site, bem como, em qualquer neg&oacute;cio que venha a ser
        realizado atrav&eacute;s dele. O aplicativo/site funciona como um local
        que permite que os prestadores de serviços jur&iacute;dicos, ora
        advogados, que aqui se apresentam (denominado &quot;advogado&quot;)
        ofereçam um serviço aos clientes, e estes &uacute;ltimos realizem de
        forma independente a contrataç&atilde;o. A oiadvogados.com.br n&atilde;o
        est&aacute; envolvida em nenhuma transaç&atilde;o entre ambos, portanto,
        qualquer resultado entre advogado e cliente, incluindo qualidade,
        segurança, pontualidade, legalidade das informaç&otilde;es, veracidade
        ou exatid&atilde;o dos an&uacute;ncios, pois esta, &eacute; de
        responsabilidade exclusiva de cada uma das partes, advogados e clientes.
      </p>

      <p style="text-align: justify;">
        Cumpre-se reafirmar ainda, em que n&atilde;o possu&iacute;mos qualquer
        responsabilidade pela qualidade dos servi&ccedil;os prestados.
      </p>

      <p style="text-align: justify;">02. Licença limitada para usar o site</p>

      <p style="text-align: justify;">
        Usu&aacute;rios tem licen&ccedil;a limitada, revog&aacute;vel e
        n&atilde;o exclusiva para acessar o Aplicativo/Site e os
        conte&uacute;dos e serviços oferecidos, ser&atilde;o sempre de acordo os
        Termos aqui expostos. Qualquer utilizaç&atilde;o que n&atilde;o estiver
        em conformidade com estes ou previamente autorizado por n&oacute;s, por
        escrito, &eacute; expressamente proibido.
      </p>

      <p style="text-align: justify;">
        03. Utilizaç&atilde;o n&atilde;o-autorizada das plataformas
      </p>

      <p style="text-align: justify;">
        A licença concedida aos usu&aacute;rios para utilizar o Aplicativo/Site
        nestes Termos, n&atilde;o inclui o direito de coletar, agregar, copiar,
        escanear, duplicar, exibir o uso de derivados do Site, nem qualquer
        direito de uso de data mining, robots, e extraç&atilde;o de dados sem a
        nossa autorizaç&atilde;o pr&eacute;via e por escrito; considerando, no
        prop&oacute;sitos gerais dos instrumentos de busca da Internet e
        n&atilde;o comercial dos arquivos spiders ou ferramenta similar de
        coleta entanto, que uma exceç&atilde;o limitada da exclus&atilde;o acima
        mencionada &eacute; fornecida para os p&uacute;blicos que utilizam
        ferramentas para coletar informaç&otilde;es para o &uacute;nico
        prop&oacute;sito de exibir hiperlinks para Site, desde que cada um faça
        a partir de um endereço IP est&aacute;vel ou conjunto de endereços IP
        usando um agente facilmente identific&aacute;vel e cumprir com o nosso
        arquivo robots.txt. &quot;Prop&oacute;sito geral dos instrumentos de
        busca da internet&quot; n&atilde;o incluem um website ou instrumento de
        busca ou outro serviço que oferece an&uacute;ncios classificados ou
        an&uacute;ncios, ou qualquer subconjunto do mesmo, ou que est&aacute; no
        ramo de prestaç&atilde;o de serviços jur&iacute;dicos ou outros serviços
        que competem com nosso Site. Utilizaç&otilde;es n&atilde;o autorizadas
        do site tamb&eacute;m incluem, mas sem limitaç&atilde;o, aqueles
        listados abaixo. Voc&ecirc; concorda em n&atilde;o fazer o que se segue,
        salvo se previamente autorizado por n&oacute;s, por escrito: Copiar,
        reproduzir, fazer uploads, publicar, exibir, republicar, distribuir ou
        transmitir qualquer parte do conte&uacute;do em qualquer forma;
      </p>

      <p style="text-align: justify;">
        Reproduzir qualquer parte do aplicativo/site em seu site ou de outra
        forma, usando qualquer dispositivo incluindo, mas n&atilde;o limitado
        utilizaç&atilde;o de ambiente de moldura ou borda do site, ou outra
        t&eacute;cnica de construç&atilde;o para incluir qualquer parte ou
        apar&ecirc;ncia do Site, ou espelhar ou reproduzir qualquer parte do
        aplicativo/Site;
      </p>

      <p style="text-align: justify;">
        Modificar, traduzir para qualquer idioma ou linguagem de computador, ou
        criar obras derivadas de qualquer conte&uacute;do ou qualquer parte do
        Site;
      </p>

      <p style="text-align: justify;">
        Revers&atilde;o de engenharia de qualquer parte do Site;
      </p>

      <p style="text-align: justify;">
        Vender, oferecer para venda, transferir ou licenciar qualquer parte do
        Site de qualquer forma a quaisquer terceiros;
      </p>

      <p style="text-align: justify;">
        Utilizar qualquer robot em qualquer parte do Site; scraper, outro
        dispositivo autom&aacute;tico, ou processo manual para monitorar, copiar
        ou guardar uma c&oacute;pia do banco de dados do conte&uacute;do ou
        Utilizar o aplicativo/site e sua funcionalidade de questionamentos para
        al&eacute;m de anunciar e / ou pesquisar prestaç&atilde;o de serviços
        jur&iacute;dicos, de fazer perguntas leg&iacute;timas para possa dar
        origem a responsabilidade civil ou criminal; spider, nossos membros ou
        qualquer outro uso expressamente autorizado; Utilizar, publicar ou
        transmitir informaç&otilde;es que sejam de alguma forma falsas,
        fraudulentas ou enganosas, incluindo qualquer reserva ou pesquisa sob
        falsos pretextos, ou tomar qualquer aç&atilde;o que possa ser
        considerada phishing ou que Enviar ou transmitir qualquer material
        ilegal, ameaçador, abusivo, calunioso, difamat&oacute;rio, obsceno,
        vulgar, indecente, inflamat&oacute;ria, sexualmente expl&iacute;cito,
        pornogr&aacute;fico ou profano; Violar, plagiar ou infringir os nossos
        direitos ou de terceiros, incluindo, sem limitaç&atilde;o, direitos
        autorais, marcas, patentes, segredos comerciais, direitos de publicidade
        ou privacidade ou quaisquer outros direitos de propriedade intelectual;
        ou Utilizar ou acessar o aplicativo/site de qualquer forma que, ao nosso
        crit&eacute;rio, prejudiquem ou possam prejudicar o desempenho ou a
        funç&atilde;o do Site ou qualquer outro sistema utilizado por n&oacute;s
        ou pelo Site.
      </p>

      <p style="text-align: justify;">
        Se voc&ecirc; tem ci&ecirc;ncia ou conhecimento de qualquer
        conte&uacute;do, atividade ou comunica&ccedil;&atilde;o ou que
        pare&ccedil;a estar em desacordo com as restri&ccedil;&otilde;es acima,
        ou em viola&ccedil;&atilde;o de qualquer outra disposi&ccedil;&atilde;o
        destes Termos, pedimos a gentileza de nos informar de tais
        viola&ccedil;&otilde;es.
      </p>

      <p style="text-align: justify;">
        04. Direitos de propriedade e download de Informaç&otilde;es do Site
      </p>

      <p style="text-align: justify;">
        O Aplicativo/Site e todo o seu conte&uacute;do s&atilde;o protegidos por
        direitos autorais nos termos da Lei de direitos autorais brasileiro e
        internacionais, convenç&otilde;es, assim como o direito de banco de
        dados. Copiar, armazenar ou acessar o Aplicativo/Site ou qualquer
        conte&uacute;do que n&atilde;o seja para seu uso pessoal &eacute;
        expressamente proibido sem autorizaç&atilde;o.
      </p>

      <p style="text-align: justify;">05. Transmiss&atilde;o de dados.</p>

      <p style="text-align: justify;">
        Quando voc&ecirc; fornece seu endereço de e-mail a qualquer serviço ou
        ferramenta contida no aplicativo/site, voc&ecirc; concorda em permitir
        que este e seus websites afiliados adicionem o seu endereço de e-mail em
        base de dados de usu&aacute;rios, a fim de receber um ou mais e- mails
        promocionais. O uso do Aplicativo/Site indica seu reconhecimento e sua
        concord&acirc;ncia com a nossa Pol&iacute;tica de Privacidade .Cada
        usu&aacute;rio reconhece e concorda que, independentemente da
        localizaç&atilde;o f&iacute;sica do usu&aacute;rio, podemos armazenar e
        processar dados transmitidos ao Site de tal usu&aacute;rio localizado no
        Brasil ou no exterior.
      </p>

      <p style="text-align: justify;">06. Verificaç&atilde;o de identidade</p>

      <p style="text-align: justify;">
        <br />A verificaç&atilde;o do usu&aacute;rio na internet &eacute;
        dif&iacute;cil, por isso n&atilde;o assumimos qualquer responsabilidade
        pela confirmaç&atilde;o da identidade alegada de cada usu&aacute;rio,
        por isso, n&oacute;s solicitamos que voc&ecirc; se comunique diretamente
        com o advogado ou cliente atrav&eacute;s das ferramentas
        dispon&iacute;veis no Site, al&eacute;m de certificar a veracidade da
        inscriç&atilde;o do advogado atrav&eacute;s do cadastro nacional de
        advogados http://cna.oab.org.br/
      </p>

      <p style="text-align: justify;">
        <br />Voc&ecirc; concorda em (i) manter a sua senha e identidade online
        seguras e estritamente confidenciais, fornecendo apenas para
        usu&aacute;rios autorizados de sua conta, (ii) instruir cada pessoa a
        quem voc&ecirc; d&aacute; a sua identidade online e senha para que ele
        ou ela n&atilde;o divulguem a qualquer pessoa n&atilde;o autorizada,
        (iii) notificar-nos imediatamente e selecione uma nova identidade
        on-line e senha, se voc&ecirc; acredita que sua senha pode ter se
        tornado conhecido por uma pessoa n&atilde;o autorizada, e (iv)
        notificar-nos imediatamente se voc&ecirc; for contatado por qualquer
        pessoa que peça o sua identidade online e senha. N&oacute;s o
        desencorajamos a fornecer a qualquer pessoa o acesso a sua identidade
        online e senha. No entanto, se voc&ecirc; der a algu&eacute;m a sua
        identidade online e senha, ou se voc&ecirc; n&atilde;o proteger
        adequadamente estas informaç&otilde;es, voc&ecirc; &eacute; o
        respons&aacute;vel por todas as transaç&otilde;es que a pessoa realizar
        ao utilizar sua conta, mesmo aquelas operaç&otilde;es que sejam
        fraudulentas ou que voc&ecirc; n&atilde;o tinha a intenç&atilde;o ou
        desejo de realiz&aacute;-las.
      </p>

      <p style="text-align: justify;">
        <br />CADA USU&Aacute;RIO RECONHECE E CONCORDA QUE: (1) NEM O
        APLICATIVO/SITE E NEM QUALQUER DE SEUS PARCEIROS TER&Atilde;O QUALQUER
        RESPONSABILIDADE PERANTE QUALQUER USU&Aacute;RIO POR QUALQUER
        TRANSAÇ&Atilde;O N&Atilde;O AUTORIZADA USANDO SENHA DE QUALQUER
        USU&Aacute;RIO QUE OCORRA ANTES DA NOTIFICAÇ&Atilde;O DESTE
        USU&Aacute;RIO, SOBRE A POSSIBILIDADE DE UMA UTILIZAÇ&Atilde;O
        N&Atilde;O AUTORIZADA DESTA SENHA, E N&Oacute;S TIVERMOS OPORTUNIDADE
        RAZO&Aacute;VEL PARA AGIR COM BASE NESSA NOTIFICAÇ&Atilde;O E (2) O USO
        N&Atilde;O AUTORIZADO DE SUA IDENTIDADE ONLINE E A SENHA PODEM
        CAUSAR-LHE RESPONSABILIDADE PARA COM O SITE E OUTROS USU&Aacute;RIOS.
        Al&eacute;m disso, podemos, sem aviso pr&eacute;vio, suspender ou
        cancelar o seu an&uacute;ncio a qualquer momento, mesmo sem receber sua
        notificaç&atilde;o, caso suspeitarmos, a nosso crit&eacute;rio, que a
        sua senha est&aacute; sendo usado de forma n&atilde;o autorizada ou
        fraudulenta.
      </p>

      <p style="text-align: justify;">
        07. Sigilo ao Usu&aacute;rio e Pol&iacute;tica de Spam
      </p>

      <p style="text-align: justify;">
        &Eacute; inadmiss&iacute;vel a utilizaç&atilde;o de informaç&otilde;es
        dos usu&aacute;rios do aplicativo/site para outros fins que n&atilde;o
        sejam aqueles aqui expostos. Al&eacute;m disso, voc&ecirc; concorda que
        ir&aacute; proteger as informaç&otilde;es pessoais de outros
        usu&aacute;rios com o mesmo grau de cuidado que voc&ecirc; protege suas
        pr&oacute;prias informaç&otilde;es confidenciais (utilizando um
        m&iacute;nimo de cuidado razo&aacute;vel), e assume toda a
        responsabilidade pelo uso indevido, perda ou transfer&ecirc;ncia
        n&atilde;o autorizada de tais informaç&otilde;es.
      </p>

      <p style="text-align: justify;">
        N&Atilde;O SE TOLERA SPAM OU COMUNICAÇ&Otilde;ES COMERCIAIS
        ELETR&Ocirc;NICAS N&Atilde;O SOLICITADAS DE QUALQUER ESP&Eacute;CIE.
        PORTANTO, SEM PREJU&Iacute;ZO DO PRECEDENTE, VOC&Ecirc; N&Atilde;O
        EST&Aacute; LICENCIADO A ADICIONAR UM USU&Aacute;RIO SEM A
        AUTORIZAÇ&Atilde;O EXPRESSA DESTE.
      </p>

      <p style="text-align: justify;">
        08. Responsabilidade pelo conte&uacute;do publicado pelo usu&aacute;rio
      </p>

      <p style="text-align: justify;">
        N&atilde;o nos responsabilizamos pelos conte&uacute;dos publicados pelos
        advogados nem tampouco pelos coment&aacute;rios e avaliaç&otilde;es
        publicadas no Aplicativo/Site. No entanto, n&oacute;s nos reservamos ao
        direito de recusar e retirar postagens de conte&uacute;do agressivo e
        com baixo cal&atilde;o.
      </p>

      <p style="text-align: justify;">
        Por fim, nos reservamos o direito (mas n&atilde;o assumimos a
        obrigaç&atilde;o) de alterar o conte&uacute;do que talvez venha a
        denegrir de alguma forma as partes, com prop&oacute;sito &uacute;nico de
        adequar o conte&uacute;do com nossas orientaç&otilde;es ou requerimentos
        de formataç&atilde;o.
        <br />Os advogados e clientes s&atilde;o os &uacute;nicos
        respons&aacute;veis por manter as informaç&otilde;es atualizadas no
        Aplicativo/Site. N&oacute;s n&atilde;o podemos garantir que qualquer
        c&oacute;pia, conte&uacute;do, avaliaç&otilde;es e etc sejam verdadeiras
        ou atualizadas. Os advogados e clientes s&atilde;o os &uacute;nicos
        respons&aacute;veis por garantir a precis&atilde;o de qualquer
        informaç&atilde;o.
      </p>

      <p style="text-align: justify;">
        09. Notificaç&atilde;o de Infraç&atilde;o
      </p>

      <p style="text-align: justify;">
        &Eacute; terminantemente proibido, nos termos da lei de direito de
        propriedade intelectual, a postagem de qualquer conte&uacute;do que
        viole direitos autorais de qualquer pessoa. Caso voc&ecirc; conheça ou
        suspeite de qualquer violaç&atilde;o de direitos autorais sobre este
        site, por favor notifique o departamento jur&iacute;dico de nossa matriz
        jur&iacute;dico@oiadvogados.adv.br.
      </p>

      <p style="text-align: justify;">10. Links para aplicativos/sites</p>

      <p style="text-align: justify;">
        Este site pode conter links e indicaç&otilde;es de outros sites da
        Internet, recursos e patrocinadores do Site.
      </p>

      <p style="text-align: justify;">
        <br />
      </p>

      <p style="text-align: justify;">
        11. Limitaç&atilde;o da responsabilidade
      </p>

      <p style="text-align: justify;">
        EM NENHUMA HIP&Oacute;TESE, O NOSSO APLICATIVO/SITE, NOSSA CONTROLADORA,
        PARCEIROS, AFILIADOS, DIRETORES, CONSELHEIROS CONSULTORES, AGENTES E/OU
        EMPREGADOS OU QUALQUER TERCEIRO, FORNECEDOR DE UM SERVIÇO SER&Atilde;O
        RESPONS&Aacute;VEIS POR QUALQUER PREJU&Iacute;ZO OU QUALQUER DANO
        INDIRETO, CONSEQUENCIAL, ESPECIAL, INCIDENTAL OU PUNITIVO DECORRENTES,
        BASEADOS OU RESULTANTES (A) DO NOSSO SITE/APLICATIVO, (B) DESTES TERMOS,
        (C) DE QUALQUER VIOLAÇ&Atilde;O DESTES TERMOS POR VOC&Ecirc; OU
        TERCEIROS, (D) DO USO DO APLICATIVO/SITE, FERRAMENTAS OU SERVIÇOS
        FORNECIDOS POR N&Oacute;S RELACIONADOS AO NEG&Oacute;CIO (E) DE QUALQUER
        COMUNICAÇ&Atilde;O OU TRANSAÇ&Atilde;O REALIZADA DE FATO OU TENTATIVA
        ENTRE USU&Aacute;RIOS, EM CADA CASO, MESMO SE N&Oacute;S TIVERMOS SIDO
        AVISADOS SOBRE A POSSIBILIDADE DE TAIS DANOS. ESSAS LIMITAÇ&Otilde;ES E
        EXCLUS&Otilde;ES SER&Atilde;O APLICADAS MESMO QUE OS DANOS OCORRAM POR
        (1) VIOLAÇ&Atilde;O DESTE CONTRATO, (2) VIOLAÇ&Atilde;O DE GARANTIA, (3)
        RESPONSABILIDADE OBJETIVA E SUBJETIVA, (4) RESPONSABILIDADE
        EXTRACONTRATUAL, (5) NEGLIG&Ecirc;NCIA, OU (6) QUALQUER OUTRA CAUSA DE
        PEDIR, CONSIDERANDO QUE ESTA EXCLUS&Atilde;O E LIMITAÇ&Otilde;ES
        N&Atilde;O S&Atilde;O PROIBIDAS PELA LEI APLIC&Aacute;VEL.
      </p>

      <p style="text-align: justify;">
        SE VOC&Ecirc; N&Atilde;O EST&Aacute; SATISFEITO COM O APLICATIVO/SITE,
        N&Atilde;O CONCORDA COM QUALQUER PARTE DESTE CONTRATO, OU TEM QUALQUER
        OUTRO LIT&Iacute;GIO OU PEDIDO COM OU CONTRA N&Oacute;S OU OUTRO
        USU&Aacute;RIO DO SITE REFERENTE A ESTES TERMOS OU AO SITE, SUA
        &Uacute;NICA E EXCLUSIVA SOLUÇ&Atilde;O &Eacute; PARAR DE USAR NOSSOS
        AMBIENTES. EM TODOS OS CASOS NOSSA RESPONSABILIDADE COM VOC&Ecirc; OU
        TERCEIROS EM QUALQUER CIRCUNST&Acirc;NCIA DECORRENTE OU EM
        CONEX&Atilde;O QUE SEJA AJUIZADA E ADMITIDA LEGALMENTE COM ESTE,
        &Eacute; LIMITADA A R$ 200,00 (DUZENTOS REAIS) COMO VALOR TOTAL
        J&Aacute; AGREGADO TODOS OS PEDIDOS.
      </p>

      <p style="text-align: justify;">12. Advert&ecirc;ncia</p>

      <p style="text-align: justify;">
        O APLICATIVO/SITE, INCLUINDO TODO SEU CONTE&Uacute;DO, SOFTWARE,
        FUNÇ&Otilde;ES, MATERIAIS E INFORMAÇ&Otilde;ES DISPON&Iacute;VEIS OU
        ACESSADAS &Eacute; FORNECIDA &quot;DE FORMA COMPLETA&quot; POR SEUS
        USU&Aacute;RIOS, CLIENTES E ADVOGADOS. N&Oacute;S N&Atilde;O DECLARAMOS
        OU GARANTIMOS QUALQUER ESP&Eacute;CIE DE CONTE&Uacute;DO OU MATERIAIS,
        INFORMAÇ&Otilde;ES E FUNÇ&Otilde;ES DISPONIBILIZADAS PELO SOFTWARE USADO
        EM OU ACESSADO PELO APLICATIVO/SITE, POR QUAISQUER PRODUTOS OU SERVIÇOS
        OU HIPERTEXT, LINKS A TERCEIROS OU QUALQUER VIOLAÇ&Atilde;O DE SEGURANÇA
        ASSOCIADA COM A TRANSMISS&Atilde;O DE INFORMAÇ&Atilde;O CONFIDENCIAL
        PELO APLICATIVO/SITE OU POR OUTROS SITES RELACIONADOS POR LINKS, MESMO
        SE N&Oacute;S ESTIVERMOS CIENTES DE QUALQUER UMA DESSAS
        VIOLAÇ&Otilde;ES. ADEMAIS, N&Oacute;S N&Atilde;O GARANTIMOS QUE AS
        FUNÇ&Otilde;ES CONTIDAS NESTE APLICATIVO/SITE OU QUAISQUER OUTROS
        MATERIAIS OU CONTE&Uacute;DOS AQUI CONTIDOS SEJAM INITERRUPTOS OU SEM
        ERROS, E LIVRES DEFEITOS, DE V&Iacute;RUS OU OUTROS COMPONENTES DANOSOS.
      </p>

      <p style="text-align: justify;">
        VOC&Ecirc; RECONHECE E CONCORDA QUE QUALQUER TRANSMISS&Atilde;O DE E
        PARA ESTE APLICATIVO/SITE N&Atilde;O &Eacute; CONFIDENCIAL E SUAS
        MENSAGENS PODEM SER LIDAS OU INTERCEPTADAS POR OUTROS. VOC&Ecirc;
        TAMB&Eacute;M RECONHECE E CONCORDA QUE SUBMENTENDO MENSAGENS PARA
        N&Oacute;S E POSTANDO INFORMAÇ&Ocirc;ES NO AMBIENTE, INCLUINDO TODOS OS
        SEUS DADOS, INFORMAÇ&Otilde;ES E CONTE&Uacute;DO, NENHUMA OUTRA
        RELAÇ&Atilde;O &Eacute; CRIADA ENTRE VOC&Ecirc; E N&Oacute;S, SEJA
        N&Atilde;O CONFIDENCIAL, FID&Uacute;CI&Aacute;RIA OU CONTRATUALMENTE
        IMPL&Iacute;CITA, A N&Atilde;O SER AQUELAS QUE EST&Atilde;O DE ACORDO
        COM ESTES TERMOS. VOC&Ecirc; RECONHECE E CONCORDA QUE N&Atilde;O
        IR&Aacute; OU TENTAR&Aacute; NOS FAZER RESPONS&Aacute;VEIS OU FAZER
        TERCEIROS FORNECEDORES RESPONS&Aacute;VEIS PELO CONTE&Uacute;DO
        FORNECIDO POR QUALQUER USU&Aacute;RIO, INCLUINDO, SEM LIMITAÇ&Atilde;O,
        QUALQUER TRADUÇ&Atilde;O RELACIONADA, E VOC&Ecirc; RECONHECE E CONCORDA
        QUE N&Oacute;S N&Atilde;O SOMOS PARTE DE QUALQUER TRANSAÇ&Atilde;O DE
        NEG&Oacute;CIOS PORTANTO N&Atilde;O TEMOS CONTROLE SOBRE
        TRANSAÇ&Otilde;ES ENTRE PARTES E N&Atilde;O GARANTIMOS A SEGURANÇA DAS
        OPERAÇ&Otilde;ES, PRESTAÇ&Atilde;O DE SERVIÇOS, QUALIDADE E VERACIDADE
        OU EXATID&Atilde;O DE QUALQUER AN&Uacute;NCIO OU OUTROS CONTE&Uacute;DOS
        FORNECIDOS NESTE APLICATIVO/SITE.
      </p>

      <p style="text-align: justify;">13. LIT&Iacute;GIO</p>

      <p style="text-align: justify;">
        <br />CASO VOC&Ecirc; ENTRE EM UM LIT&Iacute;GIO COM UM OU MAIS
        USU&Aacute;RIOS DO SITE (INCLUINDO, SEM LIMITAÇ&Atilde;O, QUALQUER
        LIT&Iacute;GIO ENTRE USU&Aacute;RIOS A RESPEITO DE QUALQUER
        NEGOCIAÇ&Atilde;O, TRANSAÇ&Atilde;O OU CONTRIBUIÇ&Atilde;O DE
        CONTE&Uacute;DO POR USU&Aacute;RIO), VOC&Ecirc; CONCORDA EM DESOBRIGAR
        INTEGRALMENTE, DESISTIR E LIBERAR A EMPRESA DA QUAL O APLICATIVO/SITE
        FAZ PARTE, E QUALQUER MEMBRO DO GRUPO, CADA UM DOS RESPECTIVOS AGENTES,
        CONSELHEIROS, DIRETORES, EMPREGADOS, E TODAS AS OUTRAS PESSOAS
        F&Iacute;SICAS OU JUR&Iacute;DICAS RELACIONADAS, DE TODOS E QUAISQUER
        DIREITOS, DEMANDAS, RECLAMAÇ&Otilde;ES, REIVINDICAÇ&Otilde;ES, AÇOES
        JUDICIAIS, PROCESSOS, RESPONSABILIDADES, OBRIGAÇ&Otilde;ES, CUSTAS
        JUDICIAIS, DESPESAS E DESEMBOLSOS DE QUALQUER NATUREZA, SEJAM CONHECIDOS
        OU DESCONHECIDOS, QUE SURJAM AGORA OU NO FUTURO, RELACIONADOS, OU LIGADO
        A TAL LIT&Iacute;GIO E/OU SEU USO DO SITE.
        <br />VOC&Ecirc; CONCORDA EM INDENIZAR, DEFENDER E MANTER O
        APLICATIVO/SITE E QUAISQUER MEMBROS DO GRUPO LIVRES DE QUALQUER
        RESPONSABILIDADE E CUSTAS INCORRIDAS PELAS PARTES INDENIZADAS EM
        RELAÇ&Atilde;O A QUALQUER RECLAMAÇ&Atilde;O RESULTANTE DA
        UTILIZAÇ&Atilde;O DESTE, OU RELATIVOS A NEG&Oacute;CIOS QUE N&Oacute;S
        GERENCIAMOS (INCLUINDO, SEM LIMITAÇ&Atilde;O, QUALQUER
        COMUNICAÇ&Atilde;O DE FATO OU POTENCIAL, TRANSAÇ&Atilde;O OU
        LIT&Iacute;GIO ENTRE VOC&Ecirc; E QUALQUER OUTRO USU&Aacute;RIO OU
        TERCEIROS), QUALQUER CONTE&Uacute;DO PUBLICADO POR VOC&Ecirc; OU OUTROS
        USU&Aacute;RIOS DE SUA CONTA PARA O AMBIENTE, O USO QUALQUER DE QUALQUER
        FERRAMENTA OU SERVIÇO FORNECIDO POR TERCEIRO FORNECEDOR, OU QUALQUER
        VIOLAÇ&Atilde;O POR SUA
      </p>

      <p style="text-align: justify;">
        PARTE DESTES TERMOS OU AS DECLARAÇ&Otilde;ES, GARANTIAS E
        OBRIGAÇ&Otilde;ES ASSUMIDAS POR VOC&Ecirc; NESTES TERMOS, INCLUINDO, SEM
        LIMITAÇ&Atilde;O, HONOR&Aacute;RIOS ADVOCAT&Iacute;CIOS E CUSTAS.
      </p>

      <p style="text-align: justify;">14.LEGISLAÇ&Atilde;O APLICADA</p>

      <p style="text-align: justify;">
        <br />AS PARTES DETERMINAM QUE QUALQUER AÇ&Atilde;O JUDICIAL QUE POSSA
        POR VENTURA OCORRER SER&Aacute; PROPOSTA EXCLUSIVAMENTE NA COMARCA DE
        S&Atilde;O PAULO/SP E SER&Aacute; REGIDA PELAS LEIS BRASILEIRAS.
      </p>

      <p style="text-align: justify;">
        15. Alteraç&otilde;es e Termos e Condiç&otilde;es:
      </p>

      <p style="text-align: justify;">
        <br />N&oacute;s podemos alterar, suspender ou interromper qualquer
        aspecto do Aplicativo/Site, a qualquer momento, incluindo a
        disponibilidade de quaisquer ferramentas, banco de dados ou
        conte&uacute;do. N&oacute;s podemos tamb&eacute;m impor limites a certas
        ferramentas ou serviços ou restringir seu acesso a partes ou &agrave;
        todo o Aplicativo/Site sem aviso ou responsabilidade. Esta vers&atilde;o
        dos Termos entrou em vigor em 01 de Janeiro de 2018. N&oacute;s nos
        reservamos o direito, a nosso crit&eacute;rio, de alterar estes Termos,
        no todo ou em parte, em qualquer momento, com ou sem o seu
        consentimento, e voc&ecirc; reconhece e concorda que o seu consentimento
        para tal alteraç&atilde;o n&atilde;o &eacute; necess&aacute;rio. Aviso
        de qualquer alteraç&atilde;o ser&aacute; publicado no site e ser&aacute;
        eficaz imediatamente. Se voc&ecirc; n&atilde;o concordar com qualquer
        alteraç&atilde;o de cunho n&atilde;o-administrativo e/ou substantivo com
        estes Termos, ent&atilde;o (i) a &uacute;nica soluç&atilde;o &eacute;
        como membro descontinuar seu uso do Site, e (ii) a &uacute;nica
        soluç&atilde;o como advogado &eacute; solicitar a alteraç&atilde;o ou
        cancelamento ao seu uso do Site, e neste caso reaver o valor ainda
        n&atilde;o utilizado, de forma proporcional.
        <br />Os planos de assinatura s&atilde;o determinados no momento da
        assinatura ou renovaç&atilde;o de um advogado, conforme
        aplic&aacute;vel. Este valor est&aacute; sujeito a alteraç&otilde;es sem
        aviso ou aprovaç&atilde;o pr&eacute;via no ato da renovaç&atilde;o
        conforme preço vigente.
        <br />Veja tamb&eacute;m a seç&atilde;o abaixo sobre renovaç&atilde;o
        autom&aacute;tica de assinaturas.
        <br />Seu Arquivo dos Termos: N&oacute;s n&atilde;o arquivamos
        separadamente os Termos celebrados com cada usu&aacute;rio do Site. Por
        favor, faça uma c&oacute;pia dos Termos para seu registro, por
        impress&atilde;o e / ou salvando uma c&oacute;pia dos Termos baixado em
        seu computador pessoal Cumprimento destes Termos: N&oacute;s podemos
        cancelar imediatamente o acesso de qualquer usu&aacute;rio ou a
        utilizaç&atilde;o do site, no caso em que o usu&aacute;rio viole a estes
        Termos ou faça qualquer outro uso n&atilde;o autorizado do Site. Os
        usu&aacute;rios ser&atilde;o notificados sobre o cancelamento. Qualquer
        aç&atilde;o ou omiss&atilde;o por n&oacute;s em resposta a qualquer
        violaç&atilde;o destes Termos n&atilde;o limita nossos direitos com
        relaç&atilde;o a aç&otilde;es que possamos tomar em resposta a qualquer
        outro tipo similar ou diferente da violaç&atilde;o.
      </p>

      <p style="text-align: justify;">
        16. Publicaç&atilde;o do an&uacute;ncio
      </p>

      <p style="text-align: justify;">
        Antes do registro do advogado ser publicado, este dever&aacute;
        assinalar um campo confirmando que todas as informaç&otilde;es ali
        inseridas por este, tais como, telefone, endereço, n&uacute;mero da OAB,
        textos, artigos, fotos e informaç&otilde;es s&atilde;o ver&iacute;dicas,
        com o objetivo de responder civil e criminalmente caso as
        informaç&otilde;es sejam fraudulentas
      </p>

      <p style="text-align: justify;">
        17.Posicionamento nos resultados de busca
      </p>

      <p style="text-align: justify;">
        Os resultados apresentados sempre com base na localizaç&atilde;o,
        avaliaç&atilde;o, plano contratado, e outros fatores que venham a ser
        julgados relevantes para a contrataç&atilde;o do profissional.
      </p>

      <p style="text-align: justify;">
        Seguindo nossos procedimentos de segurança, &eacute; poss&iacute;vel que
        solicitemos, por e-mail, um documento comprobat&oacute;rio de
        identifica&ccedil;&atilde;o.&nbsp;
      </p>

      <table cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td valign="middle">
              <p style="text-align: justify;">
                18. Posicionamentos Espec&iacute;ficos
              </p>

              <p style="text-align: justify;">
                A oiadvogados.com.br n&atilde;o garante nenhum posicionamento
                espec&iacute;fico na ordem de exibiç&atilde;o dos
                an&uacute;ncios nas p&aacute;ginas de busca. A ordem nestas
                p&aacute;ginas &eacute; din&acirc;mica, podendo esses
                crit&eacute;rios ser alterados de tempos em tempos. A
                posiç&atilde;o dos an&uacute;ncios, assim como a sua ordem nas
                p&aacute;ginas, poder&aacute; variar dependendo dos
                crit&eacute;rios de busca utilizados por cada cliente
                espec&iacute;fico.&nbsp;
              </p>
            </td>
          </tr>
          <tr>
            <td valign="middle">
              <p style="text-align: justify;">
                Reservamo-nos o direito de desenvolver e aplicar algoritmos de
                busca, bem como m&eacute;todos para otimiza&ccedil;&atilde;o dos
                resultados encontrados, buscando maior adequa&ccedil;&atilde;o
                dos resultados aos interesses e experi&ecirc;ncias pessoais dos
                usu&aacute;rios. Com o intuito de otimizar a experi&ecirc;ncia
                de busca e reserva para advogados e clientes, nos reservamos o
                direito de executar testes peri&oacute;dicos em seu sistema por
                per&iacute;odos limitados de tempo, podendo alterar a forma como
                os resultados e as camadas dos planos de assinatura que
                s&atilde;o apresentadas . Destaca-se que os resultados das
                p&aacute;ginas de busca, bem como a ordem dos an&uacute;ncios,
                podem ser diferentes em cada uma das plataformas,
                independentemente do plano contratado.&nbsp;
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <p style="text-align: justify;">
        19. Aprovaç&atilde;o de Conte&uacute;do
      </p>

      <p style="text-align: justify;">
        Todos os conte&uacute;dos publicados, por faculdade da
        oiadvogado.com.br, est&atilde;o sujeitos &agrave; revis&atilde;o e
        aprovaç&atilde;o. Reservamo-nos o direito de recusar a publicar qualquer
        conte&uacute;do que n&oacute;s determinemos como prejudicial a imagem da
        plataforma e a nosso exclusivo crit&eacute;rio. No entanto, n&atilde;o
        assumimos qualquer obrigaç&atilde;o de revisar o conte&uacute;do e
        n&atilde;o teremos nenhuma responsabilidade por qualquer perda ou dano
        resultante das infomaç&otilde;es apresentadas por qualquer
        usu&aacute;rio, que s&atilde;o respons&aacute;veis por revisar e
        assegurar que qualquer conte&uacute;do exibido apareça da maneira como
        se pretendeu.
      </p>

      <p style="text-align: justify;">20. Fotografias</p>

      <p style="text-align: justify;">
        Todas as fotografias devem ser enviadas em formato eletr&ocirc;nico
        atrav&eacute;s da ferramenta de upload. N&atilde;o ser&atilde;o aceitas
        fotografias enviadas por outros meios. As fotografias devem retratar o
        advogado em trajes compat&iacute;veis a sua funç&atilde;o Reservamo-nos
        o direito de n&atilde;o exibir ou remover quaisquer fotografias que
        determinarmos, a nosso crit&eacute;rio, n&atilde;o cumprir com esses
        Termos ou que de outra forma sejam inaceit&aacute;veis.
      </p>

      <p style="text-align: justify;">
        Ao enviar uma fotografia, os usu&aacute;rios, clientes e advogados
        declaram e garantem que (a) (i) det&eacute;m todos os direitos de
        propriedade intelectual com relaç&atilde;o a cada fotografia
        apresentada, ou (ii) obteve do detentor do direito autoral todos os
        direitos necess&aacute;rios para que a fotografia seja usada em um
        an&uacute;ncio online, (b) que qualquer pessoa na fotografia permitiu o
        uso de sua imagem a ser exibida em um an&uacute;ncio online, (c) que a
        fotografia representa com precis&atilde;o o objeto da fotografia e que
        n&atilde;o foi alterada ou manipulada em qualquer forma que possa
        induzir em erro o espectador da fotografia, e (d) que vai indenizar e
        livrar o oiadvogado.com.br e qualquer membro deste, de qualquer
        aç&atilde;o judicial decorrentes de declaraç&otilde;es falsas no que diz
        respeito a toda e qualquer forma de fotografias apresentadas.
      </p>

      <p style="text-align: justify;">
        &Eacute; da responsabilidade dos usu&aacute;rios a obtenç&atilde;o de
        permiss&atilde;o de reproduç&atilde;o de todo o material
        fotogr&aacute;fico e outros utilizados em seus perfis. O usu&aacute;rio
        garante que &eacute; o propriet&aacute;rio dos direitos autorais daquela
        fotografia.
      </p>

      <p style="text-align: justify;">
        21. Concess&atilde;o de Direitos Autorais
      </p>

      <p style="text-align: justify;">
        Ao aceitar estes Termos e ao postar seu perfil no Aplicativo/Site,
        voc&ecirc; concede a n&oacute;s e aos nossos afiliados uma licença
        perp&eacute;tua, mundial, irrevog&aacute;vel e irrestrita, n&atilde;o
        exclusiva, livre de royalty, totalmente integralizada, para usar,
        copiar, licenciar, sublicenciar (em v&aacute;rios n&iacute;veis),
        adaptar, distribuir, exibir, executar publicamente, reproduzir,
        transmitir, modificar, editar e de outra forma explorar a c&oacute;pia,
        as fotografias e semelhantes (caso existam) de qualquer conte&uacute;do
        que voc&ecirc; postar no Site ou nos sites dos nossos afiliados.
        Voc&ecirc; tamb&eacute;m nos concede a faculdade dos direitos autorais e
        proteç&atilde;o das imagens, c&oacute;pia e conte&uacute;dos
        dispon&iacute;veis atrav&eacute;s do seu an&uacute;ncio a partir do uso
        n&atilde;o autorizado por terceiros n&atilde;o afiliados, que podem, de
        tempos a tempos, tentar piratear essas informaç&otilde;es atrav&eacute;s
        de meios eletr&ocirc;nicos ou outros. Isso inclui, mas n&atilde;o se
        limita, ao direito de impetrar aç&atilde;o judicial para obter uma
        medida cautelar para proteger esse material. Precisamos desses direitos
        para hospedar e exibir o seu an&uacute;ncio. Voc&ecirc; tamb&eacute;m
        concorda em ajudar- nos - &agrave;s nossas custas e controle - a
        proteger o material protegido por direitos autorais de tal
        redistribuiç&atilde;o n&atilde;o autorizada. N&oacute;s n&atilde;o somos
        respons&aacute;veis por qualquer infraç&atilde;o ou violaç&atilde;o de
        leis resultantes de conte&uacute;do fornecido por qualquer membro e cada
        membro concorda em indenizar e livrar o Site de qualquer aç&atilde;o
        judicial por violaç&atilde;o de direitos autorais ou outros direitos da
        utilizaç&atilde;o desses conte&uacute;dos fornecidos por esse membro.
        Cada membro renuncia a todos os direitos a qualquer reclamaç&atilde;o
        contra n&oacute;s por qualquer infraç&atilde;o alegada ou real de
        direito de propriedade, de quaisquer direitos de propriedade industrial,
        direitos de privacidade e publicidade, direitos morais e direitos de
        atribuiç&atilde;o em relaç&atilde;o a qualquer contribuiç&atilde;o de
        conte&uacute;do por usu&aacute;rio publicado ou fornecido a n&oacute;s
        por qualquer membro.
        <br />Cada usu&aacute;rio concorda que n&oacute;s podemos sublicenciar
        todos os direitos que nos foram concedidos nestes Termos para uma ou
        mais partes e que podemos reproduzir, no todo ou em parte, qualquer
        material fotogr&aacute;fico fornecido pelo referido usu&aacute;rio na
        promoç&atilde;o dos desses usu&aacute;rios ou na promoç&atilde;o do
        Aplicativo/Site.
      </p>

      <p style="text-align: justify;">
        22. Pagamentos
        <br />Pagamentos entre advogados e os clientes: oiadvogado.adv.br
        n&atilde;o &eacute; parte em nenhuma operaç&atilde;o de pagamento entre
        advogado e cliente.
      </p>

      <p style="text-align: justify;">
        Planos de Assinatura: Pagamento do plano de assinatura deve ser feito em
        moeda brasileira Reais, pago por cart&otilde;es de cr&eacute;dito.
      </p>

      <p style="text-align: justify;">RENOVAÇ&Atilde;O AUTOM&Aacute;TICA</p>

      <p style="text-align: justify;">23. Links de hipertexto</p>

      <p style="text-align: justify;">
        Reservamo-nos o direito de recusar links de hipertexto ou endereços de
        outros sites da Internet de p&aacute;ginas dos membros, e remover links
        ou endereços da web, sem aviso, a nosso crit&eacute;rio. Al&eacute;m
        disso, n&oacute;s nos reservamos o direito de cobrar por links de
        hipertexto a qualquer momento.
      </p>

      <p style="text-align: justify;">
        <br />
      </p>

      <p style="text-align: justify;">
        AS ASSINATURAS DO OIADVOGADO.COM.BR, PARA QUALQUER TIPO DE PLANO PAGO
        POR CART&Atilde;O DE CR&Eacute;DITO, SER&Atilde;O RENOVADAS
        AUTOMATICAMENTE AO FINAL DO PRAZO ENT&Atilde;O VIGENTE POR UM
        PER&Iacute;ODO ADICIONAL DE MESMO PRAZO E PELA TARIFA ENT&Atilde;O
        VIGENTE. SE VOC&Ecirc; N&Atilde;O DESABILITAR A RENOVAÇ&Atilde;O
        AUTOM&Aacute;TICA, VOC&Ecirc; REAFIRMA E NOS AUTORIZA A COBRAR SEU
        CART&Atilde;O DE CR&Eacute;DITO AO FINAL DE CADA PRAZO DE ASSINATURA POR
        UM PRAZO ADICIONAL DO MESMO PER&Iacute;ODO, ENT&Atilde;O VIGENTE, E PELA
        TARIFA N&Atilde;O PROMOCIONAL ENT&Atilde;O VIGENTE PARA O MESMO PRODUTO
        OU SERVIÇO. SE VOC&Ecirc; DESEJA EVITAR QUE COBRANÇAS DE TARIFAS DE
        ASSINATURAS PARA DESABILITAR A RENOVAÇ&Atilde;O AUTOM&Aacute;TICA PARA A
        SUA ASSINATURA ANTES QUE A MESMA SEJA RENOVADA. SE VOC&Ecirc; DESEJA
        ALTERAR O SEU CART&Atilde;O DE CR&Eacute;DITO OU ALTERAR A
        RENOVAÇ&Atilde;O POR UM NOVO PER&Iacute;ODO SEJAM FEITAS, VOC&Ecirc;
        DEVER&Aacute; FAZ&Ecirc;-LO ATRAV&Eacute;S DA FERRAMENTA DE
        ALTERA&Ccedil;&Atilde;O DE CART&Atilde;O DE CR&Eacute;DITO.
      </p>

      <p style="text-align: justify;">
        24. Pedidos de Reembolso e/ou Cancelamento
      </p>

      <p style="text-align: justify;">Pedidos de Reembolso:</p>

      <p style="text-align: justify;">
        <br />Se voc&ecirc; contratar ou renovar a sua assinatura ou se sua
        assinatura for renovada automaticamente de acordo com os termos de sua
        assinatura, seu an&uacute;ncio ficar&aacute; online por todo o
        per&iacute;odo de subscriç&atilde;o, sem restituiç&atilde;o.
      </p>

      <p style="text-align: justify;">
        Cancelamento uma Informaç&atilde;o Publicada: Se, a nosso exclusivo
        crit&eacute;rio, qualquer usu&aacute;rio publicar material inadequado em
        nosso site ou em nosso banco de dados, fizer uso indevido do
        aplicativo/site ou do nosso sistema on-line ou violar materialmente
        estes Termos, reservamo-nos o direito de rescindir o plano de assinatura
        deste usu&aacute;rio, imediatamente, e sem restituiç&atilde;o ou, se
        tivermos conhecimento ou recebermos uma den&uacute;ncia ou uma
        s&eacute;rie de queixas apresentadas por qualquer usu&aacute;rio ou
        outro terceiro sobre an&uacute;ncio ou de pr&aacute;ticas que, em nosso
        entender, justifique a imediata remoç&atilde;o do an&uacute;ncio, assim
        o faremos, N&atilde;o assumimos nenhum compromisso de investigar
        reclamaç&otilde;es.
      </p>
    </div>
  </Wrapper>
);

export default container(NotFound);
