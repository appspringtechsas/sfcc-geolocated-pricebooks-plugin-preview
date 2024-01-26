'use strict';
/**
 * Renders a modal window that will track the users consenting to accepting site tracking policy
 */

var pricebookSelectionType = require('./helpers/PriceBookSelectionType');
var priceBookByRegion =  require('./helpers/PriceBookByRegion');
var priceBookByStore = require('./helpers/PriceBookByStore');

var actions = require('./helpers/ActionsModal');

var urlGetLocation = $("#container-select").data("isauthenticated")

module.exports = {
    main: () => {
        actions.getUserRegion(urlGetLocation)
        priceBookByStore.addScriptGoogleMaps()
        
        let textDescription = actions.getLocationLocalStorage()
        
        $("#text-btn-modal-select").addClass("d-none")
        $("#text-btn-delivery-select").removeClass("d-none")
        $("#current-location").text(textDescription)
    },

    showLocationByType: async() => {
        var { type, showMap, search  } = await pricebookSelectionType.getSelectionByType()

        if( type && type === 'byregion' ){

            priceBookByRegion.getAllRegions()
            priceBookByRegion.handlerOnChange()
            priceBookByRegion.saveLocationUser()
            
        }else if( type && type === 'bystore' ){
            
            if(!showMap){
                $("#map").addClass("d-none")
                $("#infowindow-content").addClass("d-none")
            }

            var getLocale = await priceBookByStore.getAllRegions()

            if(getLocale){
                var codeCountry = $("#region-lvl-1").val()
                let nameCountry = $("#region-lvl-1 option:selected" ).text();
                $("#container-google-map").removeClass("d-none")
                let coords = {
                    codeCountry, nameCountry
                }

                window.initMap = priceBookByStore.initMap(codeCountry, search.zipcodes, coords)
            }else{ 

                $("#region-lvl-1").change(() => {
                    $('div.pac-container').remove()
                    var codeCountry = $("#region-lvl-1").val()
                    let nameCountry = $("#region-lvl-1 option:selected" ).text();
                    $("#container-google-map").removeClass("d-none")
                    let coords = {
                        codeCountry, nameCountry
                    }
                    
                    window.initMap = priceBookByStore.initMap(codeCountry, search.zipcodes, coords)
                })
            }
            priceBookByStore.saveLocationUser()
        }
    },
}

