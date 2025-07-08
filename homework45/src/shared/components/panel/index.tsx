import React, { Children } from 'react';
import { PanelStyle, PanelToolBarStyle, PanelToolBarButtonStyle } from './index.styles';

export const Panel = ({children}) => {
    return (
        <PanelStyle>
            {children}
        </PanelStyle>
    )
}

export const PanelToolBar = ({title, children}) => {
    return (
        <PanelToolBarStyle>
            <h4>{title}</h4>
            {children}   
        </PanelToolBarStyle>
    )
}

export const PanelToolBarButton = ({text}) => {
    return (
        <PanelToolBarButtonStyle>
            {text}
        </PanelToolBarButtonStyle>
    )
}