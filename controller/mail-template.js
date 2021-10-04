module.exports.MailTemplate = async function (request, getSystemDetails) {
    return new Promise((resolve, reject) => {
        try {
            console.log("request ------------------------ ", request);

            var htmltemplate = `<table style="border: 1px solid #656565;color:#323232;" width="550" cellspacing="0" cellpadding="0" align="center">
        <tbody><tr>
            <!-- New added -->
            <td align="center" valign="top"><img src="" class="responsive-image1" style="display:block;" border="0"></td>
        </tr>
        <!-- Innerdata began here -->
        <tr height="80">
            <td>
                <table border="0" width="550" cellspacing="0" cellpadding="0" align="left">

                    <tbody><tr height="40">
                        <td border="0" width="550" cellspacing="0" cellpadding="0" align="left" style="padding: 0 20px;">
                            <span style="font-family: Lato; text-align: center; font-size: 14px;">Dear user, </b></span>
                        </td>                       
                    </tr>
                    <tr height="30">
                    <td border="0" width="550" cellspacing="0" cellpadding="0" align="left" style="padding: 0 20px;">
                    <span style="font-family: Lato; text-align: center; font-size: 14px;">Greetings from xyz</b></span>
                    </td>
                    </tr>

                    <tr height="50">
                    <td border="0" width="550" cellspacing="0" cellpadding="0" align="left" style="padding: 0 20px;">
                    <span style="font-family: Lato; text-align: center; font-size: 14px;">Your password has been updated
                    </b>
                    </span><br>
                    <span style="font-family: Lato; text-align: center; font-size: 14px;">Your updated password is ${request.updated_password}
                    </b>
                    </span>
                    </td>
                </tr>
                    
                    <tr height="40">
                      <td border="0" width="550" cellspacing="0" cellpadding="0" align="left" style="padding: 0 20px;">
                          Warm Regards,<br>
                          XYZ
                       </td>
                    </tr>
                
                </tbody></table>
                <!-- end Innerdata began here -->
            </td>
        </tr>

        <!-- footer start -->

        <tr>
            <td align="center" valign="top">
                <table width="550" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td height="1" align="center" valign="top" style="font-family:lato; font-size:11px; color:#323232; text-align:left; border-bottom:1px solid #97144D;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>



        <tr>
            <td align="left" valign="top" style="padding:10px 20px;">
                <table width="500" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" style="font-family: Lato; font-size:10px; line-height:11px; text-align:center; color:#323232; padding-bottom:8px;">
                                <!-- New added -->
                                <em>
                                This e-mail is confidentials. It may also be legally privilleged. If you are not the addressee, you may not copy,forword <br>
                                 disclose or use any part of internet communication cannot be timely, secure, error or virus-free <br>
                                 The sender dose not accept liability for any errord or omissions. We maintain strict security standards and <br>
                                  procedures to prvent unauthroised access to information about you.
                                    <a style=" outline:none; color:#323232; font-size:10px; line-height:11px; text-decoration:underline;" href="{{FOOTER_DISCLAIMER_REDIRECT}}" target="_blank"><strong>Know more
                                        </strong></a><strong>&gt;&gt;</strong></em>
                            </td>
                        </tr>
                        <br>
                        <tr>
                            <td align="center" valign="top" style="font-family: Lato; font-size:10px; line-height:11px; text-align:center; color:#323232; padding-bottom:8px;">
                                <!-- New added -->
                                Copyright xyz Ltd. All rights reserved. Terms & Conditions apply.
                            </td>
                        </tr>
                        <br>
                        <tr>
                            <td align="center" valign="top" style="font-family: Lato; font-size:10px; line-height:11px; text-align:center; color:#323232; padding-bottom:8px;">
                                <!-- New added -->
                                Please do not share details with anyone - either over the phone in person or digitally
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" style="font-family: Lato; font-size:10px; line-height:11px; text-align:center; color:#323232;">
                                <!-- New added -->
                                Do not click on link from unknown /unsecured sources that seek your confidentials information
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>

        <!-- footer end -->
    </tbody></table>`

            custom_style = ` 
    <style  type="text/css" media="print">
        @page {
        size: auto;
        margin: 10mm 6mm 10mm 6mm; 
        }
    </style>`

            resolve(htmltemplate)

        } catch (err) {
            reject(err)
        }
    })
}

