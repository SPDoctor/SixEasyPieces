import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import {
  BaseApplicationCustomizer, 
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'HelloExtApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HelloExtApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloExtApplicationCustomizerProperties {
  testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloExtApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloExtApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);
    // Wait for the placeholders to be created (or handle them being changed) and then render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  
  private _renderPlaceHolders(): void {
    if (!this["_topPlaceholder"]) {
      this["_topPlaceholder"] = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this["_topPlaceholder"]) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = "(Top property was not defined.)";
        }

        if (this["_topPlaceholder"].domElement) {
          this["_topPlaceholder"].domElement.innerHTML = `
                <div>
                  <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> This is the top placeholder!
                </div>`;
        }
      }
    }
  }

  private _onDispose(): void {
    console.log('[HelloExtApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }

}
