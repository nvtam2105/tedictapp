import { getTheme } from '@shoutem/ui';
import { Dimensions } from 'react-native';
import { scale, moderateScale, verticalScale, lineHeight } from './scaling';
import _ from 'lodash';

const theme1 = _.merge(getTheme(), {
    'shoutem.ui.Title': {
        fontSize: scale(15),
        fontWeight: '400',
        lineHeight: lineHeight(scale(15)),
    },
    'shoutem.ui.Subtitle': {
        fontSize: scale(12),
        fontWeight: '400',
        lineHeight: lineHeight(scale(12)),
    },
    'shoutem.ui.Caption': {
        fontSize: scale(8),
        lineHeight: lineHeight(scale(8)),
    },
    'shoutem.ui.Button': {
        '.secondary': {
            backgroundColor: '#4682b4',
            borderColor: '#4682b4',
            borderRadius: 5,
        }
    }

});




const theme2 = _.merge(getTheme(), {
    'shoutem.ui.Subtitle': {
        fontSize: scale(10),
        fontWeight: '300',
        lineHeight: lineHeight(scale(10)),
    },
    'shoutem.ui.Caption': {
        fontSize: scale(6),
        lineHeight: lineHeight(scale(6)),
    }
});

const theme3 = _.merge(getTheme(), {
    'shoutem.ui.Subtitle': {
        fontSize: scale(8),
        fontWeight: '400',
        lineHeight: lineHeight(scale(8)),
    },
    'shoutem.ui.Caption': {
        fontSize: scale(5),
        lineHeight: lineHeight(scale(5)),
    }
});

export { theme1, theme2, theme3 };