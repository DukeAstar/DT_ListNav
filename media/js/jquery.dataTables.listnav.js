/*
*
* jQuery listnav plugin
* Author: DukeAstar
*
* Version 0.8 (20/04/2012)
* Requires jQuery 1.7
* Requires DataTables 1.9.0 ( http://datatables.net/ )
* Requires ListNav 2.1 ( http://www.ihwy.com/labs/jquery-listnav-plugin.aspx )
*
*/

(function($) {

	var DT_listnav = function ( oDTSettings)
	{
		var defaults = {
            iIndex: 1,
            sIdList: "lnList"
        };

        $.extend(defaults,oDTSettings.oInit.oListNav);

		var me = this;
		var oDTTable = oDTSettings.oInstance;
		me.$container = $('<div></div>');
		me.$div =$('<div id="'+defaults.sIdList+'-nav"></div>');
		me.$ul= $('<ul id="'+defaults.sIdList+'" class="hide" style="display:none"></ul>');

		me.$container.append(me.$div).append(me.$ul);
		
		/* Callback to add in li and can disabled letters after */
		oDTSettings.aoRowCallback.push( {
			"fn": function(nRow, aData, iDisplayIndex){
				me.$ul.append("<li>"+aData[defaults.iIndex]+"</li>");				
				return nRow;
        	}
		} );

		/* Apply list nav and bind click handler */
		oDTSettings.aoInitComplete.push( {
	            "fn": function () {
	            	$('#'+defaults.sIdList ).listnav({ 
		    			initLetter: 'all', 
		    			includeAll: true, 
		    			includeOther: false, 
		    			flagDisabled: true, 
		    			noMatchText: '', 
		    			showCounts: false, 		    
		    			onClick: function(letter){ 		    	
		    				switch (letter)
					    	{
					    		case "all":
					    			oDTTable.fnFilter("",defaults.iIndex,true,false); 
					    			break;
					    		case "_":
					    			oDTTable.fnFilter("^[0-9]",defaults.iIndex,true,false); 
					    			break;
					    		default:
					    			oDTTable.fnFilter("^"+letter,defaults.iIndex,true,false); 
					    	}		    		
		    			}
		    		});
	            },
	            "sName": "ListNav"
	        } );
	}

	/**
	* Get the container node of the DT_Listnav.
	* 
	* @method
	* @return {Node} The container node.
	*/
	DT_listnav.prototype.getContainer = function() {
		return this.$container.get( 0 );
	}

	/*
	 * Register a new feature with DataTables
	 */
	if ( typeof $.fn.dataTable == "function" &&
	     typeof $.fn.dataTableExt.fnVersionCheck == "function" &&
	     $.fn.dataTableExt.fnVersionCheck('1.9.0') )
	{		
		$.fn.dataTableExt.aoFeatures.push( {
	        
	        "fnInit": function( oDTSettings ) {
	          var oWidgets = new DT_listnav( oDTSettings );
	          return oWidgets.getContainer();
	        },
	        
			"cFeature": "Z",
	        "sFeature": "ListNav"
		} );
	}
	else
	{
		 alert( "Warning: ListNav requires DataTables 1.9.0 or greater - www.datatables.net/download");
	}

}(jQuery));

