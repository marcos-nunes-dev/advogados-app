import { h } from 'preact';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import styled from 'styled-components';
import v from '../../../variables';
import { Edit, AddIcon } from '../../../components/icons/icons';

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
  margin-bottom: 20px;
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
         {icon}
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

const About = ({ profile, getLawArea, patchDegree}) => (
  <Container>
    <LabelEditor label="Descrição:" icon={<Edit with={20} height={20} />} onEditClick={() => route('/editinfos')}/>
    <Description>{profile.description || 'Sem descrição'}</Description>

    <LabelEditor label="Áreas de Atuação:" icon={<Edit with={20} height={20} />} onEditClick={() => route('/editareas')} />
    <List>
      <If condition={profile.areas.length}>
        <ListItem
          text={profile.areas.map(area =>
            `${getLawArea(area).name}, `
          )}
        />
      </If>
      <If condition={!profile.areas.length}>
        <ListItem text="Escolha suas áreas" />
      </If>
    </List>

    <LabelEditor label="Formação" icon={<AddIcon with={20} height={20} />} onEditClick={() => route('/newqualification')} />
    <List>
      {profile.graduate.map(item =>
        <ListItem
          label={`${item.endYear}, ${item.institution}`}
          text={`${item.formationType} em ${item.area}`}
          style={{marginBottom: 15}}
          onEditClick={() =>
            patchDegree(profile._id, {
              $pull: {
                graduate: {
                  _id: item._id
                }
              }
            })
          }
        />
      )}
      <If condition={!profile.graduate.length}>
        <ListItem text="Adicione uma formação" />
      </If>
    </List>

  </Container>
);

export default About;