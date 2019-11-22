# Teams

## Hello Teams sample

To build the HelloTeams sample, go to the HelloTeams directory and run the command:

```
npm install
gulp serve
```

to test in the local workbench. Note that the message says that it is running in SharePoint and gives the location as localhost.

To deploy to Teams, package the solution:

```
gulp bundle --ship
gulp package-solution --ship
```

Then drop the .sppkg file in the "sharepoint/solution" directory onto your SharePoint App Catalog (note that you may need to create the App Catalog in your tenant). Choose to deploy tenant-wide.

Select the package in the catalog and in the Files ribbon, click on the Sync to SharePoint icon.

Now when you open Teams you should be able to add the web part as a Teams tab.

