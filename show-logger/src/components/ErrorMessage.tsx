import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export interface ErrorMessageProps {
    open: boolean;
    onClose: () => void;
    errors: string[];
}

export const ErrorMessage = (props: ErrorMessageProps) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>
                {"Error"}
            </DialogTitle>
            <DialogContent>
                {props.errors.map(((error: string, index: number) => (
                    <div key={index}>{error}</div>
                )))}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.onClose}
                    autoFocus
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}