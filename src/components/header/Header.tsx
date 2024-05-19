import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login.svg';
import logo from '../../assets/images/logo.svg';
import Profile from '../../assets/svg/profile.svg';
import BasicMenu from '../menu/Menu.tsx';
import style from './header.module.scss';
import { listLinks } from './listLink';
import {useAuth} from "../../hooks/useAuth.ts";

const productGroup = [
  'Комнатные растения',
  'Флорариумы',
  'Сухоцветы',
  'Кашпо и горшки',
];

const eventsMenu: ('Войти' | 'Зарегистрироваться' | 'Выйти')[] = ['Войти', 'Зарегистрироваться', 'Выйти'];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const menuEvent = (event: string) => {
    switch (event) {
      case 'Войти':
        navigate('/login');
        break;
      case 'Зарегистриваться':
        navigate('/registration');
        break;
      case 'Выйти':
        logout();
        navigate('/login');
        break;
    }
  };

  return (
    <div className="container">
      <div className={style.header}>
        <img src={logo} />
        <div className={style.header__container}>
          <div className={style.header__menu}>
            <nav className={style.navbar} data-testid="navbar">
              {listLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.to}
                  className={style.link}
                  data-testid={link.testid}
                  end
                >
                  {link.textLink}
                </NavLink>
              ))}
            </nav>
            <BasicMenu
              buttonContent={
                isAuthenticated ? <img src={Profile} /> : <img src={login} />
              }
              menuItems={eventsMenu.filter((item: string) =>
                isAuthenticated ? item === 'Выйти' : item !== 'Выйти',
              )}
              menuEvent={menuEvent}
            />
          </div>
          <div className={style.header__bottom}>
            <div className={style.header__group}>
              {productGroup.map((group) => {
                return (
                  <Link to="#" className={style.link} key={group}>
                    {group}
                  </Link>
                );
              })}
            </div>
            {/* <InputSearch placeholder="Search"/> */}
            <input className={style.inputSearch} type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
