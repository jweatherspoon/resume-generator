import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";

const ModalDialog = (props) => {
    const { title, isOpen, closeDialog, buttons, children, maxWidth } = props;
    
    const dialogButtons = buttons?.map((btn, i) => (
        <Button key={`dialog-${title}-btn-${i}`} onClick={btn.action} variant="outlined" className="dialog-button" disabled={btn.isDisabled && btn.isDisabled()}>
            {btn.content}
        </Button>
    ));

    return (
        <Dialog open={isOpen} onBackdropClick={() => closeDialog()}
            maxWidth={maxWidth || 'md'} fullWidth>
            <DialogTitle>
                <Grid container>
                    <Grid item xs={9} style={{ margin: 'auto' }}>
                        <Typography>
                            <strong>
                                {title}
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {dialogButtons}
            </DialogActions>
        </Dialog>
    )
}

export default ModalDialog;