import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";

const ModalDialog = (props) => {
    const { title, isOpen, closeDialog, buttons, children, maxWidth } = props;
    
    const dialogButtons = buttons?.map((btn, i) => (
        <Button key={`dialog-${title}-btn-${i}`} onClick={btn.action} variant="outlined" className="dialog-button">
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
                    <Grid item xs={3} className="dialog-button-container">
                        {dialogButtons}
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default ModalDialog;