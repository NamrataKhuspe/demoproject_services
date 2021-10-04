const db = require('../db_connection.js');
const config = require('../config.json');


module.exports.register = async function (title, email, fname, lname, mob, pass, terms) {
    try {
        var check = await db.execute_query(`select * from register_details where email = '${email}'`);
        console.log("check >> ", check);
        if (check.length == 0) {
            return await db.execute_query(`insert into register_details (title,email,first_name,last_name,mobile,password,accept_terms) values("${title}","${email}","${fname}","${lname}","${mob}","${pass}","${terms}")`);
        } else {
            return false;
        }
    } catch (err) {
        console.log("err ", err);
        return false;
    }
}
module.exports.loginDetails = async function (email, pass) {
    try {
        var check = await db.execute_query(`select password from register_details where email = '${email}'`);
        return check;
        // return await db.execute_query(`select * from register_details where email = '${email}' and password = '${pass}'`);
    } catch (err) {
        console.log("err ", err);
        return false;
    }
}

module.exports.getProfileDetails = async function (email) {
    try {
        return await db.execute_query(`select * from register_details where email = '${email}'`);
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports.updateProfileDetails = async function (fname, lname, mobile, email, password) {
    try {
        if (password != undefined || password != "") {
            console.log("inside if");
            return await db.execute_query(`update register_details set password = '${password}' where email = '${email}'`);
        } else {
            console.log("inside else --");
            return await db.execute_query(`update register_details set first_name = '${fname}', last_name = '${lname}', mobile = '${mobile}' where email = '${email}'`);
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports.updateImageData = async function (filename, data, email) {
    try {
        return await db.execute_query(`update register_details set image_name = '${filename}', image_url = '${data}' where email = '${email}'`);
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports.getUserPass = async function (email) {
    try {
        return await db.execute_query(`select password from register_details where email = '${email}'`);
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports.UserData = async function () {
    try {
        return await db.execute_query(`select * from register_details`);
    } catch (err) {
        console.log(err);
        return false;
    }
}