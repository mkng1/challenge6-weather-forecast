const { writeFile, readFile } = require("fs");
const path = "./city.list.json";
const path2 = "./city.list2.json";

const cityNameList = [];

readFile(path, (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    const parsedData = JSON.parse(data);
    
    for (let index = 0; index < parsedData.length; index++) {
        const selectedCity = parsedData[index];
        const cityName = selectedCity.name;
        cityNameList.push(cityName);
    }
    console.log(cityNameList);
    writeFile(path2, JSON.stringify(cityNameList, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
});