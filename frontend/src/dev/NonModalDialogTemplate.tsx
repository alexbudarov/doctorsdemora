import { useMemo, useState } from "react";
import { useTranslate } from "react-admin";
import { Button, Paper, DialogTitle, DialogContentText, DialogActions, DialogContent } from "@mui/material";

export const NonModalDialogTemplate = () => {
  interface SimpleNonModalDialogProps {
    open: boolean;
    onClose: () => void;
  }

  const SimpleNonModalDialog = useMemo(
    () =>
      function SimpleNonModalDialog({ onClose, open }: SimpleNonModalDialogProps) {
        return (
          <Paper
            sx={(theme) => ({
              position: "fixed",
              zIndex: theme.zIndex.modal,
              display: open ? "block" : "none",
              
              /*vtl #if($dialog.fullWidth) */
              bottom: theme.spacing(3),
              left: theme.spacing(3),
              right: theme.spacing(3),
              /*vtl #else */
                /*vtl
                  #if($dialog.position == 'right')
                    right: theme.spacing(3),
                    bottom: theme.spacing(3),
                    width: "50%",
                  #elseif($dialog.position == 'left')
                    left: theme.spacing(3),
                    bottom: theme.spacing(3),
                    width: "50%",
                  #else
                    width: "50%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: theme.spacing(3),
                  #end
                */
              /*vtl #end */
            })}
          >
            {/*vtl #if($dialog.title) */}
            <DialogTitle>{/*vtl $dialog.title*/}</DialogTitle>
            {/*vtl #end */}
            <DialogContent>
              {/*vtl #if($dialog.content) */}
              <DialogContentText>
                {/*vtl $dialog.content*/}
              </DialogContentText>
              {/*vtl #end */}
            </DialogContent>
            <DialogActions>
              {/*vtl #foreach($action in $dialog.actions)*/}
              <Button
                /*vtl
                  #if($action.type == 'ok')
                    onClick={() => {
                      // TODO Override ok action
                      onClose();
                    }}
                  #elseif($action.type == 'cancel')
                    onClick={onClose}
                  #else
                    onClick={() => {
                      // TODO Write custom action
                    }}
                  #end
                */
              >
                {/*vtl $action.label*/}
              </Button>
              {/*vtl #end*/}
            </DialogActions>
          </Paper>
        );
      },
    []
  );

  const translate = useTranslate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {translate("ra.action.open")}
      </Button>
      <SimpleNonModalDialog
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
