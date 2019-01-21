import { h, Component } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import get from 'lodash/get';
import { Flex, Box } from 'reflexbox';
import ReactGA from 'react-ga';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Dialog } from '../../../toolbox/components';
import Terms from '../../Terms';
import Form from './Form';

/**
 |--------------------------------------------------
 | HeaderWrapper
 |--------------------------------------------------
 */

const HeaderWrapper = styled.div`
  position: relative;
  background-color: #5C6BC0;
  min-height: 200px;
`;

/**
 |--------------------------------------------------
 | CloseButton
 |--------------------------------------------------
 */

const CloseButton = styled.i`
  position: absolute;
  color: #fff;
  padding: 15px;
  font-size: 28px!important;
  top: 0;
  left: 0;
`;

/**
 |--------------------------------------------------
 | Title
 |--------------------------------------------------
 */

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 22px;
  padding: 20px 20px;
  margin: 0;
  font-weight: 500;
`;

/**
 |--------------------------------------------------
 | Inputs
 |--------------------------------------------------
 */

const Input = styled.input`
  background-color: white;
  border-radius: 2px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
`;

/**
 |--------------------------------------------------
 | Block
 |--------------------------------------------------
 */

const Block = styled.div`
  padding: 0 20px;
`;

/**
 |--------------------------------------------------
 | SignUpButon
 |--------------------------------------------------
 */

const SignUpButon = styled.button`
  background: none;
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 10px;
  width: 100%;
  color: #fff;
  outline: none;
  margin-bottom: 10px;

  &:active {
    background-color: white;
    color: #5C6BC0;
  }
`;

/**
 |--------------------------------------------------
 | FacebookLoginButton
 |--------------------------------------------------
 */

const FacebookLoginButton = styled.button`
  border-radius: 2px;
  padding: 10px;
  width: 100%;
  color: #fff;
  outline: none;

  background: #3b5998;
  border: none;
  margin-bottom: 20px;
  box-shadow: 0px 0px 4px 0px #0000003b;
  display: flex;
  justify-content: space-around;
