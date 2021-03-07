import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Grid, Typography, Divider } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const ToolWindow = ({title, children, isOpen, onClose, buttons}) => {
    const dialogButtons = buttons?.map(btn => (
        <Button onClick={btn.action} variant="outlined" className="dialog-button">
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
                            onClick={onClose}>
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