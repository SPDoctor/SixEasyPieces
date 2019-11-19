# Six Easy Pieces
Sample code for one-day workshop.

## Modules

* SharePoint Site Designs 
* Actionable Messages and Adaptive Cards 
* Excel, Word, PowerPoint Add-ins 
* Outlook Add-ins 
* SPFx Extensions 
* Teams Tabs (and Bots)

## Toolchain Setup

### Office Developer Program

You should get a free Office 365 developer program account if you don't already have one. First, you can go to [outlook.com](http://outlook.com/) (you may need to use an in-private browser window if you already have a logged-in Microsoft Account). Sign up for a new Microsoft account, which you will use to create the developer account. You can use any email for the Office 365 account, but if you use your own email you probably won't be able to use it later to create a production tenant. With the Microsoft Account created, go to the [Office 365 developer program sign-up page](https://developer.microsoft.com/en-us/office/dev-program) and use sign up for the program and provide a phone number for verification. This will provision an Office 365 developer tenant that you can use to learn about Office 365 development or to use as a test tenant. The tenant will last for 12 months, or longer if you continue using it for development.

### Install NodeJS on your computer

Go to the [NodeJS installation page](https://nodejs.org/). Generally-speaking you can click on the link to install the LTS version, but at the time of writing some of the tools we will be using (e.g. SharePoint Framework) have not caught up to this version, and I recommend installing version 10.16. Follow the "other downloads" link and then "previous releases" and on the [Previous Releases page](https://nodejs.org/en/download/releases/) scroll down the list and choose the [Node.js 10.16.3 Downloads link](https://nodejs.org/download/release/v10.16.3/) and then download the [x64 msi installer](https://nodejs.org/download/release/v10.16.3/node-v10.16.3-x64.msi). 

The installation will only take a couple of minutes. You can check it has all worked by opening a command window (e.g. PowerShell) and running the command:

```
node --version
```

### Install Gulp and Yeoman

From a command window run the command:

```
npm install -g gulp yo
```

### Install Git Source Control

Go to the site [git-scm.com](git-scm.com) and install the Git command line tool. If you are using a Windows machine then the link [
Download 2.24.0 for Windows](https://git-scm.com/download/win) (or later version) should appear. Once you have downloaded the installer you can verify that you have Git installed with the command:

```
git --version
```

### Install Visual Studio Code

Go to the [Visual Studio Code site](https://code.visualstudio.com/) and use the Download for Windows link that appears if you are using a Windows machine, and download and run the installer. Installation will take a few minutes at most.

### Install Yeoman generators

We will be using a few Yeoman generators during the day. You can install them as needed, or do so now:

```
npm install -g @microsoft/generator-sharepoint
npm install -g generator-teams
npm install -g generator-office
```


