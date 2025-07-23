
import WalletIcon from '@mui/icons-material/Wallet';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HomeIcon from '@mui/icons-material/Home';

export const SIDEBAR_MENU = [
    { icon: <HomeIcon />, text: "Home", link: "/"},
    { icon: <WalletIcon />, text: "Wallet", link: "/wallet"},
    { icon: <RealEstateAgentIcon />, text: "Housekeeping", link: "*" },
    { icon: <AddReactionIcon />, text: "Wishes", link: "*" },
    { icon: <AssignmentTurnedInIcon />, text: "Necessities", link: "*" }
]