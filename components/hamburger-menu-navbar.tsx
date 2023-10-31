"use client";

import { useState } from "react";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { Icons } from "@/components/icons";
import { NavPlaygrounds } from "./nav-playgrounds";
import { NavProducts } from "./nav-products";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const links: { href: string; title: string }[] = [
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
];

export default function HamburgerMenu() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: "right", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <div>
      <Icons.hamburger
        onClick={toggleDrawer("right", true)}
        className="block lg:hidden"
      />

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        className="block lg:hidden"
      >
        <Box
          padding={"1rem 1rem"}
          onKeyDown={toggleDrawer("right", false)}
          onClick={toggleDrawer("right", false)}
          className="bg-background text-foreground"
        >
          <List sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Icons.close
              onClick={toggleDrawer("right", false)}
              className="scale-110"
            />
          </List>
          <Divider className="bg-border" />
          <List>
            <NavPlaygrounds />
          </List>
          <Divider className="bg-border" />
          <List>
            <NavProducts />
          </List>
          <Divider className="bg-border" />
          <List>
            {links.map((link) => (
              <ListItem className="my-5" key={link.href}>
                <Link href={link.href} className="text-4xl font-bold">
                  {link.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
