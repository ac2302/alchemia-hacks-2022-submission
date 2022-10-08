import React from 'react';
// import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from "@mantine/core";
import SignUp from '../Sign Up/SignUp';
const cardWidth = 420;
const borderRadius = 8;
const transition = 'all 0.45s ease';


const Screenshot = styled.figure`
  z-index: 200;
  position: relative;
  margin-top:-1px;
  margin-left:-6px ;
  margin-right:0px ;
  padding:0px ;
  width: ${cardWidth}px;
  height: 296px;
  background: url(${(props) => props.image}) 0 0 no-repeat;
  background-size: cover;
  border-radius: ${borderRadius}px 0 0 ${borderRadius}px;
  overflow: hidden;
  backface-visibility: hidden;
  transition: ${transition};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    transition: ${transition};
  }
`;

const Content = styled.div`
  z-index: 200;
  width: 60vw;
  
  padding: 28px 20px 30px;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: 1.25em;
  font-weight: 500;
  transition: ${transition};
`;

const Description = styled.span`
  display: block;
  font-size: 0.875em;
  color: #999999;
  transition: ${transition};
  transition-delay: 0.04s;
`;

const BottomBar = styled.span`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 37.3vw;
  height: 10px;
  background: ${(props) => props.background && props.background};
  border-radius: 0 0 ${borderRadius}px 0;
  transition: ${transition};
`;

const Style = styled.button`
  position: relative;
  display:flex;
  flex-direction:row;
  flex-shrink: 0;
  text-align: left;
  background: #ffffff;
  border-radius: ${borderRadius}px;
  border:none ;
  cursor: pointer;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.12), 0 20px 20px -10px rgba(0, 0, 0, 0.125);
  transition: ${transition};
  width: 50vw;
  height:31.5vh ;
  margin-top: 20px ;
  max-height: 300px ;
  &:hover {
    transform: scale(1.04);
    ${Title},
    ${Description},
    ${BottomBar} {
      transform: scale(0.92);
    }
    ${Title} {
      font-size:20px ;
      transform: translateY(-10px);
    }
    ${Description} {
      transform: translateY(-12px);
    }
    ${BottomBar} {
      border-radius: ${borderRadius - 2}px;
      transform: translateY(-14px) scale(0.9);
    }
    ${Screenshot} {
      transform: translateY(4px) scale(0.92);
      border-radius: ${borderRadius - 2}px;
      &::before {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

const CardContainer = styled.div`
  display:flex;
  justify-content:center;
  width: 100%;
  padding:8px 100px;
`

export function ModelCard ({ hexa, title, description, image,stack,position}) { 
  const navigate = useNavigate();
  return(
  <CardContainer style={{justifyContent:`${position}`}}>
  <Style>
    <Screenshot image={image} />
    <Content>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <BottomBar background={hexa} />
      <Button onClick={()=>navigate("/3D")} radius='xl' sx={{position: 'absolute',left: 400,top: 230}}>Buy</Button>
    </Content>
  </Style>
  </CardContainer>
  )
}
export function ShaderCard ({ hexa, title, description, image,stack,position}) { 
  const navigate = useNavigate();
  return(
  <CardContainer style={{justifyContent:`${position}`}}>
  <Style>
    <Screenshot image={image} />
    <Content>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <BottomBar background={hexa} />
      <Button onClick={()=>navigate("/sh")} radius='xl' sx={{position: 'absolute',left: 400,top: 230}}>Buy</Button>
    </Content>
  </Style>
  </CardContainer>
  )
}



function StackIcons(props) {
  const array = props.data;
  console.log(array)
  const icons = array.map((item) => {
    return (
      <Icon key={item} >
        <span className={item}>
          <span />
        </span>
      </Icon>
    );
  });
  return <div>{icons} </div>;
}

const Icon = styled.div`
  font-size: .9rem;
  display: inline-flex;
  background: #D8D8D8;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 15px;
  span {
    border-radius: 5px;
    padding: 3px 5px;
  };
`