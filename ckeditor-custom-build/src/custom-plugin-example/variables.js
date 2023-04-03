import { Plugin } from '@ckeditor/ckeditor5-core'
import { Model, createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui'
import { Collection } from '@ckeditor/ckeditor5-utils';

export default class Variables extends Plugin {
	init() {
		console.log('Variables Plugin Initialized');
		const editor = this.editor;
        // The button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'templateVariables', (locale) => {
            // The dropdown will be an instance of ButtonView.
            const dropdownView = createDropdown( locale );

			const templateVariables = {
				'Nome da Empresa': '[[business_name]]',
				'CNPJ da Empresa': '[[business_cnpj]]',
			}

			//add a list to dropdown click
			addListToDropdown( dropdownView, () => this._prepareListOptions( templateVariables ) );

            // Create dropdown model.
			dropdownView.buttonView.set( {
				label: 'Variáveis',
				withText: true,
				tooltip: true
			} );

			//Execute command when an item from the dropdown is selected.
			this.listenTo( dropdownView, 'execute', evt => {
				console.log('dropdown event', evt);
				
				// Change the model using the model writer.
                editor.model.change( writer => {

                    // Insert the text at the user's current position.
                    editor.model.insertContent( writer.createText( templateVariables[evt.source.label] ) );
                } );
			} );

            return dropdownView;
        } );
	}

	_prepareListOptions(templateVariables) {
		const options = new Collection();
		for(const key in templateVariables) {
			const model = new Model({
				type: 'button',
				model: new Model( {
					withText: true,
					label: key,
				} )
			});
			options.add(model);
		}
		return options;
	}
}