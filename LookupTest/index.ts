/* eslint-disable quotes */
/* eslint-disable space-before-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import { LookupAllOptions } from 'dns';
import { IInputs, IOutputs } from './generated/ManifestTypes'

export class LookupTest implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private val: any[] = [];
	private container:HTMLDivElement;
	private content: HTMLSpanElement;

	private defaultEntityType : string;
	private viewId : string;
	private entityTypes : string[];
	private viewIds : string[];
	

	/**
	 * Empty constructor.
	 */
	// eslint-disable-next-line no-useless-constructor
	constructor () {

	}

	private logMe(lookup1: ComponentFramework.PropertyTypes.LookupProperty, lookup2: ComponentFramework.PropertyTypes.LookupProperty){
		// eslint-disable-next-line dot-location	

		console.group();
		console.log("value 1", lookup1.raw, lookup2.raw);	
		this.content.innerText = lookup1.raw?.length > 0 ? lookup1.raw[0].name ?? "" : "---";
		this.defaultEntityType = lookup1.getTargetEntityType();
		this.entityTypes = [this.defaultEntityType];
		this.viewId = lookup1.getViewId();

		this.viewIds = (lookup1 as any).availableViewIds.split(",");

		
		console.log("metadata.Targets", (lookup1 as any).attributes.Targets);

		
		console.log(`Lookup configuration:`, (lookup1 as any).getLookupConfiguration(), (lookup2 as any).getLookupConfiguration());
		console.group("1. Display Search Box")		
		console.log("disableQuickFind: ", (lookup1 as any).disableQuickFind, (lookup2 as any).disableQuickFind);
		console.groupEnd();
		console.group("2. View Selector");
		console.log("enableViewPicker: ", (lookup1 as any).enableViewPicker, (lookup2 as any).enableViewPicker); 
		console.groupEnd();
		console.group("3. Display Views");
		console.log("availableViewIds: ", (lookup1 as any).availableViewIds, (lookup2 as any).availableViewIds); 
		console.log("availableViewNames: ", (lookup1 as any).availableViewNames, (lookup2 as any).availableViewNames); 
		console.groupEnd();
		console.group("4. DefaultView");
		console.log("getDefaultViewId: ", (lookup1 as any).getDefaultViewId(), (lookup2 as any).getDefaultViewId()); 
		console.log("getTitle: ", (lookup1 as any).getTitle(), (lookup2 as any).getTitle()); 
		console.groupEnd();
		console.group("5. Filter on Related Lookup");
		console.log("filterRelationshipName: ", (lookup1 as any).filterRelationshipName, (lookup2 as any).filterRelationshipName); 
		console.log("dependentAttributeName: ", (lookup1 as any).dependentAttributeName, (lookup2 as any).dependentAttributeName); 		
		console.log("dependentAttributeType: ", (lookup1 as any).dependentAttributeType, (lookup2 as any).dependentAttributeType); 
		console.groupEnd()
		console.group("6. Users can turn off filter")		
		console.log("allowFilterOff: ", (lookup1 as any).allowFilterOff, (lookup2 as any).allowFilterOff);
		console.groupEnd();		
		console.groupEnd();
	}
	

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init (context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void {
	  this.container = container;
	  const button = document.createElement('button');
	  button.textContent = 'Open';
	  button.addEventListener('click', () => {
		/* (context.parameters.sampleProperty as any).runPreSearch();
		 console.log("after presearch 1", context.parameters.sampleProperty);*/
		 /*
	  const viewIds = lookup1.enableViewPicker === true //more views possible
	  					? lookup1.availableViewIds == null //View Selector was "All Views"
	  						? lookup1.getAllViews() //or similar
							: Promise.resolve(lookup1.availableViewIds.split(",")) //thge selected views were defined
						: undefined; //else the user shouldn't be able to change the view		
		*/
		context.utils.lookupObjects({
			allowMultiSelect: false, 
			defaultEntityType: this.defaultEntityType, 
			defaultViewId: this.viewId, 
			entityTypes: this.entityTypes, 
			viewIds: this.viewIds
		})
		.then((values) => {
			if (values?.length>0){
				this.val = values;
				notifyOutputChanged()
			}
			// otherwise the "Cancel" button was clicked
		})
		.catch(console.error);
	  });


	  container.appendChild(button);
	  const button1 = document.createElement('button');
	  button1.textContent = 'openRecord';
	  button1.addEventListener('click', () => {
		  if (context.parameters.sampleProperty.raw?.length > 0){
		 		(context.parameters.sampleProperty as any).openDatasetItem(context.parameters.sampleProperty.raw[0]);
		  }
	  });
	  container.appendChild(button1);

	  this.content = document.createElement('span');
	  this.content.textContent = context.parameters.sampleProperty?.raw?.name;
	  container.appendChild(this.content);
	  this.logMe(context.parameters.sampleProperty as any, context.parameters.secondProperty as any);	  
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView (context: ComponentFramework.Context<IInputs>): void {	  	  	  
		this.logMe(context.parameters.sampleProperty as any, context.parameters.secondProperty as any);
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs (): IOutputs {
	  return { sampleProperty: this.val }
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy (): void {
	  // Add code to cleanup control if necessary
	}
}
