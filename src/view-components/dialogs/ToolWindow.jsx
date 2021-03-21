import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Grid, Typography, Divider } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const ToolWindow = ({title, children, isOpen, closeDialog, buttons}) => {
    if (!isOpen) {
        return null;
    }
    
    const dialogButtons = buttons?.map((btn, i) => (
        <Button key={`tool-window-${title}-btn-${i}`} onClick={btn.action} variant="outlined" className="dialog-button" disabled={btn.isDisabled && btn.isDisabled()}>
            {btn.content}
        </Button>
    ));

    return (
        <Dialog open={isOpen} maxWidth='md' fullWidth fullScreen>
            <DialogTitle>
                <Grid container>
                    <Grid item xs={9} style={{ margin: 'auto' }}>
                        <Typography>
                            <strong>
                                {title}
                            </strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={3} className="dialog-button-container">
                        <Button className="dialog-button"
                            onClick={closeDialog}>
                            <Close />
                        </Button>
                    </Grid>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {children}
            </DialogContent>
            <Divider />
            <DialogActions>
                {dialogButtons}
            </DialogActions>
        </Dialog>
    )
}

export default ToolWindow;