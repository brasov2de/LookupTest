import * as React from 'react';
import { Label, Button } from '@fluentui/react';
import { ButtonGlobalClassNames } from '@fluentui/react/lib/components/Button/BaseButton.classNames';

export interface IHelloWorldProps {
  myLookup: ComponentFramework.PropertyTypes.LookupProperty;
  utils: ComponentFramework.Utility;
}

export function HelloWorld({ myLookup, utils}: IHelloWorldProps): JSX.Element {
  const [defaultEntityType, setDefaultEntityType] = React.useState((myLookup as any)?.getTargetEntityType());  
  const [viewId, setViewId] = React.useState((myLookup as any)?.getViewId());
  const [viewIds, setViewIds] = React.useState((myLookup as any).availableViewIds?.split(","));
  const onClick = () => {  
      /* (context.parameters.sampleProperty as any).runPreSearch();
       console.log("after presearch 1", context.parameters.sampleProperty);*/
       /*
      const viewIds = lookup1.enableViewPicker === true //more views possible
                ? lookup1.availableViewIds == null //View Selector was "All Views"
                  ? lookup1.getAllViews() //or similar
                : Promise.resolve(lookup1.availableViewIds.split(",")) //thge selected views were defined
              : undefined; //else the user shouldn't be able to change the view		
      */
      utils.lookupObjects({
        allowMultiSelect: false, 
        defaultEntityType: defaultEntityType, 
        defaultViewId: viewId, 
        entityTypes: [defaultEntityType], 
        viewIds: viewIds
      })
      .then(console.log)
      .catch(console.error);
  }

  const openRecord =  () => {
		  if (myLookup.raw?.length > 0){
		 		(myLookup as any).openDatasetItem(myLookup.raw[0]);
		  }
	  }

  return (
    <div>
      <Button onClick={onClick}>Open lookup</Button>
      <Button onClick={openRecord}>Open Record</Button>
      <Button onClick={()=>{
        (myLookup as any).refresh()
        }}>getData</Button>
      <span>{myLookup.raw[0].name}</span>
    </div>
  ); 
}
