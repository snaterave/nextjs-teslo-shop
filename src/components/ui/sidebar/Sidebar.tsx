"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { SidebarItems } from "./SidebarItems";
import { useUIStore } from "@/store";
import { logout } from "@/actions";

const menuUp = [
  {
    link: "/profile",
    icon: <IoPersonOutline size={20} />,
    name: "Perfil",
  },
  {
    link: "/orders",
    icon: <IoTicketOutline size={20} />,
    name: "Ordenes",
  },
  // {
  //   link: "/auth/login",
  //   icon: <IoLogInOutline size={20} />,
  //   name: "Ingresar",
  // },
  // {
  //   link: "/profile",
  //   icon: <IoLogOutOutline size={20} />,
  //   name: "Salir",
  // },
];

const menuDown = [
  {
    link: "/admin/products",
    icon: <IoShirtOutline size={20} />,
    name: "Productos",
  },
  {
    link: "/admin/orders",
    icon: <IoTicketOutline size={20} />,
    name: "Ordenes",
  },
  {
    link: "/admin/users",
    icon: <IoPeopleOutline size={20} />,
    name: "Usuarios",
  },
];

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 bg-black opacity-30 w-screen h-screen z-10" />
      )}

      {/* blur */}
      {isSideMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          onClick={() => closeMenu()}
        />
      )}

      {/* Side menu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-full md:w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-1000",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />
        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* menu */}
        {/* <SidebarItems
          href={"/profile"}
          icon={<IoPersonOutline size={20} />}
          name={"Perfil"}
          close={closeMenu}
        />
        <SidebarItems
          href={"/"}
          icon={<IoTicketOutline size={20} />}
          name={"Ordenes"}
          close={closeMenu}
        />
        <SidebarItems
          href={"/"}
          icon={<IoLogInOutline size={20} />}
          name={"Ingresar"}
          close={closeMenu}
        />
        <SidebarItems
          href={"/"}
          icon={<IoLogOutOutline size={20} />}
          name={"Salir"}
          close={closeMenu}
        /> */}
        {isAuthenticated &&
          menuUp.map((item, index) => (
            <SidebarItems
              key={index}
              href={item.link}
              icon={item.icon}
              name={item.name}
              close={closeMenu}
            />
          ))}
        {isAuthenticated && (
          <button
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => logout()}
          >
            <IoLogOutOutline size={20} />
            <span className="ml-3 text-sm">Salir</span>
          </button>
        )}
        {!isAuthenticated && (
          <SidebarItems
            href={"/auth/login"}
            icon={<IoLogInOutline size={20} />}
            name={"Ingresar"}
            close={closeMenu}
          />
        )}

        {/* Line Separator */}
        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />

            {menuDown.map((item, index) => (
              <SidebarItems
                key={index}
                href={item.link}
                icon={item.icon}
                name={item.name}
                close={closeMenu}
              />
            ))}
          </>
        )}

        {/* <SidebarItems
          href={"/"}
          icon={<IoShirtOutline size={20} />}
          name={"Productos"}
          close={closeMenu}
        />
        <SidebarItems
          href={"/"}
          icon={<IoTicketOutline size={20} />}
          name={"Ordenes"}
          close={closeMenu}
        />
        <SidebarItems
          href={"/"}
          icon={<IoPeopleOutline size={20} />}
          name={"Usuarios"}
          close={closeMenu}
        /> */}
      </nav>
    </div>
  );
};
