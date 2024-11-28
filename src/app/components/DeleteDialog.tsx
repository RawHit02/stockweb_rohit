"use client"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react'

interface DialogContent {
    openDelete: boolean;
    handleCloseDeleteDialog: () => void;
    handleDeleteAction: () => void;
    dialogueTitle: string;
    dialogueDescription: string;
}

const DeleteDialog: React.FC<DialogContent> = ({
    openDelete,
    handleCloseDeleteDialog,
    handleDeleteAction,
    dialogueTitle,
    dialogueDescription
}) => {

    const handleClose = () => {
        handleCloseDeleteDialog()
    };
    return (
        <>
            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogueTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogueDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' className='rounded-[4px]' onClick={handleClose}>Disagree</Button>
                    <Button variant='contained' color='primary' className='rounded-[4px]' onClick={handleDeleteAction} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteDialog