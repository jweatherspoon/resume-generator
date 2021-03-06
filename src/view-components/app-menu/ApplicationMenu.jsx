import { AppBar, Toolbar } from "@material-ui/core"
import AppMenuItem from "./AppMenuItem"

const ApplicationMenu = ({menuItemDefinitions}) => {
    const rootMenuItems = menuItemDefinitions?.map(itemDef => <AppMenuItem key={itemDef.header} {...itemDef} />)
    return (
        <AppBar position="static" color="default">
            <Toolbar variant="dense">
                {rootMenuItems}
            </Toolbar>
        </AppBar>
    )
}

export default ApplicationMenu;