"use strict";

const Validator = require('validator');

const UnnSendmail = { };

UnnSendmail.getKYCApprovedTemplate = function (userEmail, userName) {
    if (!Validator.isEmail(userEmail)) {
        throw new Error("user email is not a valid email address");
    }
    return {
        from: 'no-reply@unn.finance',
        to: userEmail,
        subject: 'KYC Approved for UNN Sale',
        html:
            `<p>Congratulations ${Validator.escape(userName)}! Your account has been approved for the UNN Sale.</p>
            <p>Please goto <a href="https://purchase.unn.finance">https://purchase.unn.finance</a> and connect with the wallet you registered with.</p>
            <p>Best,</p>
            <p>UNN Team</p>`,
    }
}

UnnSendmail.getKYCRejectedTemplate = function (userEmail) {
    if (!Validator.isEmail(userEmail)) {
        throw new Error("user email is not a valid email address");
    }
    return {
        from: 'no-reply@unn.finance',
        to: userEmail,
        subject: 'KYC Not Approved',
        html:
            `<p>Your KYC application was Not Approved. Please contact us at <a href="mailto:info@unn.finance">info@unn.finance</a> with questions.</p>
            <p>Be sure to include your full name and email that you registered with.</p>
            <p>Best,</p>
            <p>UNN Team</p>`,
    }
}

UnnSendmail.getKYCActionRequiredTemplate = function (userEmail) {
    if (!Validator.isEmail(userEmail)) {
        throw new Error("user email is not a valid email address");
    }
    return {
        from: 'no-reply@unn.finance',
        to: userEmail,
        subject: 'KYC Status Updated',
        html:
            `<p>There is additional request to complete your KYC.</p>
            <p>Please goto <a href="https://purchase.unn.finance">https://purchase.unn.finance</a>, enter your wallet address you used to register, and click Continue.
            Then, launch the Synaps KYC and click in the KYC modal "Last Transactions" to see which documents were not accepted.</p>
            <p>Best,</p>
            <p>UNN Team</p>`,
    }
}

module.exports = UnnSendmail;