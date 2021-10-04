var db = require("../db_connection");
var dao = require("../utils/dao");
const crypto = require("crypto");
var key = "abcdefghijklmnopqrstuvwx";

var fs = require('fs');
var pdf = require('html-pdf');
const nodemailer = require('nodemailer');
var mailtemplate = require('./mail-template');
var config = require('../config.json');
const xlsx = require("xlsx");
var json2xls = require('json2xls');

module.exports.Register = async (req, reply) => {
    var req = req.payload;
    console.log("req- > ", req);
    // password encryption in base64
    var encrypt = crypto.createCipheriv('des-ede3', key, "");
    var theCipher = encrypt.update(req.password, 'utf8', 'base64');
    theCipher += encrypt.final('base64');
    var terms = req.acceptTerms == "true" ? 1 : 0;
    var registerDeatils = await dao.register(req.title, req.email, req.firstName, req.lastName, req.mobile, theCipher, terms);
    console.log("registerDeatils ...... > ", registerDeatils);
    console.log("register Details  ----- > ", registerDeatils.affectedRows);


    if (registerDeatils == false) {
        return ({
            'status': false,
            "data": "Email address is already taken by another user"
        });
    } else {
        if (registerDeatils.affectedRows > 0) {
            return ({
                'status': true,
                "data": "User Register Sucessfully!"
            });
        }
    }


}

module.exports.Login = async (req, reply) => {
    try {
        var req = req.payload;
        var getencryptedPass = await dao.loginDetails(req.email);
        console.log("getencryptedPass -- > ", getencryptedPass);
        if (getencryptedPass.length > 0) {
            var pass = getencryptedPass[0].password;

            var decrypt = crypto.createDecipheriv('des-ede3', key, "");
            var Dpass = decrypt.update(pass, 'base64', 'utf8');
            if (req.password == Dpass + decrypt.final('utf8')) {
                return ({
                    'status': true,
                    "data": "Login successfully!"
                });
            } else {
                return ({
                    'status': false,
                    "data": "password dose not match"
                });
            }
        } else {
            return ({
                'status': false,
                "data": "Invalid User!"
            });
        }

    } catch (err) {
        console.log("errr ", err);
    }

}

module.exports.profileInfo = async (req, reply) => {
    console.log("req - > ", req.query.email);
    // console.log(querystring.parse(email));
    var getProfileDetails = await dao.getProfileDetails(req.query.email);
    console.log("getProfileDetails -- > ", getProfileDetails);
    if (getProfileDetails != "" || getProfileDetails != null) {
        return ({
            'status': true,
            "data": getProfileDetails
        });
    } else {
        return ({
            'status': false,
            "data": 'No data found!'
        });
    }
}

module.exports.getUserCurrrentPass = async (req, reply) => {
    console.log("get user current password -- > ", req.payload.email);
    var getPass = await dao.getUserPass(req.payload.email);
    if (getPass.length > 0) {
        var pass = getPass[0].password;
        var decrypt = crypto.createDecipheriv('des-ede3', key, "");
        var Dpass = decrypt.update(pass, 'base64', 'utf8');
        console.log("req.query.password", req.query.password)
        if (req.payload.password == Dpass + decrypt.final('utf8')) {
            return ({
                'status': true,
                "data": "Current password matched!"
            });
        } else {
            return ({
                'status': false,
                "data": "Current password dose not match"
            });
        }
    } else {
        return ({
            'status': false,
            "data": "Invalid User!"
        });
    }

}

module.exports.updateProfileInfo = async (req, reply) => {
    console.log("req - > ", req.payload);
    var fname = req.payload.firstName;
    var lname = req.payload.lastName;
    var mobile = req.payload.mobile;
    var email = req.payload.email;
    var password = req.payload.password;
    var getProfileDetails;
    console.log("password -- > ", password);
    if (password != undefined) {
        var encrypt = crypto.createCipheriv('des-ede3', key, "");
        var theCipher = encrypt.update(password, 'utf8', 'base64');
        theCipher += encrypt.final('base64');
        getProfileDetails = await dao.updateProfileDetails(fname, lname, mobile, email, theCipher);
    } else {
        getProfileDetails = await dao.updateProfileDetails(fname, lname, mobile, email, '');
    }
    console.log("getProfileDetails -- > ", getProfileDetails);
    if (getProfileDetails.affectedRows > 0) {
        return ({
            'status': true,
            "data": 'User Data update successfully!'
        });
    } else {
        return ({
            'status': false,
            "data": 'Error while updating user data'
        });
    }
}


module.exports.uploadFile = async (req, reply) => {
    try {
        const handleFileUpload = file => {
            return new Promise((resolve, reject) => {
                console.log("filename --------- > ", file.hapi.filename);
                const filename = file.hapi.filename;
                const data = file._data;
                console.log("file -- > ", data);
                return fs.writeFile(`./upload/${filename}`, data, err => {
                    console.log("err-- > ", err);
                    if (err) {
                        reject(err)
                    }
                    resolve({
                        message: "Upload successfully!",
                        // imageUrl: `${server.info.uri}/uploads/${filename}`
                    })
                })
            })
        }
        return handleFileUpload;
    } catch (err) {
        console.log("err", err);
    }

}

module.exports.createPdf = async (req, reply) => {
    // var html = fs.readFileSync('./test/businesscard.html', 'utf8');
    var html = fs.readFileSync('./documents/', 'utf8');
    var options = { format: 'Letter' };

    pdf.create(html, options).toFile('./samplefile.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });

}

module.exports.sendEmail = async function (req, res) {
    try {
        console.log("request send mail ");
        var request = req.payload;
        nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'namrata.khuspe18@gmail.com',
                pass: 'namukhuspe@1234'
            }
        });

        var template = await mailtemplate.MailTemplate(request);
        // console.log("template --------- > ", template);
        var emailrequest = {
            html: template,
            subj: 'Password Update Notification'
        }


        if (template != undefined) {
            var sendingmail = await sendmail(emailrequest, req);
            return ({ status: sendingmail })
        } else {
            return ({ status: false })
        }

    } catch (err) {
        console.log("error  in catch ", err);
    }

}


async function sendmail(emailrequest, req) {
    return new Promise(async function (resolve, reject) {
        try {
            var smtpTransport = nodemailer.createTransport({
                // host: config.SMTP_Configuration.Server,
                // port: config.SMTP_Configuration.Port,
                service: 'gmail',
                auth: {
                    user: config.SMTP_Configuration.from_email,
                    pass: config.SMTP_Configuration.Password
                }
            });

            // console.log("emailrequesttttttttttt > ", emailrequest);
            var mailOptions = {
                from: config.SMTP_Configuration.from_email,
                to: config.SMTP_Configuration.To,
                subject: emailrequest.subj,
                html: emailrequest.html
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                console.log(" if           --------------------- err- ", err);
                if (err) {
                    resolve(false);
                } else {
                    console.log("Mailresponse", info);
                    resolve(true);
                }
            });
        } catch (error) {
            console.error("ERROR WHILE SEND EMAIL -- > ", error, req);
            resolve(false);
        }
    })
}

// https://morioh.com/p/4b3188bee15c

// Json to excel conversion & download all user data into excel format

module.exports.downlodUserData = async (req, reply) => {
    console.log("Download user data -- > ", req.payload);
    var getJsonData = await dao.UserData();
    console.log("getJsonData" , getJsonData);
}