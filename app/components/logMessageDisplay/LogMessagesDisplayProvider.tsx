"use client"

import { LogMessage } from '@/app/types';
import { LogMessagesContext, useLogMessagesDisplayStoreData } from './LogMessagesDisplayContext'
import { useState } from 'react';

export const LogMessageDisplayProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <LogMessagesContext.Provider value={useLogMessagesDisplayStoreData()}>
            {children}
        </LogMessagesContext.Provider>
    )
}  