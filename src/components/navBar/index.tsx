import React from "react";
import Image from "next/image";
import community from "/public/navi/navi_community_active.svg";
import community_inactive from "/public/navi/navi_community_inactive.svg";
import mystar from "/public/navi/navi_mystar_active.svg";
import mystar_inactive from "/public/navi/navi_mystar_inactive.svg";
import mypage from "/public/navi/navi_mypage_active.svg";
import mypage_inactive from "/public/navi/navi_mypage_inactive.svg";

import { useRouter } from "next/navigation";
import { Nav, NavItem } from "./styles"

type ItemProps = {
  active?: boolean;
  activeIcon: any;
  inactiveIcon: any;
  label: string;
  onClick: () => void;
};

const Item = ({ active, activeIcon, inactiveIcon, label, onClick }: ItemProps) => (
  <NavItem $active={active} onClick={onClick}>
    <Image src={active ? activeIcon : inactiveIcon} alt={label} />
    {label}
  </NavItem>
)

const NavBar = () => {
  const router = useRouter();

  return (
    <Nav>
      <Item
        label="커뮤니티"
        active={false}
        activeIcon={community}
        inactiveIcon={community_inactive}
        onClick={() => router.push(`/community/memory`)}
      />
      <Item
        label="내 별자리"
        active={false}
        activeIcon={mystar}
        inactiveIcon={mystar_inactive}
        onClick={() => router.push(`/mypage/mystar`)}
      />
      <Item
        label="마이페이지"
        active={true}
        activeIcon={mypage}
        inactiveIcon={mypage_inactive}
        onClick={() => router.push(`/mypage/myInfo`)}
      />
    </Nav>
  );
};

export default NavBar;
