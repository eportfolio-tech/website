import React from 'react';
import {ReactComponent as NotFoundLogo} from '../../assets/404.svg';
import Layout from '../../components/Navigation';

const App = () => {
    return (
        <div>
            <Layout>
                <div className="App">
                    <NotFoundLogo />
                </div>
            </Layout>
            {/* <AppFooter /> */}
        </div>
    );
};
export default App;
