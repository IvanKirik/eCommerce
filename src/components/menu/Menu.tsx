import React, {ReactNode, useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {eventType} from "../header/Header.tsx";

type PropsMenu = {
    buttonContent: ReactNode;
    menuItems: string[];
    menuEvent: (event: string) => eventType;
}

export default function BasicMenu({ buttonContent, menuItems, menuEvent }: PropsMenu) {
    const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event) setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (menuItem: string) => {
        setAnchorEl(null);
        menuEvent(menuItem)
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={event => event && handleClick(event)}
            >
                {buttonContent}
            </Button>
            <Menu
                id="basic-menu"
                disableScrollLock={true}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItems.map((menuItem: string, index: number) => (
                    <MenuItem key={index} onClick={() => handleMenuItemClick(menuItem)}>
                        {menuItem}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
