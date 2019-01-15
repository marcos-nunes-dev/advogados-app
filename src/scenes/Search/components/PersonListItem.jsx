import styled from 'styled-components';
import { Link } from 'preact-router/match';
import { Flex, Box } from 'reflexbox';
import v from '../../../variables'

const ItemWrapper = styled.div`
  padding:5px;
  margin-bottom: 5px;
  background-color: #fff;
  font-size: 11px;
  cursor: pointer;
`;

/**
|--------------------------------------------------
| Item
|--------------------------------------------------
*/

const Item = styled(Link)`
  display: flex;
  position: relative;
  color: inherit;
  text-decoration: none;
  background-color: #fff;

  &:last-child {
    &:before {
      display: none;
    }  
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 1px;
    background-color: #EEEEEE;
  }

`;

/**
|--------------------------------------------------
| Name
|--------------------------------------------------
*/

const Name = styled.h1`
  font-size: 15px;
  padding: 0;
  margin: 0;
  color: ${v.mc.indigo._400};
`;

/**
|--------------------------------------------------
| OAB
|--------------------------------------------------
*/

const OAB = styled.h1`
  font-size: 10px;
  padding: 0;
  margin: 0;
  color: ${v.mc.grey._800};
  font-weight: 200;
`;

/**
|--------------------------------------------------
| Description
|--------------------------------------------------
*/

const Description = styled.div`
  font-size: 12px;
  color: #bdbdbd;
  padding: 0;
  padding-top: 5px;
  margin: 0;
`;

/**
|--------------------------------------------------
| Description
|--------------------------------------------------
*/

const Price = styled.div`
  font-size: 12px;
  color: #bdbdbd;
  padding: 0;
  padding-top: 5px;
  margin: 0;
  color: #4CAF50;
  font-weight: bold;
`;

/**
|--------------------------------------------------
| Infos
|--------------------------------------------------
*/

const Infos = styled.div`
  display: inline-block;
  padding: 5px;
`;

/**
|--------------------------------------------------
| Thumbnail
|--------------------------------------------------
*/

const Thumbnail = styled.div`
  display: inline-block;
  padding: 5px;
`;

/**
|--------------------------------------------------
| Image
|--------------------------------------------------
*/

const Image = styled.div`
  background-color: #f5f5f5;
  background-image: url(${p => p.path});
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

/**
|--------------------------------------------------
| After
|--------------------------------------------------
*/

const After = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  margin-left: auto;
`;

/**
|--------------------------------------------------
| Footer
|--------------------------------------------------
*/

const Footer = styled.div`
  padding-top: 5px;
`;

/**
|--------------------------------------------------
| FooterItem
|--------------------------------------------------
*/

const FooterItem = styled(Box)`
  margin: 0 2px;
  color: ${v.mc.grey._600};
  margin-left: 10px;
`;

/**
|--------------------------------------------------
| Stars
|--------------------------------------------------
*/

const Stars = ({number}) => (
  <div>
    {[1,2,3,4,5].map(star =>
      <Choose>
        <When condition={number >= star}>
          <i class="material-icons" style={{fontSize: 12, color: '#FFC107'}} >star</i>
        </When>
        <When condition={number < star}>
          <i class="material-icons" style={{fontSize: 12, color: '#FFC107'}} >star_border</i>
        </When>
      </Choose>
    )}
  </div>
)

/**
|--------------------------------------------------
| MenuListItem
|--------------------------------------------------
*/

const I = ({name}) => (
  <i class="material-icons" style={{fontSize: 12, marginRight: 2}} >{name}</i>
)

const MenuListItem = ({ image, title, description, price, stars, distance, articles, videos, reviews, oab, ...props}) => (
  <ItemWrapper>
    <Item {...props} >
      <Thumbnail>
        <Image path={image} />
      </Thumbnail>
      <Infos>
        <OAB>OAB {`${oab.number}/${oab.state}`}</OAB>
        <Name> {title} </Name>
        <Description> {description} </Description>
        <Price> {price} </Price>
      </Infos>
    </Item>
    <Footer>
      <Flex >
        {/* <Box>
          <Stars number={stars} />
        </Box>
        <FooterItem> {reviews} avaliações </FooterItem> */}
        <FooterItem flex align="center">
          <I name="book" />
          {articles} artigos
        </FooterItem>
        <FooterItem flex align="center">
          <I name="video_library"/>
          {videos} vídeos
        </FooterItem>
        <If condition={distance}>
          <FooterItem flex align="center">
            <I name="location_on"/>
            {distance}
          </FooterItem>
        </If>
      </Flex>
    </Footer>
  </ItemWrapper>
);

export default MenuListItem;
