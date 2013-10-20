DT_ListNav
==========

Integration of ListNav JQuery plugin into Datatables

Third Parties :
  
  - DataTables © Allan Jardine 2010 ( http://datatables.net )

Options
=======

Options are specified as a DataTables option, in an object called `oListNav`:

	var oTable = $('#example').dataTable( {
		"sDom": 'Zlfrtip',
		"oListNav": {
			iIndex: 1,
            sIdList: "lnList",
            sWrapperClass : null,
            fRetreiveFirstLetters : null,
            sAllWord : 'All',
            sLetterClass : "btn abcdaire",
            sLetterDisabledClass : "btn abcdaire disabled"
		}
	} );
	
	
The possible options are:

 * `iIndex` - index on which the filter is applied ( it starts at 0) .
 * `sIdList` - id for div of listnav.
 * `sWrapperClass` - class for wrapper container.
 * `fRetreiveFirstLetters` - function which return an array with first letters use with bServerSide  = true.
 * `sAllWord` - Translate the 'all' word in your language if you need.
 * `sLetterClass` - class used for letters.
 * `sLetterDisabledClass` - class used for letters not found.

Contributing
============

[Github](https://github.com/DukeAstar/DT_Listnav) offers ways to contribute code, write documentation, submit issues, suggest features, etc. Go !

License
=======

DT_ListNav is released with dual licensing, using the GPL v2 (http://www.gnu.org/licenses/gpl.html) and the MIT license (http://www.opensource.org/licenses/mit-license.php). Please see the corresponding license file for details of these licenses. You are free to use, modify and distribute this software, but all copyright information must remain.
