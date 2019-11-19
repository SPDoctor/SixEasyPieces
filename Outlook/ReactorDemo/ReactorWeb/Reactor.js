// default values

var flosim = flosim || {};
flosim.reactor = flosim.reactor || {};

flosim.reactor.chooseTemplate = function (subject, body) { // needs testing
  var regexSEO = /(?=.*\b(SEO|rank|ranking)\b)(?=.*\b(website|web|site)\b).*/i;
  var regexLegalDisclaimer = /(?=.*\bdisclaimer\b)(?=.*\binformation\b)(?=.*\bconfidential\b)(?=.*\bprohibited\b)(?=.*\brecipient\b).*/i;
  var regexBuyDomain = /(?=.*\bdomain\b)(?=.*\b(purch|buy|acquir)).*/i;
  var regexSellDomain = /(?=.*\bdomain\b)(?=.*\bsell\b).*/i;
  var regexUnsolicedFollowUp = /(?=.*\b wondering if you recieved\b)(?=.*\b(service|product|meeting)\b).*/i;
  var regexNOSOAP = /(?=.*\bCV\b)(?=.*\b(vacanc|opportunit)).*/i;

  var template = "default";
  if (subject !== undefined) {
    if (regexSEO.test(subject)) template = "no SEO";
  }
  if (body !== undefined) {
    if (regexSEO.test(body)) template = "no SEO";
    if (regexLegalDisclaimer.test(body)) template = "legal disclaimer";
    if (regexBuyDomain.test(body)) template = "buy domain";
    if (regexSellDomain.test(body)) template = "sell domain";
    if (regexUnsolicedFollowUp.test(body)) template = "unsolicited follow-up";
    if (regexNOSOAP.test(body)) template = "nosoap";

    if (body.length < 2) template = "empty";
  }
  return template;
}

flosim.reactor.getDefaultStrings = function () {
  return {
    "name": "",
    "title": "",
    "company": "",
    "product": "",
    "website": "<a href=\"http://www.contoso.com/\">http://www.contoso.com/</a>",
    "faq": "<a href=\"http://www.contoso.com/faq.html\">http://www.contoso.com/faq.html</a>",
    "twitter": "",
    "mobile": "",
    "salutation": "Hi,",
    "signature": "<br /><br />Regards, <br /><br />{{name}}<br />{{title}}<br />{{company}}<br /><br />"
  }
}

flosim.reactor.getDefaultTemplates = function () {
  return {
    "default":
      "{{salutation}}<br /><br />" +
      "Many thanks for contacting us. {{signature}}",
    "empty":
      "{{salutation}}<br /><br />" +
      "Many thanks for contacting us, but unfortunately your message was empty.<br />" +
      "Perhaps you could try again.<br /><br />Many thanks.{{signature}}",
    "no soap":
      "{{salutation}}<br /><br />" +
      "Many thanks for contacting us. Unfortunately we have no suitable opportunities at present for someone with your qualifications.<br /><br />" +
      "I would like to take this opportunity to offer you every success in finding suitable employment.{{signature}}",
    "buy domain":
      "{{salutation}}<br /><br />" +
      "Thank you, but we are not interested in purchasing your Internet domain.{{signature}}",
    "sell domain":
      "{{salutation}}<br /><br />" +
      "Thank you for your enquiry, but this domain is not for sale.{{signature}}",
    "no ads":
      "{{salutation}}<br /><br />" +
      "Many thanks for your enquiry, but we do not currently carry third party advertisements on our web properties. {{signature}}",
    "no SEO":
      "{{salutation}}<br /><br />" +
      "Many thanks for your enquiry, but we do not require SEO services for our web properties and I would be very grateful if you did not contact me again. {{signature}}",
    "no outsourcing":
      "{{salutation}}<br /><br />" +
      "Many thanks for your enquiry, and offer of a meeting.<br /><br />" +
      "We do not require outsourcing services and I would be very grateful if you did not contact me again.<br /><br />Thank you.{{signature}}",
    "see website":
      "{{salutation}}<br /><br />" +
      "Many thanks for contacting us. <br /><br />" +
      "For more information about our products and services, please refer to our website at {{website}} which contains up-to-date information and pricing where applicable.<br /><br />" +
      "Please, do not hesitate to contact us again if you have further questions.{{signature}}",
    "email confirm":
        "{{salutation}}<br /><br />" +
        "This is to confirm that I have received your email.<br /><br />Many thanks.{{signature}}",
    "read the FAQ":
      "{{salutation}}<br /><br />" +
      "Please refer to our FAQ (Frequently Asked Questions) at {{faq}} where you should be able to find the answer to your question.<br /><br />" +
      "Please feel free to contact us again if you have further questions.{{signature}}",
    "will get back later":
      "{{salutation}}<br /><br />" +
      "Many thanks for your message. <br /><br />Due to other pressing obligations I am unable to reply at present. I will get back to you as soon as possible." +
      "Many thanks for your patience.{{signature}}",
    "enough already":
      "Please remove me from this mailing list and do not contact me again.{{signature}}",
    "info request":
      "{{salutation}}<br /><br />" +
      "Many thanks for contacting us. We appreciate the information.{{signature}}",
    "unsolicited follow-up":
      "{{salutation}}<br /><br />" +
      "Whilst I appreciate your perserverance, please accept the fact that I have not responded to your original unsolicited message as an indication that I am not interested in your offer.<br /><br />" +
      "I would be very grateful if you did not contact me again.{{signature}}",
    "legal disclaimer":
        "{{salutation}}<br /><br />" +
        "Many thanks for your message and legal disclaimer.<br /><br />" +
        "Please note that we have our own legal disclaimer that supercedes and overrides yours. " +
        "Please read it carefully.{{signature}}" +
        "<hr />" +
        "Important Disclaimer:<br />" +
        "By sending an email to ANY of my addresses you are agreeing that: <br />" +
        "1. I am, by definition, \"the intended recipient\".<br />" +
        "2. I may interpret the contents as representing the views of your company or organization.<br />" +
        "3. Whilst it is highly likely that I will instantly and permanently delete your message and all of its attachments, I may decide to keep it for eternity at my discretion.<br />" +
        "4. All information in the email is mine to make such financial profit, political mileage or humour as I see fit.<br />" +
        "5. You understand and accept that I do not need any advice from you or your IT department about the nature of email communication.<br />" +
        "6. This overrides any long-winded disclaimer or statement of confidentiality that may be appended to your message.<br />",
    "feedback":
      "{{salutation}}<br /><br />" +
      "Many thanks for your feedback which helps us prioritize which features will go into the next version.{{signature}}"
};
}

