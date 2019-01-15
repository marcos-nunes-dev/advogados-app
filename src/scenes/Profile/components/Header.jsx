import { h, Component } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import { Tab, Tabs } from '../../../toolbox/components';
import v from '../../../variables';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FontIcon from 'react-toolbox/lib/font_icon';
import { Edit } from '../../../components/icons/icons';

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
  <NavWrapper justify="space-between" align="center" >
    <Box onClick={() => route('/home')}>
      <i class="material-icons">arrow_back</i>
    </Box>
    <Box></Box>
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
  width: 100%;
  font-size: 11px;
  text-align: center;
  padding: 5px;
`;

/**
|--------------------------------------------------
| Stars
|--------------------------------------------------
*/

const Stars = ({ number }) => (
  <div style={{display: 'inline-block'}} >
    {[1, 2, 3, 4, 5].map(star =>
      <Choose>
        <When condition={number >= star}>
          <i class="material-icons" style={{ fontSize: 12, color: '#FFC107' }} >star</i>
        </When>
        <When condition={number < star}>
          <i class="material-icons" style={{ fontSize: 12, color: '#FFC107' }} >star_border</i>
        </When>
      </Choose>
    )}
  </div>
)

/**
|--------------------------------------------------
| Infos
|--------------------------------------------------
*/

const Infos = ({oab, starsNumber, address}) => (
  <div>
    <Flex flex align="center">
      <InfoBox >{`${oab.number}/${oab.state}`}</InfoBox>
      {/* <InfoBox flex align="center">
        <Stars number={starsNumber} />
          {starsNumber}
      </InfoBox> */}
    </Flex>
    <Flex align="center" justify="space-around" style={{ fontSize: 13, width: '100%', marginTop: 10 }} >
      <Flex align="center">
        <i class="material-icons" style={{fontSize: 15}} >location_on</i>
        {address}
      </Flex>
    </Flex>
  </div>
)

const calcStars = (reviews = []) => {
  var sum = reviews.reduce(function (a, b) { return a + b.rate; }, 0);
  var avg = sum / reviews.length;
  return avg || 0;
};



/**
|--------------------------------------------------
| Header
|--------------------------------------------------
*/

class Header extends Component { 

  state = {
		files: [],
		active: false
	};

	onDrop(files) {
		
		let formData = new FormData();
		formData.append('uri', files[0]);
			
		axios({
			method: 'post',
			url: 'https://mysterious-oasis-88871.herokuapp.com/common/upload',
			data: formData
		})
		.then(response => {
      this.props.editUser(this.props.userId, { photo: response.data.uri });
			this.setState({
				files: files,
			});
			this.handleToggle();	
				
		})
		.catch(error => {
				console.log(error);
		});

	}
	
	handleToggle = () => {
		this.setState({active: !this.state.active});
	}

  render({ name, photo, oab, stars, address, editLawyer, id, lawyerProfile }) {	
		let dropzoneRef;
		const { files } = this.state
		return (
      <div>
        <Dropzone ref={(node) => { dropzoneRef = node; }} style={{border: "none"}} disableClick={true} multiple={false} onDrop={(accepted, rejected) => { this.onDrop(accepted) }}>
          { (this.state.file = [] && photo ) ? <Avatar src={photo} onClick={() => { dropzoneRef.open() }}/> : ""}
          { (this.state.file = [] && !photo ) ? <Avatar src={"https://ui-avatars.com/api/?name="+name+"?background=ffffff&color=5a69c6"} onClick={() => { dropzoneRef.open() }}/> : ""}
          {files.map((file, idx) => { 
            return (
							<Avatar src={file.preview} onClick={() => { dropzoneRef.open() }}/>
            )
          })}
        </Dropzone>
        <Nav />
        
        <Title>{name} <Edit with={20} height={20} onClick={() => route('/editinfos')}/></Title>
          
    
        <Infos oab={oab} starsNumber={calcStars(lawyerProfile.reviews)} address={address}/>
      </div>
    );
  }
  
}

export default Header;