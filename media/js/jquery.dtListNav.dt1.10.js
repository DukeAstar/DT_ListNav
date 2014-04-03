(function($) {

	var dt_abcdaire = function ( oDTSettings)
	{
		var defaults = {
            iIndex: 1,
            sIdList: null,
            sWrapperClass : null,
            fRetreiveFirstLetters : null,
            sAllWord : 'All',
            sLetterClass : "btn abcdaire",
            sLetterDisabledClass : "btn abcdaire disabled"
        };

        $.extend(defaults,oDTSettings.oInit.oListNav);

		var me = this;
		var oDTTable = oDTSettings.oInstance;
		me.$container = $('<div class="btn-group"></div>');
        
        if(defaults.sIdList)
            me.$container.attr('id',defaults.sIdList);
        
        if(defaults.sWrapperClass)
            me.$container.addClass(defaults.sWrapperClass);

		var charCodeRange = {
			start: 65,
			end: 90
		};

		me.$container.append('<button data-letter="all" class="' + defaults.sLetterClass + '">'+ defaults.sAllWord +'</button>');
		me.$container.append('<button data-letter="_" class="' + defaults.sLetterDisabledClass + '">0-9</button>');

		for (var cc = charCodeRange.start; cc <= charCodeRange.end; cc++) {
			var letter=String.fromCharCode(cc);
			me.$container.append('<button data-letter='+letter+' class="' + defaults.sLetterDisabledClass + '">'+letter+'</button>');
		}

		oDTSettings.aoInitComplete.push( {
        
            "fn": function () {
                if(oDTSettings.oFeatures.bServerSide === false)
                {
                    var anNodes = oDTTable.oApi._fnGetTrNodes( oDTSettings );
                    $("td:nth-child("+(defaults.iIndex+1) + ")",anNodes).each(function(){
                        var l =$(this).text()[0].toUpperCase();
                        if(isNaN(l))
                            $('button[data-letter='+l+']',me.$container).removeClass('disabled');
                        else
                            $('button[data-letter="_"]',me.$container).removeClass('disabled');
                    });
                }
                else if(typeof defaults.fRetreiveFirstLetters == "function" )
                {
                    $.each(defaults.fRetreiveFirstLetters(oDTSettings),function(){
                        var l =this[0].toUpperCase();
                        if(isNaN(l))
                            $('button[data-letter="'+l+'"]',me.$container).removeClass('disabled');
                        else
                            $('button[data-letter="_"]',me.$container).removeClass('disabled');
                    });
                }
            },
            "sName": "ListNav"
        } );

        $('button',me.$container).bind('click.DT',function(e){
            var me = $(this);
			me.addClass("active").siblings().removeClass("active");
			var letter = $(this).data('letter');

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
            return false;
        });

	};

	dt_abcdaire.prototype.getContainer = function() {
		return this.$container.get( 0 );
	};

	/*
	 * Register a new feature with DataTables
	 */
	if ( typeof $.fn.dataTable == "function" &&
        typeof $.fn.dataTableExt.fnVersionCheck == "function" &&
        $.fn.dataTableExt.fnVersionCheck('1.9.0') )
	{		
		$.fn.dataTableExt.aoFeatures.push( 
        {
            "fnInit": function( oDTSettings ) {
                var oWidgets = new dt_abcdaire( oDTSettings );
                return oWidgets.getContainer();
            },
			"cFeature": "Z",
            "sFeature": "dt_abcdaire"
		} );
	}
	else
	{
        alert( "Warning: Additionals Plugins requires DataTables 1.9.0 or greater - www.datatables.net/download");
	}

}(jQuery));
