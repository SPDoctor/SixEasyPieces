import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloTeamsWebPart.module.scss';
import * as strings from 'HelloTeamsWebPartStrings';
import * as microsoftTeams from '@microsoft/teams-js';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MSGraph from '@microsoft/microsoft-graph-types';

export interface IHelloTeamsWebPartProps {
  description: string;
}

export default class HelloTeamsWebPart extends BaseClientSideWebPart<IHelloTeamsWebPartProps> {
  private _teamsContext: microsoftTeams.Context;

  protected onInit(): Promise<any> {
    let retVal: Promise<any> = Promise.resolve();
    if (this.context.microsoftTeams) {
      retVal = new Promise((resolve, reject) => {
        this.context.microsoftTeams.getContext(context => {
          this._teamsContext = context;
          resolve();
        });
      });
    }
    return retVal;
  }

  public render(): void {

    let title: string = '';
    let subTitle: string = '';
    let siteTabTitle: string = '';

    if (this._teamsContext) {
      // We have teams context for the web part
      title = "Welcome to Teams!";
      subTitle = "Building custom enterprise tabs for your business (v4).";
      siteTabTitle = "We are in the context of following Team: " + this._teamsContext.teamName 
        + " and we are in the context of following site: " + this.context.pageContext.web.title;
    }
    else {
      // We are rendered in normal SharePoint context
      title = "Welcome to SharePoint!";
      subTitle = "Customize SharePoint experiences using Web Parts (v4).";
      siteTabTitle = "We are in the context of following site: " + this.context.pageContext.web.title;
    }

    this.domElement.innerHTML = `
    <div class="${ styles.helloTeams}">
      <div class="${ styles.container}">
        <div class="${ styles.row}">
          <div class="${ styles.column}">
            <span class="${ styles.title}">${title}</span>
            <p class="${ styles.subTitle}">${subTitle}</p>
            <p class="${ styles.description}">${siteTabTitle}</p>
            <p class="${ styles.description}">Description property value - ${escape(this.properties.description)}</p>
            <a href="https://aka.ms/spfx" class="${ styles.button}">
              <span class="${ styles.label}">Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>`;

    this.context.msGraphClientFactory.getClient().then((client: MSGraphClient) => {
      client.api('/me').get((err, res) => {
        this.domElement.innerHTML = "<h1>Hello " + res.displayName + " (v4)</h1>";
      });
    });

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
