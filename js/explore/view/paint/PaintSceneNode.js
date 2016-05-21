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
  var ControllableSplotchNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/ControllableSplotchNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Color = require( 'SCENERY/util/Color' );
  var Vector3 = require( 'DOT/Vector3' );
  var GradientNode = require( 'PROPORTION_PLAYGROUND/explore/view/paint/GradientNode' );

  function PaintSceneNode( layoutBounds, paintSceneModel ) {
    var controllableSplotchNode1 = new ControllableSplotchNode( paintSceneModel.splotch1Model, paintSceneModel.grayscaleProperty );
    var controllableSplotchNode2 = new ControllableSplotchNode( paintSceneModel.splotch2Model, paintSceneModel.grayscaleProperty );
    var createText = function( text ) {
      return new Text( text, { fontSize: 22 } );
    };
    var abSwitch = new ABSwitch( paintSceneModel.showBothSplotchesProperty, false, createText( 'one' ), true, createText( 'two' ) );

    Node.call( this, {
      children: [ controllableSplotchNode1, controllableSplotchNode2, abSwitch ]
    } );
    this.necklaceSceneModel = paintSceneModel;

    paintSceneModel.showBothSplotchesProperty.link( function( showBothNecklaces ) {
      controllableSplotchNode2.visible = showBothNecklaces;

      // Controllable necklace nodes have x=0 at their center
      if ( showBothNecklaces ) {
        controllableSplotchNode1.x = layoutBounds.width * 1 / 3;
        controllableSplotchNode2.x = layoutBounds.width * 2 / 3;
      }
      else {
        controllableSplotchNode1.x = layoutBounds.width / 2;
      }
    } );
    abSwitch.centerBottom = layoutBounds.centerBottom.plusXY( 0, -5 );

    var grayscaleCheckBox = new CheckBox( new Text( 'Black & White', { fontSize: 22 } ), paintSceneModel.grayscaleProperty, {
      left: layoutBounds.left + 5,
      bottom: layoutBounds.bottom - 5
    } );
    this.addChild( grayscaleCheckBox );

    var gradientNode = new GradientNode( 20, 300, function( parameter ) {
      var blueVector = new Vector3( 0, 1, 1 ); // use cyan for RGB color mixing
      var yellowVector = new Vector3( 1, 1, 0 );

      var blended = blueVector.blend( yellowVector, parameter );
      return new Color( blended.x * 255, blended.y * 255, blended.z * 255 );
    }, {
      centerX: layoutBounds.centerX + 200,
      centerY: 250
    } );
    this.addChild( gradientNode );
  }

  proportionPlayground.register( 'PaintSceneNode', PaintSceneNode );

  return inherit( Node, PaintSceneNode, {} );
} );