var fs = require('fs');
var path = require('path')
var json2xls = require('json2xls');
const converter = require('json-2-csv');

async function create_folder(folder_loaction) {
    return new Promise((resolve, reject) => {
        fs.access(folder_loaction, async function (error) {
            console.log("\n\n ISAccess -- > ", error);
            console.log("__dirname >> " , __dirname);
            if (error) {

                fs.mkdir(path.join(__dirname, '../' + folder_loaction), (err) => {
                    if (err) {
                        resolve({ "status": false })
                    }
                    else {
                        console.log('Directory created successfully!');
                        resolve({ "status": true })
                    }
                });

            } else {
                console.log("Directory exists.")
                resolve({ "status": true })
            }
        })

    })

}

module.exports.file_downlode_csv_formate = async (filepath, file_data, filename, folder_loaction) => {
    return new Promise(async (resolve, reject) => {
        try {
            create_folder(folder_loaction)

            converter.json2csv(file_data, (err, csv) => {
                if (err) {
                    throw err;
                }
                else {
                    console.log("csv===>> " + csv);
                    fs.writeFile(filepath, csv, async (err) => {
                        console.log(" in side wrinting file ---- > " , filepath);
                        console.log(" err while wring file on filepath -- >> ", err);
                        if (err) throw err;
                        console.log("files saved  !!");
                        // process.exit()
                    
                        resolve()
                    });
                }
            });
        } catch (error) {
            throw error
        }
    })
}

module.exports.excel_download = async (filepath, file_data, filename, folder_loaction) => {

    return new Promise(async (resolve, reject) => {
        try {
            create_folder(folder_loaction)


            console.log("++++++++++++++inside excel ++++++++++++++");
            var xls = json2xls(file_data,);

            fs.writeFile(filepath, xls, 'binary', async (err) => {
                console.log(" if err in write file xls ----- >>> ", err);
                if (err) throw err;
                console.log("files saved  !!");
                resolve();
            });

        } catch (error) {
            throw error
        }
    })

}
