// Copyright 2016, University of Colorado Boulder

/**
 * Combines a mutable NecklaceNode with its controls.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var Property = require( 'AXON/Property' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var SplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/SplotchNode' );

  function ControllableSplotchNode( splotchModel, grayscaleProperty ) {
    var numberPickerOptions = { scale: 2 };
    var roundBeadNumberPicker = new NumberPicker( splotchModel.color1CountProperty, new Property( splotchModel.colorCountRange ), numberPickerOptions );
    var squareBeadNumberPicker = new NumberPicker( splotchModel.color2CountProperty, new Property( splotchModel.colorCountRange ), numberPickerOptions );
    var splotchNode = new SplotchNode( splotchModel.color1CountProperty, splotchModel.color2CountProperty, grayscaleProperty );
    Node.call( this, {
      children: [
        splotchNode,
        new HBox( {
          spacing: 10,
          y: 450,
          centerX: 0, // position around the origin
          children: [
            roundBeadNumberPicker,
            squareBeadNumberPicker
          ]
        } )
      ]
    } );
  }

  proportionPlayground.register( 'ControllableSplotchNode', ControllableSplotchNode );

  return inherit( Node, ControllableSplotchNode, {} );
} );