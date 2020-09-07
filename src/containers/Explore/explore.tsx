import React, { useState } from 'react';
import Results from '../Search/results';
import SearchBar from '../Search/searchBar';
import Layout from '../../components/Navigation/layout';

const options = ['Tags', 'Names'];

export default () => {
    const [option, setOption] = useState<string | null>(options[0]);

    return (
        <Layout>
            <div>
                <SearchBar
                    options={options}
                    option={option}
                    setOption={setOption}
                />
                <br />
                <br />
                <Results />
            </div>
        </Layout>
    );
};
