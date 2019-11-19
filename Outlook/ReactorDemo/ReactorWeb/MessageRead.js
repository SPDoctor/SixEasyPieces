/// <reference path="/Scripts/FabricUI/MessageBanner.js" />

(function () {
  "use strict";

  var messageBanner;
  var templates, strings;
  var hasrun;
  var response;
  var regexOpenAnchorTag = /<a(|\s+[^>]+)>/ig;
  var regexCloseAnchorTag = /<\/?a>/ig;

  // The Office initialize function must be run each time a new page is loaded.
  Office.initialize = function (reason) {
    $(document).ready(function () {
      strings = flosim.reactor.getDefaultStrings();
      try {
        strings["name"] = Office.context.mailbox.userProfile.displayName; // default value
        var savedStrings = JSON.parse(Office.context.roamingSettings.get("strings"));
      } catch (ex) { } // swallow exception
      if (savedStrings) strings = savedStrings;
      templates = flosim.reactor.getDefaultTemplates();
      try {
        var savedTemplates = JSON.parse(Office.context.roamingSettings.get("templates"));
      } catch (ex) { } // swallow exception
      if (savedTemplates) templates = savedTemplates;
      configureTemplateSelector("#templates");
      configureTemplateSelector("#templatesEdit");
      displayOptions();
      var element = document.querySelector('.ms-MessageBanner');
      messageBanner = new fabric.MessageBanner(element);
      messageBanner.hideBanner();
      try {
        var CheckBoxElements = document.querySelectorAll(".ms-CheckBox");
        for (var i = 0; i < CheckBoxElements.length; i++) {
          new fabric['CheckBox'](CheckBoxElements[i]);
        }
        // has this been run before?
        var hasrun = Office.context.roamingSettings.get("hasrun");
        if (!hasrun) {
          // show help panel
          $("#message-panel").hide();
          $("#about-panel").hide();
          $("#help-panel").show();
          $("#response").hide();
          hasrun = true;
          Office.context.roamingSettings.set("hasrun", JSON.stringify(hasrun));
          Office.context.roamingSettings.saveAsync(function () { });
        }
      } catch (ex) { } // swallow exception
    });
  };

  function displayOptions() {
    try {
      var item = Office.context.mailbox.item;
      var template = flosim.reactor.chooseTemplate(item.subject);
      if (item.body !== undefined) {
        try {
          item.body.getAsync("text", analyzeBody);
        } catch (ex) {
          if (ex.name == "Sys.ArgumentException") {
            // try old version of getAsync API
            try {
              item.body.getAsync(analyzeBody);
            } catch (exx) { }
          }
        } // swallow exception if we can't get at message body for any reason
      }
    } catch (ex) { } // swallow exception if we can't get at message body for any reason

    response = composeMessage(template);
    $('#response').html(disableLinks(response));

    $('#respond').click(function (evt) {
      var foo = evt;
      var item = Office.context.mailbox.item;
      var ad = "Sent using <a href=\"https://store.office.com/reactor-WA104379506.aspx\">Email Reactor</a>";
      item.displayReplyForm("<html><head><head><body>" + response + ad + "</body></html>");
    });

    $('#home').click(function () {
      $("#message-panel").show();
      $("#about-panel").hide();
      $("#help-panel").hide();
      $("#response").show();
      messageBanner.hideBanner();
    });

    $('#about').click(function () {
      $("#message-panel").hide();
      $("#about-panel").show();
      $("#help-panel").hide();
      $("#response").hide();
      messageBanner.hideBanner();
    });

    $('#help').click(function () {
      $("#message-panel").hide();
      $("#about-panel").hide();
      $("#help-panel").show();
      $("#response").hide();
      messageBanner.hideBanner();
    });

    $('#templates').change(function () {
      response = composeMessage(this.value);
      $('#response').html(disableLinks(response));
    });

  }

  function analyzeBody(bodyElement) {
    var item = Office.context.mailbox.item;
    var body = bodyElement.value;
    body = body.replace(/Sent from my Windows (\d+ )?Phone/i, "");
    body = body.trim();

    //if (item.subject.indexOf("Reactor-template:") == 0) { // message is used to create new template
    //  var templateName = item.subject.replace("Flosim-Reactor:", "");
    //  if (templateName) {
    //    createNewTemplate(templateName, body);
    //    return;
    //  }
    //}
    var template = flosim.reactor.chooseTemplate(item.subject, body);
    response = composeMessage(template);
    $('#response').html(disableLinks(response));
  }

  function composeMessage(template) {
    if (!template) template = "default";
    var message = "";
    try {
      message = templates[template];
      if (!message) {
        write("Couldn't map message template '" + template);
        return "";
      }
    }
    catch (ex) {
      write("Couldn't map message template '" + template + "' - " + ex.message);
      return "";
    }
    $('#templates').val(template);
    message = substituteStrings(message);
    return message;
  }

  function disableLinks(text) {
    var sanitizedText = text.replace(regexOpenAnchorTag, "<span class=\"ms-fontColor-themePrimary fake-link\">");
    sanitizedText = sanitizedText.replace(regexCloseAnchorTag, "</span>");
    return sanitizedText;
  }

  function substituteStrings(message) {
    message = message.replace("{{signature}}", strings["signature"]); // do first - allows for further substitutions
    // TODO: need to iterate here
    message = message.replace(/{{name}}/g, strings["name"]);
    message = message.replace(/{{title}}/g, strings["title"]);
    message = message.replace(/{{company}}/g, strings["company"]);
    message = message.replace(/{{product}}/g, strings["product"]);
    message = message.replace(/{{website}}/g, strings["website"]);
    message = message.replace(/{{faq}}/g, strings["faq"]);
    message = message.replace(/{{twitter}}/g, strings["twitter"]);
    message = message.replace(/{{mobile}}/g, strings["mobile"]);
    message = message.replace(/{{salutation}}/g, strings["salutation"]);

    try {
      var item = Office.context.mailbox.item;
      if (message.indexOf("{{senderEmail}}") !== -1) message = message.replace("{{senderEmail}}", Office.context.mailbox.item.sender.emailAddress);
      if (message.indexOf("{{senderName}}") !== -1) message = message.replace("{{senderName}}", item.sender.displayName);
      if (message.indexOf("{{subject}}") !== -1) message = message.replace("{{subject}}", item.normalizedSubject);
      if (message.indexOf("{{messageID}}") !== -1) message = message.replace("{{messageID}}", item.internetMessageId);
      if (message.indexOf("{{dateCreated}}") !== -1) message = message.replace("{{dateCreated}}", item.dateTimeCreated);
      if (message.indexOf("{{conversationID}}") !== -1) message = message.replace("{{conversationID}}", item.conversationId);
      if (message.indexOf("{{recipientEmail}}") !== -1) message = message.replace("{{toEmail}}", item.to[0].emailAddress);
      if (message.indexOf("{{myName}}") !== -1) message = message.replace("{{myName}}", Office.context.mailbox.userProfile.displayName);
      if (message.indexOf("{{myEmail}}") !== -1) message = message.replace("{{myEmail}}", Office.context.mailbox.userProfile.emailAddress);
      var subject = "Re: " + item.subject;
      var from = item.from;
    } catch (ex) { } // swallow exceptions
    return message;
  }

  function configureTemplateSelector(selector) {
    $(selector).empty();
    for (var key in templates) {
      $(selector).append($('<option>', {
        "value": key,
        "text": key
      }));
    }
  }

  function configureStringSelector() {
    $('#strings').empty();
    for (var key in strings) {
      $('#strings').append($('<option>', {
        "value": key,
        "text": key
      }));
    }
  }

  function write(message) {
    showNotification("Warning", message);
  }

  function createTemplate(name, body) {
    showNotification("Success", "Template '" + templateName + "' created.");
  }

  // Helper function for displaying notifications
  function showNotification(header, content) {
    $("#notificationHeader").text(header);
    $("#notificationBody").text(content);
    messageBanner.showBanner();
    messageBanner.toggleExpansion();
  }

  // if not running in context of Office app, run initialize to test in browser
  //try {
  //  if (!sessionStorage.getItem('hostInfoValue')) {
  //    Office.initialize();
  //  }
  //} catch (ex) { }

})();