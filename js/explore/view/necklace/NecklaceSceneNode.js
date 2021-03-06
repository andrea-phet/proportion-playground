// Copyright 2016, University of Colorado Boulder

/**
 * Shows the necklace scene, including controls and the necklace.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var ControllableNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/ControllableNecklaceNode' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var StaticNecklaceNode = require( 'PROPORTION_PLAYGROUND/explore/view/necklace/StaticNecklaceNode' );
  var ExploreSceneNode = require( 'PROPORTION_PLAYGROUND/explore/view/ExploreSceneNode' );

  // constants
  var iconScaleOptions = { scale: 0.3 };

  /**
   *
   * @param {Bounds2} layoutBounds - the visible bounds of the sim
   * @param {NecklaceSceneModel} necklaceSceneModel - the model
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function NecklaceSceneNode( layoutBounds, necklaceSceneModel, predictMode ) {
    var necklaceSceneNode = this;
    this.necklaceSceneModel = necklaceSceneModel;

    // Create the left and right necklace nodes, each with their own NumberPickers
    var firstControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace1Model, necklaceSceneModel.revealProperty );
    var secondControllableNecklaceNode = new ControllableNecklaceNode( necklaceSceneModel.necklace2Model, necklaceSceneModel.revealProperty );

    // Create the switch that chooses between 1 vs 2 necklaces
    var abSwitch = new ABSwitch( necklaceSceneModel.showBothProperty,
      false, new StaticNecklaceNode( 14, 7, iconScaleOptions ),
      true, new HBox( {
        children: [
          new StaticNecklaceNode( 10, 5, iconScaleOptions ), new StaticNecklaceNode( 14, 7, iconScaleOptions ) ]
      } ) );

    // Super call
    ExploreSceneNode.call( this, layoutBounds, necklaceSceneModel.revealProperty, predictMode, 87, {
      children: [ firstControllableNecklaceNode, secondControllableNecklaceNode, abSwitch ]
    } );

    // When 2 necklaces are selected, show both
    necklaceSceneModel.showBothProperty.link( function( showBoth ) {
      secondControllableNecklaceNode.visible = showBoth;

      // Controllable necklace nodes have x=0 at their center
      if ( showBoth ) {
        firstControllableNecklaceNode.x = layoutBounds.width * 1 / 3;
        secondControllableNecklaceNode.x = layoutBounds.width * 2 / 3;

        necklaceSceneNode.mutateRevealButton( { centerX: layoutBounds.centerX } );
      }
      else {
        firstControllableNecklaceNode.x = layoutBounds.width / 2;

        necklaceSceneNode.mutateRevealButton( { left: layoutBounds.centerX + 110 } );
      }
    } );

    // Position the ABSwitch at the bottom center of the layoutBounds
    this.moveABSwitchToBottomCenter( abSwitch );
  }

  proportionPlayground.register( 'NecklaceSceneNode', NecklaceSceneNode );

  return inherit( ExploreSceneNode, NecklaceSceneNode );
} );