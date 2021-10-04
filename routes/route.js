const controller = require('../controller/services');
const dao = require('../utils/dao');

const register = controller.Register;
const login = controller.Login;
const getprofiledetails = controller.profileInfo;
const updateprofiledata = controller.updateProfileInfo;
const getuserpass = controller.getUserCurrrentPass;
const uploadfile = controller.uploadFile;
var fs = require('fs');
var path = require('path');
var buffer = require('buffer/').Buffer;
var aesjs = require('aes-js');
const sendemail = controller.sendEmail;

module.exports = [
    {
        path: '/register',
        method: 'post',
        handler: register
    },
    {
        path: '/login',
        method: 'post',
        handler: login
    },
    {
        path: '/getProfile/{email?}',
        method: 'get',
        handler: getprofiledetails
    },
    {
        path: '/getCurrentUserPass',
        method: 'post',
        handler: getuserpass
    },
    {
        path: '/updateProfile',
        method: 'post',
        handler: updateprofiledata
    },
    {
        path: '/sendemail',
        method: 'post',
        handler: sendemail
    },
    {
        method: 'post',
        path: '/fileUpload',
        config: {
            payload: {
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                maxBytes: 2 * 1000 * 1000
            }
        },
        handler: async (req, reply) => {
            try {
                const { imageUrl } = await handleFileUpload(req.payload.image, req.payload.email);
                const user = { image: imageUrl };
                // const user = new User({ image: imageUrl });
                // const result = user.save();
                return ({
                    'status': true,
                    "data": 'Upload successfully!'
                });
            } catch (err) {
                throw err
            }
        }

    }
];


const handleFileUpload = (file, email) => {
    return new Promise((resolve, reject) => {
        // console.log("filename --------- > ", file.hapi.filename);
        const filename = file.hapi.filename;
        const data = file._data;
        return fs.writeFile(`./upload/${filename}`, data, err => {
            console.log("err-- > ", err);
            if (err) {
                reject(err)
            }
            var bf = buffer.from(data).toString('base64');
            // var string = bf.toString('base64');
            var insertImageData = dao.updateImageData(filename, bf, email);
            if (insertImageData.affectedRows > 0) {
                resolve({
                    'status': true,
                    "data": 'Upload successfully!'
                    // imageUrl: `${server.info.uri}/uploads/${filename}`
                })
            } else {
                console.log("No email found --- ");
                resolve({
                    'status': false,
                    "data": 'No email id found to store avtar'
                })
            }

        })
    })
}