`;

/**
 |--------------------------------------------------
 | Header
 |--------------------------------------------------
 */
class Header extends Component {
    state = {
      active: false,
      callback: null,
    }

    handleToggle = (callback) => {
      this.setState({ active: !this.state.active, callback });
    }

    render({
      register, formData, submitting, authenticate,
    }) {
      return (
        <HeaderWrapper>
          <CloseButton className="material-icons" onClick={() => route('/home')}>close</CloseButton>
          <Block>
            <Title>Informe seus dados para começar seu cadastro</Title>
            <div style={{ maxWidth: 500, margin: 'auto' }}>
              <Form />
              <SignUpButon onClick={() => {
                ReactGA.event({ category: 'Navigation', action: 'Cadastrar' });
                this.handleToggle(() => {
                  console.log('callback 1');
                  window.tempEmail = get(formData, 'email', '').toLowerCase();
                  window.tempPassword = get(formData, 'password', '');
                  register(formData,
                    {
                      passwordConfirm: {
                        required: { message: 'A confirmação de senha é obrigatória' },
                        equals: { message: 'A senhas não coincidem', field: 'password' },
                      },
                      password: { required: { message: 'A senha é obrigatória!' } },
                      email: { required: { message: 'O campo email é obrigatório!' }, email: { message: 'Informe um email válido!' } },
                      name: { required: { message: 'O campo nome é obrigatório!' } },
                    });
                });
              }}
              >
                Cadastrar
              </SignUpButon>
              <Choose>
                <When condition={window.cordova}>
                  <FacebookLoginButton
                    onClick={() => {
                      ReactGA.event({ category: 'Navigation', action: 'Cadastrar_Facebook' });
                      this.handleToggle(() => {
                        console.log('callback 2');
                        if (window.cordova) {
                          facebookConnectPlugin.login(['public_profile', 'email'],
                            (result) => {
                              console.log(result);
                              authenticate({
                                strategy: 'facebook-token',
                                access_token: result.authResponse.accessToken,
                              });
                              console.log('entrou no ', result.authResponse.accessToken);
                            }, console.log);
                        } else {
                          window.location.replace('https://mysterious-oasis-88871.herokuapp.com/auth/facebook');
                        }
                      });
                    }}
                  >
                    <Flex align="center">
                      <img width="20" height="20" style={{ marginRight: 10 }} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNjAuNzM0IDYwLjczMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjAuNzM0IDYwLjczMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik01Ny4zNzgsMC4wMDFIMy4zNTJDMS41MDIsMC4wMDEsMCwxLjUsMCwzLjM1M3Y1NC4wMjZjMCwxLjg1MywxLjUwMiwzLjM1NCwzLjM1MiwzLjM1NGgyOS4wODZWMzcuMjE0aC03LjkxNHYtOS4xNjdoNy45MTQgICB2LTYuNzZjMC03Ljg0Myw0Ljc4OS0xMi4xMTYsMTEuNzg3LTEyLjExNmMzLjM1NSwwLDYuMjMyLDAuMjUxLDcuMDcxLDAuMzZ2OC4xOThsLTQuODU0LDAuMDAyYy0zLjgwNSwwLTQuNTM5LDEuODA5LTQuNTM5LDQuNDYyICAgdjUuODUxaDkuMDc4bC0xLjE4Nyw5LjE2NmgtNy44OTJ2MjMuNTJoMTUuNDc1YzEuODUyLDAsMy4zNTUtMS41MDMsMy4zNTUtMy4zNTFWMy4zNTFDNjAuNzMxLDEuNSw1OS4yMywwLjAwMSw1Ny4zNzgsMC4wMDF6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                      Cadastrar pelo Facebook
                    </Flex>
                  </FacebookLoginButton>
                </When>
                <Otherwise>
                  <FacebookLogin
                    style={{
                      width: '100%',
                      display: 'grid',
                      border: '1px solid #fff',
                    }}
                    appId="293374761096403"
                    autoLoad={false}
                    fields="name,email,picture"
                    textButton="login com facebook"
                    onClick={result => {
                      if (result.accessToken) {
                        authenticate({
                          strategy: 'facebook-token',
                          access_token: result.accessToken,
                        });
                      }
                    }}
                    callback={result => {
                      authenticate({
                        strategy: 'facebook-token',
                        access_token: result.accessToken,
                      });
                    }}
                    isMobile
                    disableMobileRedirect
                    render={renderProps => (
                      <FacebookLoginButton onClick={renderProps.onClick}>
                        <Flex align="center">
                            <img width="20" height="20" style={{ marginRight: 10 }} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNjAuNzM0IDYwLjczMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjAuNzM0IDYwLjczMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik01Ny4zNzgsMC4wMDFIMy4zNTJDMS41MDIsMC4wMDEsMCwxLjUsMCwzLjM1M3Y1NC4wMjZjMCwxLjg1MywxLjUwMiwzLjM1NCwzLjM1MiwzLjM1NGgyOS4wODZWMzcuMjE0aC03LjkxNHYtOS4xNjdoNy45MTQgICB2LTYuNzZjMC03Ljg0Myw0Ljc4OS0xMi4xMTYsMTEuNzg3LTEyLjExNmMzLjM1NSwwLDYuMjMyLDAuMjUxLDcuMDcxLDAuMzZ2OC4xOThsLTQuODU0LDAuMDAyYy0zLjgwNSwwLTQuNTM5LDEuODA5LTQuNTM5LDQuNDYyICAgdjUuODUxaDkuMDc4bC0xLjE4Nyw5LjE2NmgtNy44OTJ2MjMuNTJoMTUuNDc1YzEuODUyLDAsMy4zNTUtMS41MDMsMy4zNTUtMy4zNTFWMy4zNTFDNjAuNzMxLDEuNSw1OS4yMywwLjAwMSw1Ny4zNzgsMC4wMDF6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                            Login pelo Facebook
                          </Flex>
                      </FacebookLoginButton>
                    )}
                  />
                </Otherwise>
              </Choose>


            </div>

            <Dialog
              active={this.state.active}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              title="Termos de Uso"
              actions={[
                { label: 'Cancelar', onClick: this.handleToggle },
                {
                  label: 'Aceitar e Cadastrar',
                  onClick: () => {
                    this.state.callback();
                    this.handleToggle();
                  },
                },
              ]}
            >
              <Terms />
            </Dialog>

            <br />
          </Block>
        </HeaderWrapper>
      );
    }
}

export default Header;