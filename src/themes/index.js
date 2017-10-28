import Config from 'react-native-config';
import * as themes from './themes';

const defaultTheme = () => {
    return themes[Config.DEFAULT_THEME];
}

export default defaultTheme;