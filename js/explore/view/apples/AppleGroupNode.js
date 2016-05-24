// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // images
  var coinImage = require( 'image!PROPORTION_PLAYGROUND/coin.png' );

  // constants
  var appleScale = 0.35;
  var coinScale = 0.7;

  function AppleGroupNode( appleGroupModel, appleImage, showCostPerAppleProperty ) {
    var appleLayer = new Node( { y: 320 } );// TODO: factor out y
    var coinLayer = new Node( { y: 320 } );
    var priceTagLayer = new Node( { x: -140, y: 120 } );
    Node.call( this, {
      children: [ coinLayer, appleLayer, priceTagLayer ]
    } );
    showCostPerAppleProperty.link( function( showCostPerApple ) {
      priceTagLayer.visible = showCostPerApple;
    } );
    appleGroupModel.numberOfApplesProperty.link( function() {
      var appleArray = [];
      var x = 0;
      var y = 0;
      for ( var i = 0; i < appleGroupModel.numberOfApples; i++ ) {
        var image = new Image( appleImage, { scale: appleScale, x: x, y: y } );
        appleArray.unshift( image ); // prepend to get z-order correct
        x = image.right;
        if ( x >= image.width * 5 ) {
          x = 0;
          y = y - image.height / 2; // group up, the same as the coins grow for consistency
        }
      }
      appleLayer.children = appleArray;
      appleLayer.x = -150; // TODO: in terms of number of images and scale
    } );

    appleGroupModel.totalCostProperty.link( function() {
      var coinArray = [];
      var x = 0;
      var y = 0;
      for ( var i = 0; i < appleGroupModel.totalCost; i++ ) {
        var image = new Image( coinImage, { scale: coinScale, x: x, y: y } );
        coinArray.push( image );
        y = y - image.height / 6;
      }
      coinLayer.children = coinArray;
      coinLayer.x = -300; // TODO: in terms of number of images and scale
    } );

    var updatePriceTag = function() {
      var pricePerApple = appleGroupModel.totalCost / appleGroupModel.numberOfApples;
      var fixed = Util.toFixed( pricePerApple, 2 );
      if ( appleGroupModel.numberOfApples === 0 ) {
        fixed = '?';
      }
      else {
        fixed = '$' + fixed;
      }
      priceTagLayer.children = [ new Panel( new Text( fixed, { fontSize: 40 } ), {
        xMargin: 20,
        yMargin: 20
      } ) ];
    };
    appleGroupModel.totalCostProperty.link( updatePriceTag );
    appleGroupModel.numberOfApplesProperty.link( updatePriceTag );
  }

  proportionPlayground.register( 'AppleGroupNode', AppleGroupNode );

  return inherit( Node, AppleGroupNode, {} );
} );