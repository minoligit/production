import {defaultTheme} from 'react-admin';
import '../sidebar.css';

const theme = {
    ...defaultTheme,
    sidebar: {
        width: 200,
        closedWidth: 50
    },
};

export default theme;