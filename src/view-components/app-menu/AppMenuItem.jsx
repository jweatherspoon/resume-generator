import { Menu, MenuItem, Button, makeStyles, ClickAwayListener } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
    menuItemWithBorder: {
        height: "100%",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
    },
});

const AppMenuItem = ({header, action, children, closeParent}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const triggerExpandEvent = e => setAnchorEl(e.currentTarget);
    const handleOnClick = () => {
        action && action();
        closeParent && closeParent();
    }

    const closeSubmenu = () => {
        console.log("Trying to close menu! Anchor El before:", anchorEl);
        setAnchorEl(null);
    }
    
    const childMenuItems = children?.map((childDef, i) => <AppMenuItem key={`${childDef}-${i}`} {...childDef} closeParent={closeSubmenu} />);
    if (childMenuItems && childMenuItems.length > 0) {
        return (
            <ClickAwayListener onClickAway={closeSubmenu}>
                <div onMouseEnter={triggerExpandEvent} >
                    <MenuItem>
                        {header}
                    </MenuItem>
                    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onMouseLeave={closeSubmenu}>
                        {childMenuItems}
                    </Menu>
                </div>
            </ClickAwayListener>
        );
    }
    else {
        return (
            <div onClick={handleOnClick}>
                <MenuItem>
                    {header}
                </MenuItem>
            </div>
        );
    }
}

export default AppMenuItem;