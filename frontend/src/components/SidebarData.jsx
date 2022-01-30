import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Search',
    path: '/home',
    icon: <IoIcons.IoMdSearch />,
    cName: 'nav-text'
  },
  {
    title: 'Feed',
    path: '/feed',
    icon: <IoIcons.IoMdChatbubbles />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <IoIcons.IoMdPerson />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/login',
    icon: <IoIcons.IoIosLogOut />,
    cName: 'nav-text'
  }
];