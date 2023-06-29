import { IInputs, IOutputs } from './generated/ManifestTypes'
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class LookupTest implements ComponentFramework.ReactControl<IInputs, IOutputs>  {
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

	private logMe(lookup1: ComponentFramework.PropertyTypes.LookupProperty){
		// eslint-disable-next-line dot-location	

		console.group();
		console.log("value 1", lookup1.raw, lookup1.raw);			
		this.defaultEntityType = lookup1.getTargetEntityType();
		this.entityTypes = [this.defaultEntityType];
		this.viewId = lookup1.getViewId();

		this.viewIds = (lookup1 as any).availableViewIds?.split(",");

		
		console.log("metadata.Targets", (lookup1 as any).attributes.Targets);		
		
		console.log(`Lookup configuration:`, (lookup1 as any).getLookupConfiguration(), (lookup1 as any).getLookupConfiguration());
		console.group("1. Display Search Box")		
		console.log("disableQuickFind: ", (lookup1 as any).disableQuickFind, (lookup1 as any).disableQuickFind);
		console.groupEnd();
		console.group("2. View Selector");
		console.log("enableViewPicker: ", (lookup1 as any).enableViewPicker, (lookup1 as any).enableViewPicker); 
		console.groupEnd();
		console.group("3. Display Views");
		console.log("availableViewIds: ", (lookup1 as any).availableViewIds, (lookup1 as any).availableViewIds); 
		console.log("availableViewNames: ", (lookup1 as any).availableViewNames, (lookup1 as any).availableViewNames); 
		console.groupEnd();
		console.group("4. DefaultView");
		console.log("getDefaultViewId: ", (lookup1 as any).getDefaultViewId(), (lookup1 as any).getDefaultViewId()); 
		console.log("getTitle: ", (lookup1 as any).getTitle(), (lookup1 as any).getTitle()); 
		console.groupEnd();
		console.group("5. Filter on Related Lookup");
		console.log("filterRelationshipName: ", (lookup1 as any).filterRelationshipName, (lookup1 as any).filterRelationshipName); 
		console.log("dependentAttributeName: ", (lookup1 as any).dependentAttributeName, (lookup1 as any).dependentAttributeName); 		
		console.log("dependentAttributeType: ", (lookup1 as any).dependentAttributeType, (lookup1 as any).dependentAttributeType); 
		console.groupEnd()
		console.group("6. Users can turn off filter")		
		console.log("allowFilterOff: ", (lookup1 as any).allowFilterOff, (lookup1 as any).allowFilterOff);
		console.groupEnd();		

		console.group("7. Display Records from lookup view");
		(lookup1 as any).sortedRecordIds.forEach((id: string, index: number) => {
			console.log( (lookup1 as any).records[id].getValue( (lookup1 as any).columns[0].name));
		});
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
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView (context: ComponentFramework.Context<IInputs>): React.ReactElement {	  	  	  
		this.logMe(context.parameters.sampleProperty as any);
		
		const props: IHelloWorldProps = { myLookup: context.parameters.sampleProperty, utils: context.utils };
        return React.createElement(
            HelloWorld, props
        );
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
