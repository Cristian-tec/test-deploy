import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import BurgerLogo from "./BurgerLogo.png";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import CartList from "../CartList/CartList";
import {
  Button,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

import SignInSide from '../Login/Login'
import { useAuth0 } from '@auth0/auth0-react';

export default function NavBar(props) {
  const userN = useSelector((state) => state.user);
  //console.log(userN, '*');

  const getUserData = () => {
    if (userN.email) {
      //console.log('entrando...');
      return (
        <>
          <button onClick={() => logout()} className="button-login"><b>LOG OUT</b></button>
          <label className="name-login">
            <b>{userN.name}</b>
          </label>
          &nbsp;&nbsp;
          <div className="image-login"><img src={userN.picture} alt="image-logo" /> </div>
          
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">
            <button colorScheme={'red'} className="button-login"><b>LOG IN</b></button>
          </Link>
        </>
      );
    }
  };

  useEffect(() => { }, [userN]);

  const { loginWithRedirect, user, isAuthenticated, logout, isLoading } = useAuth0();

  return (
    <div>
      <div className="nav-container">
        <Link to="/">
          <img src={BurgerLogo} alt="." />
        </Link>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/Selectmenu">MENU</Link>
          </li>
          <li>
            <Link to="/news">NEWS</Link>
          </li>
          <li>
            <Link to="/about">ABOUT US</Link>
          </li>
          <li>
            <Link to="/favs">FAVORITES</Link>
          </li>
          <li>
            <Link to="/locations">LOCATIONS</Link>
          </li>
        </ul>
        <Box>
          <Popover isLazy trigger="hover">
            <PopoverTrigger>
              <Button>
                <Link to="/Cart">
                  <BsCart2 color="black" />
                </Link>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Cart</PopoverHeader>
              <PopoverBody>
                <CartList />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        &nbsp;&nbsp;&nbsp;
        {/* <Link to="/login">
          <Button colorScheme={'red'} className="button-login"><Text textDecoration={'none'}>LOG IN</Text></Button>
        </Link> */}

        {/*   <Link to="/login">
          <Button colorScheme={'red'} className="button-login"><Text textDecoration={'none'}>LOG IN</Text></Button>
        </Link> */}
        {getUserData()}
        &nbsp;&nbsp;&nbsp;
        {/* <Button onClick={() => logout()} colorScheme={'red'} className="button-login"><Text textDecoration={'none'}>LOG OUT</Text></Button> */}
      </div>
    </div>
  );
}
