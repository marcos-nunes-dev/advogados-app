import { h, Component } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FontIcon from 'react-toolbox/lib/font_icon';
import v from '../../../variables';
import { Tab, Tabs } from '../../../toolbox/components';

/**
|--------------------------------------------------
| NavWrapper
|--------------------------------------------------
*/

const NavWrapper = styled(Flex)`
  width: 100%;
  height: 55px;
  background: ${v.mc.indigo._400};
  background: linear-gradient(to right, rgba(83,108,254,1) 0%, rgba(103,58,183,1) 100%);
  box-shadow: inset 0px -5px 6px -6px black;
  padding: 0px 10px;
  color: #fff;
`;

/**
|--------------------------------------------------
| Nav
|--------------------------------------------------
*/

const Nav = () => (
  <NavWrapper justify="space-between" align="center">
    <Box onClick={() => route('/home')}>
      <i className="material-icons">arrow_back</i>
    </Box>
    <Box />
  </NavWrapper>
);

/**
|--------------------------------------------------
| Avatar
|--------------------------------------------------
*/

const Avatar = styled.img`
  width: 83px;
  height: 83px;
  border-radius: 100%;
  position: absolute;
  left: 50%;
  margin-left: -39px;
  top: 10px;
  border: 2px solid #fff;
  background-color: #fff;
  box-shadow: 0px 0px 7px 0px rgba(0,0,0,.4);
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.h1`
  width: 100%;
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
  color: ${v.mc.indigo._400};
`;

/**
|--------------------------------------------------
| Boxes
|--------------------------------------------------
*/

const InfoBox = styled(Box)`
  width: 50%;
  font-size: 11px;
  text-align: ${p => (p.right ? 'right' : 'left')};
  padding: 5px;
`;

/**
|--------------------------------------------------
| Stars
|--------------------------------------------------
*/

const Stars = ({ number }) => (
  <div style={{ display: 'inline-block' }}>
    {[1, 2, 3, 4, 5].map(star => (
      <Choose>
        <When condition={number >= star}>
          <i className="material-icons" style={{ fontSize: 12, color: '#FFC107' }}>star</i>
        </When>
        <When condition={number < star}>
          <i className="material-icons" style={{ fontSize: 12, color: '#FFC107' }}>star_border</i>
        </When>
      </Choose>
    ))}
  </div>
);

/**
|--------------------------------------------------
| Infos
|--------------------------------------------------
*/

const Infos = ({ oab, starsNumber, address }) => (
  <div>
    <Flex>
      <InfoBox right />
    </Flex>

  </div>
);


/**
|--------------------------------------------------
| Header
|--------------------------------------------------
*/

class Header extends Component {
  state = {
    files: [],
    active: false,
  };

  onDrop(files) {
    const formData = new FormData();
    formData.append('uri', files[0]);

    axios({
      method: 'post',
      url: 'https://mysterious-oasis-88871.herokuapp.com/common/upload',
      data: formData,
    })
      .then(response => {
        this.props.editUser(this.props.id, { photo: response.data.uri });
        this.setState({
          files,
        });
        this.handleToggle();
      })
      .catch(error => {
        console.log(error);
      });
  }

	handleToggle = () => {
	  this.setState({ active: !this.state.active });
	}

	render({
	  name, photo, oab, stars, address, editUser, id,
	}) {
	  let dropzoneRef;
	  const { files } = this.state;
	  return (
  <div>
    <Dropzone ref={(node) => { dropzoneRef = node; }} style={{ border: 'none' }} disableClick accept="image/*" multiple={false} onDrop={(accepted, rejected) => { this.onDrop(accepted); }}>
      { (this.state.file = [] && photo) ? <Avatar src={photo} onClick={() => { dropzoneRef.open(); }} /> : ''}
      { (this.state.file = [] && !photo) ? <Avatar src={`https://ui-avatars.com/api/?name=${name}?background=ffffff&color=5a69c6`} onClick={() => { dropzoneRef.open(); }} /> : ''}
      {files.map((file, idx) => (
        <Avatar src={file.preview} onClick={() => { dropzoneRef.open(); }} />
      ))}
    </Dropzone>
    <Nav />

    <Title>
      {name}
      {' '}
      <FontIcon onClick={() => route('/editinfos')} value="edit" />
    </Title>

  </div>
	  );
	}
}

export default Header;
