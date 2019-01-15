import { h, Component } from 'preact';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import styled from 'styled-components';
import v from '../../../variables';

/**
|--------------------------------------------------
| Container
|--------------------------------------------------
*/

const Container = styled.div`
  padding: 10px;
`;

/**
|--------------------------------------------------
| Description
|--------------------------------------------------
*/

const Description = styled.div`
  font-weight: bold;
  font-size: 12;
`;

/**
|--------------------------------------------------
| List
|--------------------------------------------------
*/
const List = styled.div`

`;

const ListItemTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: ${v.mc.grey._700};
`;

const ListItemText = styled.div`
  margin-top: 2px;
  color: ${v.mc.grey._700};
`;

const ListItemWrapper = styled.div`
  /* margin-top: 15px; */
`;

const ListItemCaption = styled.div`

`;

const ListItem = ({label, text, onEditClick, ...props}) => (
  <Flex justify="space-between" >
    <Box>
      <ListItemWrapper {...props}>
        <ListItemTitle>{label}</ListItemTitle>
        <ListItemText>{text}</ListItemText>
      </ListItemWrapper>
    </Box>
    <If condition={onEditClick}>
      <Box onClick={onEditClick}>
        <i className="material-icons">delete</i>
      </Box>
    </If>
  </Flex>
);

/**
|--------------------------------------------------
| LabelEditor
|--------------------------------------------------
*/

const LabelEditorWrapper = styled.div`
  margin-top: 20px;
`;

const LabelEditorTitle = styled.h4`
  margin: 0px;
  font-size: 12px;
  font-weight: 400;
  color: #b1b1b1;
  text-transform: uppercase;
`;

const LabelEditor = ({label, onEditClick, icon}) => (
  <LabelEditorWrapper>
    <Flex justify="space-between" align="center">
      <Box>
        <LabelEditorTitle>{label}</LabelEditorTitle>
      </Box>
      <If condition={onEditClick}>
        <Box onClick={onEditClick}>
          <i className="material-icons">{icon || 'edit'}</i>
        </Box>
      </If>
    </Flex>
    
  </LabelEditorWrapper>
)

/**
|--------------------------------------------------
| About
|--------------------------------------------------
*/

class About extends Component {

  state = {
    show: false
  }

  
  componentDidMount() {
    setTimeout(() => {
      this.setState({show: true})
    }, 100);
  }
  

  render() {
    const { profile, getLawArea, patchDegree } = this.props;
    return (
      <Container>
        <If condition={this.state.show}>
          <If condition={profile.description}>
            <LabelEditor label="Descrição:" />
            <Description>{profile.description}</Description>
          </If>

          <LabelEditor label="Áreas de Atuação:" />
          <List>
            <If condition={profile.areas.length}>
              <ListItem
                text={profile.areas.map(area =>
                  `${getLawArea(area._id || area).name}, `
                )}
              />
            </If>
          </List>

          <If condition={profile.graduate.length}>
            <LabelEditor label="Formação" icon="add" />
            <List>
              {profile.graduate.map(item =>
                <ListItem
                  label={`${item.endYear}, ${item.institution}`}
                  text={`${item.formationType} em ${item.area}`}
                  style={{ marginBottom: 15 }}
                />
              )}

            </List>
          </If>
        </If>

      </Container>
    );
  }
}

export default About;