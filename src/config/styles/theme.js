import { configureFonts, DefaultTheme } from 'react-native-paper';
import colors from './colors';

const fontConfig = {
    default: {
        regular: {
            fontFamily: 'Asap-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Asap-SemiBold',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Asap-Medium',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'Asap-Italic',
            fontWeight: 'normal',
        },

    },
};


const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.PRIMARY,
        accent: colors.SECONDARY
        // surface: colors.DANGER
    },
    fonts: configureFonts(fontConfig),
};

export default theme;