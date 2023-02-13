import data from '../../data/data.json'


const service = {
    getData: ({from, to}) => {
        return new Promise((resolve, reject) => {

                const loadData = data.slice(from, to);
                // console.log(loadData);

                resolve({
                    count: data.length,
                    loadData: loadData
                })
        });
    }
}

export default service;