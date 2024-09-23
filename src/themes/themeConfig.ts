import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
    token: {
        // Seed Token
        colorPrimary: "#0D85A8",
        colorText:"#0B2C4A"
    },
    components: {
        Button:{
            primaryShadow: 'none',
        }
       
    }
};

export default theme;