package com.sensia.swetools.editors.sensorml.client.listeners;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.ListBox;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;

public class LoadButtonClickListener implements ClickHandler{

	private ListBox profileListBox;
	private RNGProcessorSML sgmlEditorProcessor;
	
	public LoadButtonClickListener(final ListBox profileListBox,final RNGProcessorSML sgmlEditorProcessor) {
		this.profileListBox = profileListBox;
		this.sgmlEditorProcessor = sgmlEditorProcessor;
	}
	
	@Override
	public void onClick(ClickEvent event) {
		String value = profileListBox.getValue(profileListBox.getSelectedIndex());
		if(value != null && !value.isEmpty()){
			final String url = "rng1.0/profiles/CSM/"+value+".rng";
			sgmlEditorProcessor.parse(url);
		}
	}

}
