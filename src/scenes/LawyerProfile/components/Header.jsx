import { h } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import { Tab, Tabs } from '../../../toolbox/components';
import v from '../../../variables';

const defaultPhoto = 'https://s3.amazonaws.com/oiadvogados/user-profile.png';

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
    <Box onClick={() => history.back()}>
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

const NewBadge = styled.span`
  margin-top: -7px;
  font-size: 11px;
  background-color: #5760ef;
  color: white;
  padding: 3px;
  font-weight: 600;
`;

/**
|--------------------------------------------------
| Boxes
|--------------------------------------------------
*/

const InfoBox = styled(Box)`
  font-size: 11px;
  text-align: ${p => p.right ? 'right' : 'left'};
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
    {/* <If condition={starsNumber == 0}>
      <Flex align="center" justify="center">
        <NewBadge>NOVO</NewBadge>
      </Flex>
    </If> */}
    <Flex>

    </Flex>
    <Flex justify="center">
      <InfoBox >
        {`${oab.number}/${oab.state} `}
        {/* {'  '}
        <Stars number={parseInt(starsNumber)} />
        {starsNumber.toFixed(1)} */}
      </InfoBox>
    </Flex>
    <Flex align="center" justify="space-around" style={{ fontSize: 13, width: '100%', marginTop: 10 }} >
      <Flex align="center">
        <i class="material-icons" style={{fontSize: 15}} >location_on</i>
        {address}
      </Flex>
    </Flex>
  </div>
)


/**
|--------------------------------------------------
| Header
|--------------------------------------------------
*/

const calcStars = (reviews = []) => {
  var sum = reviews.reduce(function (a, b) { return a + b.rate; }, 0);
  var avg = sum / reviews.length;
  return avg || 0;
};

const Header = ({ name, photo, oab, stars, address, lawyerProfile}) => (
  <div>
    <Avatar src={photo || defaultPhoto} />
    <Nav />
    
    <Title>{name}</Title>
    <Infos oab={oab} starsNumber={calcStars(lawyerProfile.reviews)} address={address}/>
  </div>
);

export default Header;