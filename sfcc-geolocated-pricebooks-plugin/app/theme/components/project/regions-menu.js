const RegionsMenuTheme = {
    baseStyle: {
        headerMenuButton: {
            alignItems: ['baseline', 'baseline', 'baseline', 'center'],
            borderRadius: '8px',
            width: 'fit-content',
            mr: 'auto',
            ml: '10px',
            padding: '10px',
            alignItems: 'center',
            _hover: {
                cursor: 'pointer',
                backgroundColor: 'gray.100'
            }
        },
        logo: {
            width: [6, 6, 6, 8],
            height: [4, 4, 4, 5]
        },
    },
    parts: ['headerMenuButton', 'logo']
}

export default RegionsMenuTheme