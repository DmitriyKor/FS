import React from 'react';
import { PanelStyle, PanelToolBarButtonStyle } from './index.styles';
import { PanelToolBarStyle } from '../../styles/styles';

interface IPanelProps {children? : React.ReactNode};

export const Panel : React.FC<IPanelProps> = ({children}) => {
    return (
        <PanelStyle>
            {children}
        </PanelStyle>
    )
}

// interface IPanelToolBarProps {title: string; children?: React.ReactNode};

// export const PanelToolBar : React.FC<IPanelToolBarProps> = ({title, children}) => {
//     return (
//         <PanelToolBarStyle>
//             <h4>{title}</h4>
//             {children}   
//         </PanelToolBarStyle>
//     )
// }

// export const PanelToolBarButton = ({text}: {text:string}) => {
//     return (
//         <PanelToolBarButtonStyle>
//             {text}
//         </PanelToolBarButtonStyle>
//     )
// }