import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import React, {useContext} from 'react';
import { UserContext } from "../../utils/UserContext"
import { useNavigate } from 'react-router-dom';



function ConfirmLogoutModal(props) {
// const {openConfirmModal, handleCloseModal, setConfirmLogout} = props

    const { logout, setJustLoggedOut, openConfirmModal, setOpenConfirmModal,
    handleOpenModal, handleCloseModal,} = useContext(UserContext)

    const navigate = useNavigate()

    return (
         <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}
        aria-labelledby="confirm-logout-title"
        aria-describedby="confirm-logout-description"
      >
        <DialogTitle id="confirm-logout-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-logout-description">
           Please confirm that you'd like to log out.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={() => {
              try {
                    logout()
                    setJustLoggedOut(true)
                    handleCloseModal()
                    navigate("/logout")
               } catch(err) {
                alert(err)
               }
            }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default ConfirmLogoutModal
