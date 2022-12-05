export let dataConvert = {
    convertDataTableToJson(dataTable, propName) {
        let json = [];
        let cols = dataTable.COLUMNS;
        let data = dataTable.DATA;
        let props = [];

        cols.forEach((item, index) => {
            props.push(item[propName]);
        });

        data.forEach((item, index) => {
            let jsonData = {};
            item.forEach((d, i) => {
                jsonData[props[i]] = d;
            });
            json.push(jsonData);
        });

        return json;
    },
}