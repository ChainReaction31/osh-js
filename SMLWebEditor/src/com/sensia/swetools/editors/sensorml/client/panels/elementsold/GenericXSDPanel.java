package com.sensia.swetools.editors.sensorml.client.panels.elementsold;

import com.google.gwt.event.dom.client.ChangeEvent;
import com.google.gwt.event.dom.client.ChangeHandler;
import com.google.gwt.event.dom.client.DoubleClickEvent;
import com.google.gwt.event.dom.client.DoubleClickHandler;
import com.google.gwt.event.dom.client.KeyPressEvent;
import com.google.gwt.event.dom.client.KeyPressHandler;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;
import com.google.gwt.user.client.ui.TextArea;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.TextBoxBase;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGData;

public class GenericXSDPanel extends AbstractSensorMLPanel{

	private static final String CSS_CLASS = "";
	
	private TextBoxBase textBox;
	
	public GenericXSDPanel(final RNGData<?> data, final int length, final String allowedChars) {
		super();
		setName("");
        
        if (length < 0)
        {
            textBox = new TextBox();
            ((TextBox)textBox).setVisibleLength(50);
        }
        else if (length <= 60)
        {
            textBox = new TextBox();
            ((TextBox)textBox).setVisibleLength(length);
            ((TextBox)textBox).setMaxLength(length);
        }
        else
        {
            textBox = new TextArea();
            ((TextArea)textBox).setVisibleLines(length/50);
        }
        
        // put saved value in text box
        if (data.getValue() != null)
        {
            textBox.setText(data.getValue().toString());
            if (data.isConfirmed())
                textBox.setReadOnly(true);
        }
        
        // double click handler for changing after confirm
        textBox.addDoubleClickHandler(new DoubleClickHandler() {
            @Override
            public void onDoubleClick(DoubleClickEvent event)
            {
                data.setConfirmed(false);
                textBox.setReadOnly(false);
            }
        });
        
        // validating keypress handler
        textBox.addKeyPressHandler(new KeyPressHandler() {
            @Override
            public void onKeyPress(KeyPressEvent event)
            {
                char c = event.getCharCode();
                if (c <= 13)
                    return;
                
                // check what was just typed                
                if ((allowedChars != null && allowedChars.indexOf(c) < 0))
                {
                    textBox.cancelKey();
                    return;
                }
            }
        });
        
        // validating keyup handler
        textBox.addKeyUpHandler(new KeyUpHandler() {
            @Override
            public void onKeyUp(KeyUpEvent event)
            {
                if (data.isValid(textBox.getText()))
                {
                    textBox.removeStyleName("invalid-value");
                    textBox.addStyleName("valid-value");
                    data.setStringValue(textBox.getText());
                }
                else
                {
                    textBox.removeStyleName("valid-value");
                    textBox.addStyleName("invalid-value");
                }
            }
        });
        
        // validating change handler
        textBox.addChangeHandler(new ChangeHandler() {
            @Override
            public void onChange(ChangeEvent event)
            {
                if (data.isValid(textBox.getText()))
                {
                    data.setConfirmed(true);                    
                    textBox.removeStyleName("valid-value");
                    textBox.removeStyleName("invalid-value");
                    textBox.setReadOnly(true);
                }
            }        
        });
		//textBox.addStyleName(CSS_CLASS);
	}

	@Override
	public Widget getWidget() {
		return textBox;
	}
}